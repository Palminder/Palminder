"""Shared scene-building library for the practice's photorealistic renders.

Every render is produced in Blender (the `bpy` module) with Cycles, from parametric geometry
built here and procedural materials, so no third-party photograph or texture is used. The
scenes are deliberately plain: correct proportions, real-world scale, physically based light
and materials do most of the work of looking like a photograph.
"""
from __future__ import annotations

import math
import random
from dataclasses import dataclass, field

import bpy
from mathutils import Vector

# ---------------------------------------------------------------- scene state


def reset() -> None:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"


# ---------------------------------------------------------------- geometry builder


@dataclass
class MeshBuilder:
    """Accumulates boxes, prisms and quads into one mesh per material."""

    name: str
    material: bpy.types.Material
    verts: list[tuple[float, float, float]] = field(default_factory=list)
    faces: list[tuple[int, ...]] = field(default_factory=list)
    smooth: bool = False

    def _add(self, verts, faces):
        base = len(self.verts)
        self.verts.extend(verts)
        self.faces.extend(tuple(base + i for i in f) for f in faces)

    def box(self, x, y, z, w, d, h, rot=0.0, pivot=None):
        """Axis-aligned box from its min corner; `rot` rotates it about z around `pivot` (default min corner)."""
        pts = [(x, y, z), (x + w, y, z), (x + w, y + d, z), (x, y + d, z),
               (x, y, z + h), (x + w, y, z + h), (x + w, y + d, z + h), (x, y + d, z + h)]
        if rot:
            px, py = pivot if pivot else (x, y)
            c, s = math.cos(rot), math.sin(rot)
            pts = [(px + (vx - px) * c - (vy - py) * s, py + (vx - px) * s + (vy - py) * c, vz) for vx, vy, vz in pts]
        self._add(pts, [(0, 3, 2, 1), (4, 5, 6, 7), (0, 1, 5, 4), (1, 2, 6, 5), (2, 3, 7, 6), (3, 0, 4, 7)])
        return self

    def prism_z(self, poly, z0, z1):
        """Polygon (counter-clockwise, in XY) extruded from z0 to z1."""
        n = len(poly)
        verts = [(px, py, z0) for px, py in poly] + [(px, py, z1) for px, py in poly]
        faces = [tuple(reversed(range(n))), tuple(range(n, 2 * n))]
        for i in range(n):
            j = (i + 1) % n
            faces.append((i, j, n + j, n + i))
        self._add(verts, faces)
        return self

    def prism_x(self, profile, x0, x1):
        """Profile polygon (counter-clockwise, in YZ) extruded along x from x0 to x1."""
        n = len(profile)
        verts = [(x0, py, pz) for py, pz in profile] + [(x1, py, pz) for py, pz in profile]
        faces = [tuple(range(n)), tuple(reversed(range(n, 2 * n)))]
        for i in range(n):
            j = (i + 1) % n
            faces.append((i, n + i, n + j, j))
        self._add(verts, faces)
        return self

    def quad(self, a, b, c, d):
        self._add([a, b, c, d], [(0, 1, 2, 3)])
        return self

    def cylinder(self, cx, cy, z0, z1, r, segments=20):
        pts = [(cx + r * math.cos(2 * math.pi * i / segments), cy + r * math.sin(2 * math.pi * i / segments)) for i in range(segments)]
        self.prism_z(pts, z0, z1)
        return self

    def build(self):
        mesh = bpy.data.meshes.new(self.name)
        mesh.from_pydata(self.verts, [], self.faces)
        mesh.validate()
        mesh.update()
        if self.smooth:
            for p in mesh.polygons:
                p.use_smooth = True
        obj = bpy.data.objects.new(self.name, mesh)
        obj.data.materials.append(self.material)
        bpy.context.scene.collection.objects.link(obj)
        return obj


class Scene:
    """Registry of builders keyed by material so each material becomes one object."""

    def __init__(self):
        self.builders: dict[str, MeshBuilder] = {}

    def b(self, name: str, material: bpy.types.Material) -> MeshBuilder:
        if name not in self.builders:
            self.builders[name] = MeshBuilder(name, material)
        return self.builders[name]

    def build(self):
        for b in self.builders.values():
            if b.verts:
                b.build()


# ---------------------------------------------------------------- materials


def _new_material(name):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    bsdf = nt.nodes["Principled BSDF"]
    return mat, nt, bsdf


