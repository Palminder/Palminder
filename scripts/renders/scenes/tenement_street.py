"""Homepage hero: a terrace of red-sandstone tenements seen obliquely from the opposite pavement."""
import math
import random

import lib


def terrace(sc, pal, x0, closes, close_w=11.0, storeys=4, storey_h=3.3, depth=12.0, rng=None, bay=True):
    rng = rng or random.Random(3)
    y = 0.0
    x1 = x0 + closes * close_w
    total_h = storeys * storey_h
    bands = []
    for s in range(storeys):
        zf = s * storey_h
        sill = 0.95 if s else 1.1
        win_h = 2.3 if s == 1 else 2.1
        windows = []
        for c in range(closes):
            cx = x0 + c * close_w
            # bay window on the left half of each close (drawn separately), two single windows on the right
            windows += [(cx + 6.3, 1.35), (cx + 8.9, 1.35)]
            if not bay:
                windows += [(cx + 1.4, 1.35), (cx + 3.7, 1.35)]
        if s == 0:
            # close doors sit between the two right-hand windows at ground level
            pass
        bands += lib.storey_windows(sc, pal, x0, x1, y, 0.6, zf, storey_h, windows, sill_h=sill, win_h=win_h, rng=rng)
        lib.string_course(sc, pal, x0, x1, y, zf + storey_h - 0.25 if s < storeys - 1 else zf + storey_h - 0.3, proj=0.05 if s < storeys - 1 else 0.0, h=0.14)
    # doors
    doors = []
    for c in range(closes):
        cx = x0 + c * close_w
        dx = cx + 7.85
        doors.append((dx, dx + 1.25))
        d = sc.b("Door", pal.door)
        d.box(dx + 0.05, 0.35, 0.02, 1.15, 0.06, 2.35)
        f = sc.b("Frame", pal.frame)
        f.box(dx, 0.32, 0.0, 0.06, 0.08, 2.9).box(dx + 1.19, 0.32, 0.0, 0.06, 0.08, 2.9).box(dx, 0.32, 2.85, 1.25, 0.08, 0.06)
        g = sc.b("Glass", pal.glass)
        g.quad((dx + 0.06, 0.36, 2.42), (dx + 1.19, 0.36, 2.42), (dx + 1.19, 0.36, 2.85), (dx + 0.06, 0.36, 2.85))
        # step
        sc.b("Stone", pal.stone).box(dx - 0.1, -0.25, 0.0, 1.45, 0.3, 0.14)
    # rebuild ground band with door openings: replace the first band's openings
    z0, z1, ops = bands[0]
    bands[0] = (z0, z1, ops + doors)
    z0, z1, ops = bands[1]
    bands[1] = (z0, z1, ops + doors)
    lib.wall_with_openings(sc, pal, x0, x1, y, 0.6, bands)
    # bay windows: three-sided, full height, on the left half of each close
    if bay:
        for c in range(closes):
            cx = x0 + c * close_w + 1.2
            bay_w, proj = 3.8, 1.0
            side = proj / math.cos(math.radians(45))
            # front face of the bay
            fx0 = cx + proj
            fx1 = cx + bay_w - proj
            fbands = []
            for s in range(storeys):
                zf = s * storey_h
                sill = 0.95 if s else 1.1
                win_h = 2.3 if s == 1 else 2.1
                fbands += lib.storey_windows(sc, pal, fx0, fx1, -proj, 0.5, zf, storey_h, [(fx0 + 0.35, fx1 - fx0 - 0.7)], sill_h=sill, win_h=win_h, rng=rng)
                lib.string_course(sc, pal, fx0 - 0.1, fx1 + 0.1, -proj, zf + storey_h - 0.25, proj=0.05, h=0.14)
            lib.wall_with_openings(sc, pal, fx0, fx1, -proj, 0.5, fbands)
            # angled returns (rotated walls with a window each storey)
            for side_x, ang in ((cx, math.radians(-45)), (fx1, math.radians(45))):
                px, py = (cx, 0.0) if ang < 0 else (fx1, -proj)
                rb = []
                for s in range(storeys):
                    zf = s * storey_h
                    sill = 0.95 if s else 1.1
                    win_h = 2.3 if s == 1 else 2.1
                    # local x runs along the rotated wall from its pivot
                    rb += lib.storey_windows(sc, pal, px, px + side, py, 0.5, zf, storey_h, [(px + 0.3, side - 0.6)], sill_h=sill, win_h=win_h, rng=rng, rot=ang, pivot=(px, py))
                lib.wall_with_openings(sc, pal, px, px + side, py, 0.5, rb, rot=ang, pivot=(px, py))
    # eaves cornice, parapet-free pitched roof, chimneys on party lines
    lib.cornice(sc, pal, x0 - 0.3, x1 + 0.3, y, total_h - 0.3, proj=0.4, h=0.32)
    lib.pitched_roof(sc, pal, x0 - 0.3, x1 + 0.3, 0.0, depth, total_h, rise=3.2)
    for c in range(closes + 1):
        lib.chimney(sc, pal, x0 + c * close_w - 0.5, 2.2, total_h + 1.0, w=1.0, d=1.4, h=2.2, pots=4)
    # rear wall and gables so the roof reads as a mass
    sc.b("Stone", pal.stone).box(x0 - 0.3, depth - 0.6, 0.0, x1 - x0 + 0.6, 0.6, total_h)
    sc.b("Stone", pal.stone).box(x0 - 0.3, 0.0, 0.0, 0.3, depth, total_h)
    sc.b("Stone", pal.stone).box(x1, 0.0, 0.0, 0.3, depth, total_h)