def _position(nt):
    geo = nt.nodes.new("ShaderNodeNewGeometry")
    return geo.outputs["Position"]


def _wall_uv(nt):
    """(x + y, z, 0): a 2D coordinate that lies in the plane of any axis-aligned wall."""
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    nt.links.new(_position(nt), sep.inputs[0])
    add = nt.nodes.new("ShaderNodeMath")
    add.operation = "ADD"
    nt.links.new(sep.outputs["X"], add.inputs[0])
    nt.links.new(sep.outputs["Y"], add.inputs[1])
    comb = nt.nodes.new("ShaderNodeCombineXYZ")
    nt.links.new(add.outputs[0], comb.inputs["X"])
    nt.links.new(sep.outputs["Z"], comb.inputs["Y"])
    comb.inputs["Z"].default_value = 0.0
    return comb.outputs[0], sep


def _noise(nt, vec, scale, detail=4.0, roughness=0.5):
    n = nt.nodes.new("ShaderNodeTexNoise")
    n.inputs["Scale"].default_value = scale
    n.inputs["Detail"].default_value = detail
    n.inputs["Roughness"].default_value = roughness
    nt.links.new(vec, n.inputs["Vector"])
    return n


def _mix(nt, fac, a, b, blend="MIX"):
    m = nt.nodes.new("ShaderNodeMix")
    m.data_type = "RGBA"
    m.blend_type = blend
    if isinstance(fac, (int, float)):
        m.inputs["Factor"].default_value = fac
    else:
        nt.links.new(fac, m.inputs["Factor"])
    for sock, val in ((m.inputs[6], a), (m.inputs[7], b)):
        if isinstance(val, tuple):
            sock.default_value = (*val, 1.0)
        else:
            nt.links.new(val, sock)
    return m.outputs[2]


def _ramp(nt, fac, stops):
    r = nt.nodes.new("ShaderNodeValToRGB")
    r.color_ramp.elements.remove(r.color_ramp.elements[0])
    r.color_ramp.elements[0].position = stops[0][0]
    r.color_ramp.elements[0].color = (*stops[0][1], 1.0)
    for pos, col in stops[1:]:
        e = r.color_ramp.elements.new(pos)
        e.color = (*col, 1.0)
    nt.links.new(fac, r.inputs["Fac"])
    return r.outputs["Color"], r.outputs["Alpha"]