def build():
    rng = random.Random(7)
    sc = lib.Scene()
    pal = lib.default_palette(stone=lib.red_sandstone(grime=0.7))
    terrace(sc, pal, -22.0, 6, rng=rng)
    # a blonde terrace further along the street on the far side gives depth
    pal2 = lib.default_palette(stone=lib.blonde_sandstone("Blonde2"))
    pal2.frame, pal2.glass, pal2.interior, pal2.blind, pal2.slate, pal2.pot, pal2.door = pal.frame, pal.glass, pal.interior, pal.blind, pal.slate, pal.pot, pal.door
    # street: pavement in front of the terrace, kerb, road, opposite pavement
    pave = lib.paving()
    kerb = lib.plain("Kerb", (0.42, 0.42, 0.40), roughness=0.8)
    road = lib.asphalt()
    p = sc.b("Pavement", pave)
    p.box(-80, -3.2, -0.15, 200, 3.2, 0.15)
    p.box(-80, -14.5, -0.15, 200, 3.0, 0.15)
    sc.b("Kerb", kerb).box(-80, -3.35, -0.15, 200, 0.15, 0.15).box(-80, -11.5, -0.15, 200, 0.15, 0.15)
    lib.ground(sc, road, z=-0.15)
    # street furniture: two lamp posts and a run of railings by the basement areas
    post = lib.plain("Post", (0.12, 0.13, 0.12), roughness=0.5, metallic=0.4)
    for lx in (-6.0, 20.0):
        sc.b("Post", post).cylinder(lx, -2.6, 0.0, 6.0, 0.07, 12).cylinder(lx, -2.6, 6.0, 6.5, 0.12, 12)
    sc.build()
    lib.sky(sun_elevation=36, sun_rotation=205, sun_intensity=0.28, sun_size=1.5, air=1.5, dust=3.5, strength=0.9)
    # camera on the far pavement looking along the terrace
    lib.camera((-26.0, -15.5, 1.6), (8.0, 0.0, 4.5), lens=35.0, shift_y=0.24, fstop=7.1, focus=26.0)
    return {"width": 1600, "height": 1000, "exposure": -0.55}