def masonry(name, tone_a, tone_b, mortar=(0.66, 0.62, 0.55), width=1.1, height=0.42, joint=0.012, grime=0.6, streaks=0.35):
    """Ashlar sandstone: per-block tonal variation, lime joints recessed by bump, grain, grime at the base."""
    mat, nt, bsdf = _new_material(name)
    uv, sep = _wall_uv(nt)
    pos = _position(nt)
    brick = nt.nodes.new("ShaderNodeTexBrick")
    brick.offset = 0.5
    brick.offset_frequency = 2
    brick.inputs["Scale"].default_value = 1.0
    brick.inputs["Mortar Size"].default_value = joint
    brick.inputs["Mortar Smooth"].default_value = 0.35
    brick.inputs["Bias"].default_value = 0.0
    brick.inputs["Brick Width"].default_value = width
    brick.inputs["Row Height"].default_value = height
    brick.inputs["Color1"].default_value = (*tone_a, 1.0)
    brick.inputs["Color2"].default_value = (*tone_b, 1.0)
    brick.inputs["Mortar"].default_value = (*mortar, 1.0)
    nt.links.new(uv, brick.inputs["Vector"])
    # slow tonal drift and fine grain across the whole wall
    drift = _noise(nt, pos, 0.35, 2.0, 0.6)
    drift_col, _ = _ramp(nt, drift.outputs["Fac"], [(0.35, (0.82, 0.8, 0.78)), (0.65, (1.0, 1.0, 1.0))])
    grain = _noise(nt, pos, 60.0, 6.0, 0.7)
    grain_col, _ = _ramp(nt, grain.outputs["Fac"], [(0.3, (0.88, 0.88, 0.88)), (0.7, (1.0, 1.0, 1.0))])
    col = _mix(nt, 1.0, brick.outputs["Color"], drift_col, "MULTIPLY")
    col = _mix(nt, 1.0, col, grain_col, "MULTIPLY")
    # rain streaks: vertical noise stretched in z
    scale = nt.nodes.new("ShaderNodeVectorMath")
    scale.operation = "MULTIPLY"
    scale.inputs[1].default_value = (6.0, 6.0, 0.4)
    nt.links.new(pos, scale.inputs[0])
    streak = _noise(nt, scale.outputs[0], 1.0, 3.0, 0.6)
    streak_col, _ = _ramp(nt, streak.outputs["Fac"], [(0.45, (1.0 - streaks, 1.0 - streaks, 1.0 - streaks)), (0.6, (1.0, 1.0, 1.0))])
    col = _mix(nt, 1.0, col, streak_col, "MULTIPLY")
    # grime towards the ground: darker below 0.8 m
    zmap = nt.nodes.new("ShaderNodeMapRange")
    zmap.inputs["From Min"].default_value = 0.0
    zmap.inputs["From Max"].default_value = 0.9
    zmap.inputs["To Min"].default_value = 1.0 - grime * 0.5
    zmap.inputs["To Max"].default_value = 1.0
    nt.links.new(sep.outputs["Z"], zmap.inputs["Value"])
    grime_col = nt.nodes.new("ShaderNodeCombineColor")
    for i in range(3):
        nt.links.new(zmap.outputs[0], grime_col.inputs[i])
    col = _mix(nt, 1.0, col, grime_col.outputs[0], "MULTIPLY")
    nt.links.new(col, bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.85
    bsdf.inputs["Specular IOR Level"].default_value = 0.3
    # bump: joints recessed, grain raised
    height_mix = nt.nodes.new("ShaderNodeMath")
    height_mix.operation = "MULTIPLY_ADD"
    nt.links.new(grain.outputs["Fac"], height_mix.inputs[0])
    height_mix.inputs[1].default_value = 0.25
    nt.links.new(brick.outputs["Fac"], height_mix.inputs[2])
    inv = nt.nodes.new("ShaderNodeMath")
    inv.operation = "SUBTRACT"
    inv.inputs[0].default_value = 1.0
    nt.links.new(height_mix.outputs[0], inv.inputs[1])
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.35
    bump.inputs["Distance"].default_value = 0.02
    nt.links.new(inv.outputs[0], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    return mat


def blonde_sandstone(name="BlondeSandstone", **kw):
    return masonry(name, (0.58, 0.49, 0.36), (0.50, 0.42, 0.30), **kw)


def red_sandstone(name="RedSandstone", **kw):
    return masonry(name, (0.40, 0.23, 0.16), (0.34, 0.19, 0.13), mortar=(0.42, 0.36, 0.30), **kw)


def plain(name, color, roughness=0.5, specular=0.5, bump=0.0, bump_scale=30.0, metallic=0.0):
    mat, nt, bsdf = _new_material(name)
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Specular IOR Level"].default_value = specular
    bsdf.inputs["Metallic"].default_value = metallic
    if bump:
        n = _noise(nt, _position(nt), bump_scale, 5.0, 0.6)
        b = nt.nodes.new("ShaderNodeBump")
        b.inputs["Strength"].default_value = bump
        b.inputs["Distance"].default_value = 0.01
        nt.links.new(n.outputs["Fac"], b.inputs["Height"])
        nt.links.new(b.outputs["Normal"], bsdf.inputs["Normal"])
    return mat


def painted_timber(name="PaintedTimber", color=(0.86, 0.85, 0.80)):
    return plain(name, color, roughness=0.42, specular=0.45, bump=0.03, bump_scale=8.0)


def paint(name, color):
    return plain(name, color, roughness=0.32, specular=0.5, bump=0.02, bump_scale=6.0)


def slate(name="Slate"):
    mat, nt, bsdf = _new_material(name)
    uv, sep = _wall_uv(nt)
    brick = nt.nodes.new("ShaderNodeTexBrick")
    brick.offset = 0.5
    brick.inputs["Scale"].default_value = 1.0
    brick.inputs["Mortar Size"].default_value = 0.006
    brick.inputs["Brick Width"].default_value = 0.3
    brick.inputs["Row Height"].default_value = 0.25
    brick.inputs["Color1"].default_value = (0.20, 0.21, 0.23, 1.0)
    brick.inputs["Color2"].default_value = (0.15, 0.16, 0.18, 1.0)
    brick.inputs["Mortar"].default_value = (0.10, 0.10, 0.11, 1.0)
    # slates lie on a slope: use (x, z) for tiling
    comb = nt.nodes.new("ShaderNodeCombineXYZ")
    nt.links.new(sep.outputs["X"], comb.inputs["X"])
    nt.links.new(sep.outputs["Z"], comb.inputs["Y"])
    nt.links.new(comb.outputs[0], brick.inputs["Vector"])
    n = _noise(nt, _position(nt), 3.0, 3.0, 0.6)
    ncol, _ = _ramp(nt, n.outputs["Fac"], [(0.3, (0.75, 0.75, 0.75)), (0.7, (1.0, 1.0, 1.0))])
    col = _mix(nt, 1.0, brick.outputs["Color"], ncol, "MULTIPLY")
    nt.links.new(col, bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.55
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.5
    bump.inputs["Distance"].default_value = 0.01
    inv = nt.nodes.new("ShaderNodeMath")
    inv.operation = "SUBTRACT"
    inv.inputs[0].default_value = 1.0
    nt.links.new(brick.outputs["Fac"], inv.inputs[1])
    nt.links.new(inv.outputs[0], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    return mat


def glass(name="Glass"):
    """Thin architectural glass: Fresnel-weighted glossy over transparent, no refraction shift."""
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    nt = mat.node_tree
    for n in list(nt.nodes):
        if n.type != "OUTPUT_MATERIAL":
            nt.nodes.remove(n)
    out = nt.nodes["Material Output"]
    mix = nt.nodes.new("ShaderNodeMixShader")
    fres = nt.nodes.new("ShaderNodeFresnel")
    fres.inputs["IOR"].default_value = 1.5
    trans = nt.nodes.new("ShaderNodeBsdfTransparent")
    trans.inputs["Color"].default_value = (0.92, 0.94, 0.94, 1.0)
    gloss = nt.nodes.new("ShaderNodeBsdfGlossy")
    gloss.inputs["Roughness"].default_value = 0.03
    nt.links.new(fres.outputs[0], mix.inputs["Fac"])
    nt.links.new(trans.outputs[0], mix.inputs[1])
    nt.links.new(gloss.outputs[0], mix.inputs[2])
    nt.links.new(mix.outputs[0], out.inputs["Surface"])
    return mat


def emissive(name, color, strength):
    mat, nt, bsdf = _new_material(name)
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Emission Color"].default_value = (*color, 1.0)
    bsdf.inputs["Emission Strength"].default_value = strength
    return mat


def paving(name="Paving", color=(0.52, 0.51, 0.48), w=0.9, h=0.6):
    mat, nt, bsdf = _new_material(name)
    pos = _position(nt)
    brick = nt.nodes.new("ShaderNodeTexBrick")
    brick.offset = 0.5
    brick.inputs["Scale"].default_value = 1.0
    brick.inputs["Mortar Size"].default_value = 0.008
    brick.inputs["Brick Width"].default_value = w
    brick.inputs["Row Height"].default_value = h
    brick.inputs["Color1"].default_value = (*color, 1.0)
    brick.inputs["Color2"].default_value = (color[0] * 0.9, color[1] * 0.9, color[2] * 0.9, 1.0)
    brick.inputs["Mortar"].default_value = (0.3, 0.3, 0.29, 1.0)
    nt.links.new(pos, brick.inputs["Vector"])
    n = _noise(nt, pos, 2.0, 4.0, 0.6)
    ncol, _ = _ramp(nt, n.outputs["Fac"], [(0.3, (0.7, 0.7, 0.7)), (0.7, (1.0, 1.0, 1.0))])
    col = _mix(nt, 1.0, brick.outputs["Color"], ncol, "MULTIPLY")
    nt.links.new(col, bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.8
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.3
    inv = nt.nodes.new("ShaderNodeMath")
    inv.operation = "SUBTRACT"
    inv.inputs[0].default_value = 1.0
    nt.links.new(brick.outputs["Fac"], inv.inputs[1])
    nt.links.new(inv.outputs[0], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    return mat


def asphalt(name="Asphalt"):
    return plain(name, (0.16, 0.16, 0.16), roughness=0.9, specular=0.3, bump=0.15, bump_scale=25.0)


def grass(name="Grass"):
    mat, nt, bsdf = _new_material(name)
    pos = _position(nt)
    n = _noise(nt, pos, 6.0, 8.0, 0.7)
    col, _ = _ramp(nt, n.outputs["Fac"], [(0.3, (0.16, 0.24, 0.08)), (0.7, (0.30, 0.40, 0.13))])
    nt.links.new(col, bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.95
    b = nt.nodes.new("ShaderNodeBump")
    b.inputs["Strength"].default_value = 0.6
    nt.links.new(n.outputs["Fac"], b.inputs["Height"])
    nt.links.new(b.outputs["Normal"], bsdf.inputs["Normal"])
    return mat


def timber_cladding(name="Cladding", color=(0.22, 0.15, 0.10), board=0.15):
    """Vertical boards: brick node with very tall rows so joints run vertically."""
    mat, nt, bsdf = _new_material(name)
    uv, sep = _wall_uv(nt)
    brick = nt.nodes.new("ShaderNodeTexBrick")
    brick.offset = 0.0
    brick.inputs["Scale"].default_value = 1.0
    brick.inputs["Mortar Size"].default_value = 0.008
    brick.inputs["Brick Width"].default_value = board
    brick.inputs["Row Height"].default_value = 40.0
    brick.inputs["Color1"].default_value = (*color, 1.0)
    brick.inputs["Color2"].default_value = (color[0] * 1.2, color[1] * 1.2, color[2] * 1.15, 1.0)
    brick.inputs["Mortar"].default_value = (color[0] * 0.4, color[1] * 0.4, color[2] * 0.4, 1.0)
    nt.links.new(uv, brick.inputs["Vector"])
    stretch = nt.nodes.new("ShaderNodeVectorMath")
    stretch.operation = "MULTIPLY"
    stretch.inputs[1].default_value = (30.0, 30.0, 1.5)
    nt.links.new(_position(nt), stretch.inputs[0])
    wood = _noise(nt, stretch.outputs[0], 1.0, 4.0, 0.6)
    wcol, _ = _ramp(nt, wood.outputs["Fac"], [(0.35, (0.75, 0.72, 0.7)), (0.65, (1.0, 1.0, 1.0))])
    col = _mix(nt, 1.0, brick.outputs["Color"], wcol, "MULTIPLY")
    nt.links.new(col, bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.6
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.4
    inv = nt.nodes.new("ShaderNodeMath")
    inv.operation = "SUBTRACT"
    inv.inputs[0].default_value = 1.0
    nt.links.new(brick.outputs["Fac"], inv.inputs[1])
    nt.links.new(inv.outputs[0], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])
    return mat


# ---------------------------------------------------------------- building parts


@dataclass
class Palette:
    stone: bpy.types.Material
    frame: bpy.types.Material
    glass: bpy.types.Material
    interior: bpy.types.Material
    blind: bpy.types.Material
    slate: bpy.types.Material
    pot: bpy.types.Material
    door: bpy.types.Material


def default_palette(stone=None) -> Palette:
    return Palette(
        stone=stone or blonde_sandstone(),
        frame=painted_timber(),
        glass=glass(),
        interior=plain("Interior", (0.06, 0.06, 0.06), roughness=0.9),
        blind=plain("Blind", (0.80, 0.77, 0.70), roughness=0.9),
        slate=slate(),
        pot=plain("Pot", (0.46, 0.24, 0.16), roughness=0.7, bump=0.05),
        door=paint("Door", (0.10, 0.14, 0.12)),
    )


def sash_window(sc: Scene, pal: Palette, x, y, z, w, h, depth=0.6, reveal=0.16, rng=None, facing=1, rot=0.0, pivot=None, lit=False):
    """A sash window in an opening whose outer face is the plane y (wall runs away in +y when facing=1).

    x, z: bottom-left of the opening on the face; w, h: opening size. The frame sits `reveal` back.
    """
    rng = rng or random
    f = sc.b("Frame", pal.frame)
    g = sc.b("Glass", pal.glass)
    inner = sc.b("Interior", pal.interior)
    fw, fd = 0.055, 0.05
    yf = y + reveal * facing
    kw = dict(rot=rot, pivot=pivot)
    # outer frame
    f.box(x, yf, z, fw, fd, h, **kw).box(x + w - fw, yf, z, fw, fd, h, **kw)
    f.box(x, yf, z + h - fw, w, fd, fw, **kw).box(x, yf, z, w, fd, fw * 1.6, **kw)
    # meeting rail and a slim centre astragal on the upper sash
    f.box(x, yf, z + h * 0.52, w, fd, 0.045, **kw)
    f.box(x + w / 2 - 0.012, yf, z + h * 0.52, 0.024, fd, h * 0.48, **kw)
    # glazing plane just behind the frame, interior box behind that
    yg = yf + 0.02 * facing
    pts = [(x + fw, yg, z + fw), (x + w - fw, yg, z + fw), (x + w - fw, yg, z + h - fw), (x + fw, yg, z + h - fw)]
    if rot:
        px, py = pivot if pivot else (x, y)
        c, s = math.cos(rot), math.sin(rot)
        pts = [(px + (vx - px) * c - (vy - py) * s, py + (vx - px) * s + (vy - py) * c, vz) for vx, vy, vz in pts]
    if facing == 1:
        g.quad(*pts)
    else:
        g.quad(*reversed(pts))
    room_depth = 3.0
    yi = yg + 0.05 * facing
    inner.box(x, min(yi, yi + room_depth * facing), z - 0.2, w, room_depth, h + 0.4, **kw)
    if rng.random() < 0.45:
        blind = sc.b("Blind", pal.blind)
        drop = h * rng.uniform(0.3, 0.9) if not lit else h * 0.35
        blind.box(x + 0.03, yg + 0.25 * facing, z + h - drop, w - 0.06, 0.01, drop, **kw)
    return sc


def wall_with_openings(sc: Scene, pal: Palette, x0, x1, y, depth, bands, rot=0.0, pivot=None, facing=1):
    """Wall from x0..x1 whose face is at y, `depth` thick (extending in +y when facing=1).

    bands: list of (z0, z1, openings) with openings as (ox0, ox1) within the band.
    """
    w = sc.b("Stone", pal.stone)
    y0 = y if facing == 1 else y - depth
    kw = dict(rot=rot, pivot=pivot)
    for z0, z1, openings in bands:
        cursor = x0
        for ox0, ox1 in sorted(openings):
            if ox0 > cursor:
                w.box(cursor, y0, z0, ox0 - cursor, depth, z1 - z0, **kw)
            cursor = ox1
        if cursor < x1:
            w.box(cursor, y0, z0, x1 - cursor, depth, z1 - z0, **kw)
    return sc


def storey_windows(sc, pal, x0, x1, y, depth, z_floor, storey_h, windows, sill_h=0.9, win_h=2.1, rng=None, rot=0.0, pivot=None, facing=1, lit=False):
    """One storey band with `windows` as (wx, ww) openings; returns the band spec for wall_with_openings."""
    rng = rng or random
    s = sc.b("Stone", pal.stone)
    kw = dict(rot=rot, pivot=pivot)
    openings = []
    for wx, ww in windows:
        openings.append((wx, wx + ww))
        sash_window(sc, pal, wx, y, z_floor + sill_h, ww, win_h, rng=rng, rot=rot, pivot=pivot, facing=facing, lit=lit)
        # projecting sill
        sy = y - 0.07 if facing == 1 else y - depth
        s.box(wx - 0.08, sy, z_floor + sill_h - 0.08, ww + 0.16, 0.16, 0.08, **kw)
    band_below = (z_floor, z_floor + sill_h, [])
    band_win = (z_floor + sill_h, z_floor + sill_h + win_h, openings)
    band_above = (z_floor + sill_h + win_h, z_floor + storey_h, [])
    return [band_below, band_win, band_above]


def string_course(sc, pal, x0, x1, y, z, proj=0.06, h=0.14, rot=0.0, pivot=None, facing=1):
    s = sc.b("Stone", pal.stone)
    yy = y - proj if facing == 1 else y
    s.box(x0, yy, z, x1 - x0, proj, h, rot=rot, pivot=pivot)
    return sc


def cornice(sc, pal, x0, x1, y, z, proj=0.35, h=0.3, rot=0.0, pivot=None, facing=1):
    s = sc.b("Stone", pal.stone)
    yy = y - proj if facing == 1 else y
    # stepped profile: three boxes
    s.box(x0, yy + proj * 0.55, z, x1 - x0, proj * 0.45 + 0.02, h * 0.35, rot=rot, pivot=pivot)
    s.box(x0, yy + proj * 0.25, z + h * 0.35, x1 - x0, proj * 0.75 + 0.02, h * 0.35, rot=rot, pivot=pivot)
    s.box(x0, yy, z + h * 0.7, x1 - x0, proj + 0.02, h * 0.3, rot=rot, pivot=pivot)
    return sc


def chimney(sc, pal, x, y, z, w=1.0, d=0.8, h=1.6, pots=3):
    s = sc.b("Stone", pal.stone)
    p = sc.b("Pot", pal.pot)
    s.box(x, y, z, w, d, h)
    s.box(x - 0.06, y - 0.06, z + h - 0.12, w + 0.12, d + 0.12, 0.12)
    for i in range(pots):
        cx = x + w * (i + 0.5) / pots
        p.cylinder(cx, y + d / 2, z + h, z + h + 0.6, 0.11, 14)
    return sc


def pitched_roof(sc, pal, x0, x1, y_front, y_back, z_eaves, rise=2.4, overhang=0.15):
    r = sc.b("Slate", pal.slate)
    profile = [(y_front - overhang, z_eaves - 0.05), (y_front + (y_back - y_front) * 0.5, z_eaves + rise), (y_back + overhang, z_eaves - 0.05), (y_back + overhang, z_eaves - 0.2), (y_front - overhang, z_eaves - 0.2)]
    r.prism_x(profile, x0, x1)
    return sc


# ---------------------------------------------------------------- environment, camera, render


def sky(sun_elevation=38.0, sun_rotation=200.0, sun_intensity=0.35, sun_size=1.5, air=1.6, dust=3.0, strength=1.0):
    world = bpy.data.worlds.new("World")
    bpy.context.scene.world = world
    world.use_nodes = True
    nt = world.node_tree
    bg = nt.nodes["Background"]
    tex = nt.nodes.new("ShaderNodeTexSky")
    tex.sky_type = "NISHITA"
    tex.sun_disc = True
    tex.sun_elevation = math.radians(sun_elevation)
    tex.sun_rotation = math.radians(sun_rotation)
    tex.sun_intensity = sun_intensity
    tex.sun_size = math.radians(sun_size)
    tex.altitude = 20
    tex.air_density = air
    tex.dust_density = dust
    tex.ozone_density = 3.0
    nt.links.new(tex.outputs[0], bg.inputs["Color"])
    bg.inputs["Strength"].default_value = strength
    return world


def ground(sc, mat, size=400.0, z=0.0):
    g = sc.b(mat.name + "Ground", mat)
    g.quad((-size, -size, z), (size, -size, z), (size, size, z), (-size, size, z))
    return sc


def camera(location, target, lens=35.0, shift_y=0.0, fstop=8.0, focus=None, sensor=36.0):
    cam_data = bpy.data.cameras.new("Camera")
    cam_data.lens = lens
    cam_data.sensor_width = sensor
    cam_data.shift_y = shift_y
    cam_data.dof.use_dof = True
    cam_data.dof.aperture_fstop = fstop
    cam = bpy.data.objects.new("Camera", cam_data)
    bpy.context.scene.collection.objects.link(cam)
    cam.location = Vector(location)
    direction = Vector(target) - Vector(location)
    cam.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    cam_data.dof.focus_distance = focus or direction.length
    bpy.context.scene.camera = cam
    return cam


def render(path, width, height, samples=128, scale=100, exposure=0.0, look="AgX - Medium High Contrast", seed=1):
    scene = bpy.context.scene
    scene.render.resolution_x = width
    scene.render.resolution_y = height
    scene.render.resolution_percentage = scale
    scene.cycles.samples = samples
    scene.cycles.use_adaptive_sampling = True
    scene.cycles.adaptive_threshold = 0.02
    scene.cycles.use_denoising = True
    scene.cycles.denoiser = "OPENIMAGEDENOISE"
    scene.cycles.denoising_use_gpu = False
    scene.cycles.max_bounces = 8
    scene.cycles.diffuse_bounces = 4
    scene.cycles.glossy_bounces = 4
    scene.cycles.transparent_max_bounces = 12
    scene.cycles.caustics_reflective = False
    scene.cycles.caustics_refractive = False
    scene.cycles.seed = seed
    scene.render.film_transparent = False
    scene.view_settings.view_transform = "AgX"
    try:
        scene.view_settings.look = look
    except TypeError:
        pass
    scene.view_settings.exposure = exposure
    scene.render.image_settings.file_format = "JPEG"
    scene.render.image_settings.quality = 92
    scene.render.filepath = path
    bpy.ops.render.render(write_still=True)
    return path
