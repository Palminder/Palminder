// Small SVG drawing toolkit used to author the project drawing set so every sheet shares one
// graphic language: Paper ground, Ink poché for existing fabric, Terracotta hatch for new work,
// dashed lines for removed elements, sans-serif labels, a title strip, legend, scale bar and north.
export const INK = '#242722';
export const PAPER = '#F3F0E8';
export const ACCENT = '#8C4F3D';
export const MOSS = '#405448';
export const FONT = "Inter, 'Helvetica Neue', Arial, sans-serif";

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const n = (v) => (Math.round(v * 100) / 100).toString();

export class Sheet {
  constructor({
    width,
    height,
    title,
    number,
    projectTitle,
    scaleNote = 'Scale bar 0–5 m',
    unitPx = 100,
    description,
  }) {
    this.w = width;
    this.h = height;
    this.title = title;
    this.number = number;
    this.projectTitle = projectTitle;
    this.scaleNote = scaleNote;
    this.unit = unitPx; // px per metre
    this.description = description ?? `${number} — ${title}`;
    this.parts = [];
    this.stripH = Math.round(Math.min(width, height) * 0.075);
  }
  add(s) {
    this.parts.push(s);
    return this;
  }
  // --- primitives (all coordinates in px) ---
  poche(points) {
    return this.add(
      `<polygon points="${points.map((p) => `${n(p[0])},${n(p[1])}`).join(' ')}" fill="${INK}" stroke="${INK}" stroke-width="1"/>`,
    );
  }
  rectPoche(x, y, w, h) {
    return this.add(
      `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${INK}"/>`,
    );
  }
  newWork(points, { outline = true } = {}) {
    return this.add(
      `<polygon points="${points.map((p) => `${n(p[0])},${n(p[1])}`).join(' ')}" fill="url(#newwork)" stroke="${outline ? ACCENT : 'none'}" stroke-width="1.2"/>`,
    );
  }
  rectNew(x, y, w, h) {
    return this.add(
      `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="url(#newwork)" stroke="${ACCENT}" stroke-width="1.2"/>`,
    );
  }
  insulation(x, y, w, h, { horizontal = true } = {}) {
    // Light zig-zag band for insulation.
    const step = 10;
    let d = '';
    if (horizontal) {
      for (let i = 0; i <= w; i += step)
        d += `${i === 0 ? 'M' : 'L'}${n(x + i)} ${n(y + (Math.floor(i / step) % 2 ? h : 0))}`;
    } else {
      for (let i = 0; i <= h; i += step)
        d += `${i === 0 ? 'M' : 'L'}${n(x + (Math.floor(i / step) % 2 ? w : 0))} ${n(y + i)}`;
    }
    return this.add(
      `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="none" stroke="${INK}" stroke-width="0.8" stroke-opacity="0.6"/><path d="${d}" fill="none" stroke="${INK}" stroke-width="0.8" stroke-opacity="0.6"/>`,
    );
  }
  line(x1, y1, x2, y2, { weight = 1.2, dashed = false, color = INK, opacity = 1 } = {}) {
    return this.add(
      `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${color}" stroke-width="${weight}" stroke-opacity="${opacity}"${dashed ? ' stroke-dasharray="8 6"' : ''}/>`,
    );
  }
  path(d, { weight = 1.2, dashed = false, color = INK, fill = 'none', opacity = 1 } = {}) {
    return this.add(
      `<path d="${d}" fill="${fill}" stroke="${color}" stroke-width="${weight}" stroke-opacity="${opacity}"${dashed ? ' stroke-dasharray="8 6"' : ''}/>`,
    );
  }
  rect(x, y, w, h, { weight = 0.8, dashed = false, color = INK, fill = 'none', opacity = 1 } = {}) {
    return this.add(
      `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${fill}" stroke="${color}" stroke-width="${weight}" stroke-opacity="${opacity}"${dashed ? ' stroke-dasharray="8 6"' : ''}/>`,
    );
  }
  circle(cx, cy, r, { weight = 0.8, fill = 'none', color = INK } = {}) {
    return this.add(
      `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}" stroke="${color}" stroke-width="${weight}"/>`,
    );
  }
  dotted(x1, y1, x2, y2, { weight = 2.4, color = INK } = {}) {
    return this.add(
      `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${color}" stroke-width="${weight}" stroke-dasharray="2 6" stroke-linecap="round"/>`,
    );
  }
  /** Door: hinge at (x,y); leaf length len; dir = 'r'|'l'|'u'|'d' leaf direction; swing side +1/-1. */
  door(x, y, len, dir, swing = 1) {
    let x2 = x,
      y2 = y,
      ax,
      ay;
    if (dir === 'r') {
      x2 = x + len;
      ax = x;
      ay = y - swing * len;
    }
    if (dir === 'l') {
      x2 = x - len;
      ax = x;
      ay = y - swing * len;
    }
    if (dir === 'd') {
      y2 = y + len;
      ax = x + swing * len;
      ay = y;
    }
    if (dir === 'u') {
      y2 = y - len;
      ax = x + swing * len;
      ay = y;
    }
    const sweep =
      (dir === 'r' && swing === 1) ||
      (dir === 'l' && swing === -1) ||
      (dir === 'd' && swing === 1) ||
      (dir === 'u' && swing === -1)
        ? 0
        : 1;
    this.add(
      `<line x1="${n(x)}" y1="${n(y)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${INK}" stroke-width="1.6"/>`,
    );
    return this.add(
      `<path d="M${n(x2)} ${n(y2)}A${n(len)} ${n(len)} 0 0 ${sweep} ${n(ax)} ${n(ay)}" fill="none" stroke="${INK}" stroke-width="0.7"/>`,
    );
  }
  /** Window in a wall: (x,y) start, length, orientation 'h'|'v', wall thickness t. Drawn as double line with reveals. */
  window(x, y, len, orient, t) {
    if (orient === 'h') {
      this.add(
        `<rect x="${n(x)}" y="${n(y)}" width="${n(len)}" height="${n(t)}" fill="${PAPER}"/>`,
      );
      this.line(x, y + t * 0.35, x + len, y + t * 0.35);
      this.line(x, y + t * 0.65, x + len, y + t * 0.65);
      this.line(x, y, x, y + t, { weight: 0.8 });
      return this.line(x + len, y, x + len, y + t, { weight: 0.8 });
    }
    this.add(`<rect x="${n(x)}" y="${n(y)}" width="${n(t)}" height="${n(len)}" fill="${PAPER}"/>`);
    this.line(x + t * 0.35, y, x + t * 0.35, y + len);
    this.line(x + t * 0.65, y, x + t * 0.65, y + len);
    this.line(x, y, x + t, y, { weight: 0.8 });
    return this.line(x, y + len, x + t, y + len, { weight: 0.8 });
  }
  /** Opening in a wall (no window): clears poché. */
  opening(x, y, w, h) {
    return this.add(
      `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${PAPER}"/>`,
    );
  }
  /** Stair: rect x,y,w,h with treads running along `dir` ('h' treads vertical lines, 'v' treads horizontal), arrow up direction. */
  stair(x, y, w, h, dir, { treads = 10, arrow = 'up' } = {}) {
    this.rect(x, y, w, h, { weight: 1 });
    if (dir === 'h')
      for (let i = 1; i < treads; i++)
        this.line(x + (w / treads) * i, y, x + (w / treads) * i, y + h, { weight: 0.6 });
    else
      for (let i = 1; i < treads; i++)
        this.line(x, y + (h / treads) * i, x + w, y + (h / treads) * i, { weight: 0.6 });
    const cx = x + w / 2,
      cy = y + h / 2;
    if (dir === 'h') {
      const [a, b] = arrow === 'right' ? [x + 6, x + w - 6] : [x + w - 6, x + 6];
      this.line(a, cy, b, cy, { weight: 0.9 });
      this.path(
        `M${n(b + (arrow === 'right' ? -8 : 8))} ${n(cy - 5)}L${n(b)} ${n(cy)}L${n(b + (arrow === 'right' ? -8 : 8))} ${n(cy + 5)}`,
        { weight: 0.9 },
      );
    } else {
      const [a, b] = arrow === 'down' ? [y + 6, y + h - 6] : [y + h - 6, y + 6];
      this.line(cx, a, cx, b, { weight: 0.9 });
      this.path(
        `M${n(cx - 5)} ${n(b + (arrow === 'down' ? -8 : 8))}L${n(cx)} ${n(b)}L${n(cx + 5)} ${n(b + (arrow === 'down' ? -8 : 8))}`,
        { weight: 0.9 },
      );
    }
    return this;
  }
  label(
    x,
    y,
    text,
    { size = 18, anchor = 'start', upper = true, opacity = 1, weight = 400, spacing = 1.5 } = {},
  ) {
    return this.add(
      `<text x="${n(x)}" y="${n(y)}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" letter-spacing="${spacing}" text-anchor="${anchor}" fill="${INK}" fill-opacity="${opacity}">${esc(upper ? String(text).toUpperCase() : text)}</text>`,
    );
  }
  note(x, y, text, { size = 14, anchor = 'start', color = INK } = {}) {
    return this.add(
      `<text x="${n(x)}" y="${n(y)}" font-family="${FONT}" font-size="${size}" text-anchor="${anchor}" fill="${color}" fill-opacity="0.8">${esc(text)}</text>`,
    );
  }
  boxNote(x, y, text, { size = 12, anchor = 'start', color = INK } = {}) {
    const w = String(text).length * size * 0.56 + 10;
    const bx = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x - 5;
    this.add(
      `<rect x="${n(bx)}" y="${n(y - size - 2)}" width="${n(w)}" height="${n(size + 8)}" fill="${PAPER}" fill-opacity="0.92"/>`,
    );
    return this.note(x, y, text, { size, anchor, color });
  }
  /** Note on a Paper label box so it stays legible over hatching or poché. */
  boxNote(x, y, text, { size = 12, anchor = 'start', color = INK } = {}) {
    const w = String(text).length * size * 0.56 + 12;
    const bx = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w : x - 6;
    this.add(
      `<rect x="${n(bx)}" y="${n(y - size - 2)}" width="${n(w)}" height="${n(size + 8)}" fill="${PAPER}" fill-opacity="0.92"/>`,
    );
    return this.note(x, y, text, { size, anchor, color });
  }
  leader(x1, y1, x2, y2, text, { size = 14, anchor = 'start', color = INK } = {}) {
    this.line(x1, y1, x2, y2, { weight: 0.7, color });
    this.circle(x1, y1, 2.2, { fill: color, color, weight: 0 });
    return this.note(x2 + (anchor === 'end' ? -6 : 6), y2 + 5, text, { size, anchor, color });
  }
  callout(x, y, num, { r = 11 } = {}) {
    this.circle(x, y, r, { weight: 1 });
    return this.add(
      `<text x="${n(x)}" y="${n(y + 4.5)}" font-family="${FONT}" font-size="13" font-weight="500" text-anchor="middle" fill="${INK}">${num}</text>`,
    );
  }
  /** Simple fixtures. */
  worktop(x, y, w, h) {
    this.rect(x, y, w, h, { weight: 0.8 });
    return this.line(x, y + h * 0.8, x + w, y + h * 0.8, { weight: 0.5, opacity: 0.6 });
  }
  sink(cx, cy, r = 14) {
    this.rect(cx - r * 1.6, cy - r, r * 3.2, r * 2, { weight: 0.7 });
    return this.circle(cx, cy, r * 0.4, { weight: 0.6 });
  }
  hob(cx, cy) {
    this.rect(cx - 24, cy - 16, 48, 32, { weight: 0.7 });
    for (const [dx, dy] of [
      [-12, -7],
      [12, -7],
      [-12, 7],
      [12, 7],
    ])
      this.circle(cx + dx, cy + dy, 5, { weight: 0.6 });
    return this;
  }
  wc(x, y, dir = 'd') {
    // cistern + pan
    const w = 30;
    if (dir === 'd') {
      this.rect(x - w / 2, y, w, 12, { weight: 0.7 });
      return this.add(
        `<ellipse cx="${n(x)}" cy="${n(y + 12 + 18)}" rx="12" ry="17" fill="none" stroke="${INK}" stroke-width="0.7"/>`,
      );
    }
    if (dir === 'u') {
      this.rect(x - w / 2, y - 12, w, 12, { weight: 0.7 });
      return this.add(
        `<ellipse cx="${n(x)}" cy="${n(y - 12 - 18)}" rx="12" ry="17" fill="none" stroke="${INK}" stroke-width="0.7"/>`,
      );
    }
    if (dir === 'r') {
      this.rect(x, y - w / 2, 12, w, { weight: 0.7 });
      return this.add(
        `<ellipse cx="${n(x + 12 + 18)}" cy="${n(y)}" rx="17" ry="12" fill="none" stroke="${INK}" stroke-width="0.7"/>`,
      );
    }
    this.rect(x - 12, y - w / 2, 12, w, { weight: 0.7 });
    return this.add(
      `<ellipse cx="${n(x - 12 - 18)}" cy="${n(y)}" rx="17" ry="12" fill="none" stroke="${INK}" stroke-width="0.7"/>`,
    );
  }
  basin(cx, cy) {
    this.rect(cx - 20, cy - 14, 40, 28, { weight: 0.7 });
    return this.add(
      `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="12" ry="8" fill="none" stroke="${INK}" stroke-width="0.6"/>`,
    );
  }
  bath(x, y, w, h) {
    this.rect(x, y, w, h, { weight: 0.8 });
    return this.add(
      `<rect x="${n(x + 8)}" y="${n(y + 8)}" width="${n(w - 16)}" height="${n(h - 16)}" rx="10" fill="none" stroke="${INK}" stroke-width="0.6"/>`,
    );
  }
  shower(x, y, s) {
    this.rect(x, y, s, s, { weight: 0.8 });
    this.line(x, y, x + s, y + s, { weight: 0.4, opacity: 0.6 });
    return this.line(x + s, y, x, y + s, { weight: 0.4, opacity: 0.6 });
  }
  bed(x, y, w, h) {
    this.rect(x, y, w, h, { weight: 0.8 });
    this.rect(x + 8, y + 8, w / 2 - 12, 26, { weight: 0.6 });
    this.rect(x + w / 2 + 4, y + 8, w / 2 - 12, 26, { weight: 0.6 });
    return this.line(x, y + 44, x + w, y + 44, { weight: 0.6 });
  }
  table(x, y, w, h, chairs = 4) {
    this.rect(x, y, w, h, { weight: 0.8 });
    const per = Math.max(1, Math.floor(chairs / 2));
    for (let i = 0; i < per; i++) {
      const cx = x + (w / (per + 1)) * (i + 1);
      this.rect(cx - 14, y - 26, 28, 20, { weight: 0.6 });
      this.rect(cx - 14, y + h + 6, 28, 20, { weight: 0.6 });
    }
    return this;
  }
  joineryRun(x, y, w, h, { newWork = true } = {}) {
    if (newWork) this.rectNew(x, y, w, h);
    else this.rect(x, y, w, h, { weight: 0.8 });
    // door divisions
    const cells = Math.max(1, Math.round((w > h ? w : h) / 60));
    for (let i = 1; i < cells; i++) {
      if (w > h)
        this.line(x + (w / cells) * i, y, x + (w / cells) * i, y + h, {
          weight: 0.5,
          color: newWork ? ACCENT : INK,
        });
      else
        this.line(x, y + (h / cells) * i, x + w, y + (h / cells) * i, {
          weight: 0.5,
          color: newWork ? ACCENT : INK,
        });
    }
    return this;
  }
  // --- sheet furniture ---
  north(cx, cy, r = 22) {
    this.circle(cx, cy, r, { weight: 1 });
    this.path(
      `M${n(cx)} ${n(cy - r + 4)}L${n(cx + 6)} ${n(cy + 6)}L${n(cx)} ${n(cy + 2)}L${n(cx - 6)} ${n(cy + 6)}Z`,
      { weight: 0.8, fill: INK },
    );
    return this.add(
      `<text x="${n(cx)}" y="${n(cy + r + 18)}" font-family="${FONT}" font-size="13" font-weight="500" text-anchor="middle" fill="${INK}">N</text>`,
    );
  }
  scaleBar(x, y, metres = 5) {
    const u = this.unit;
    const segH = 8;
    for (let i = 0; i < metres; i++) {
      this.add(
        `<rect x="${n(x + i * u)}" y="${n(y)}" width="${n(u)}" height="${segH}" fill="${i % 2 ? PAPER : INK}" stroke="${INK}" stroke-width="0.8"/>`,
      );
    }
    for (let i = 0; i <= metres; i++)
      this.note(x + i * u, y - 5, `${i}`, { size: 11, anchor: 'middle' });
    return this.note(x + metres * u + 8, y + segH, 'm', { size: 11 });
  }
  legend(x, y, items) {
    // items: [{swatch:'poche'|'new'|'dashed'|'dotted'|'insulation', text}]
    let cy = y;
    for (const it of items) {
      if (it.swatch === 'poche') this.rectPoche(x, cy - 10, 26, 14);
      if (it.swatch === 'new') this.rectNew(x, cy - 10, 26, 14);
      if (it.swatch === 'dashed')
        this.line(x, cy - 3, x + 26, cy - 3, { dashed: true, weight: 1.2 });
      if (it.swatch === 'dotted') this.dotted(x, cy - 3, x + 26, cy - 3);
      if (it.swatch === 'insulation') this.insulation(x, cy - 10, 26, 14);
      if (it.swatch === 'grey')
        this.add(
          `<rect x="${n(x)}" y="${n(cy - 10)}" width="26" height="14" fill="${INK}" fill-opacity="0.35"/>`,
        );
      if (it.swatch === 'stipple')
        this.add(
          `<rect x="${n(x)}" y="${n(cy - 10)}" width="26" height="14" fill="url(#stipple)" stroke="${INK}" stroke-width="0.6"/>`,
        );
      if (it.swatch === 'crosshatch')
        this.add(
          `<rect x="${n(x)}" y="${n(cy - 10)}" width="26" height="14" fill="url(#crosshatch)" stroke="${INK}" stroke-width="0.6"/>`,
        );
      if (it.swatch === 'accent')
        this.add(`<rect x="${n(x)}" y="${n(cy - 10)}" width="26" height="14" fill="${ACCENT}"/>`);
      if (it.swatch === 'triangle')
        this.add(
          `<path d="M${n(x + 13)} ${n(cy - 11)}L${n(x + 22)} ${n(cy + 4)}L${n(x + 4)} ${n(cy + 4)}Z" fill="none" stroke="${ACCENT}" stroke-width="1.4"/>`,
        );
      if (it.swatch === 'thickdash')
        this.line(x, cy - 3, x + 26, cy - 3, { weight: 4, color: INK });
      this.note(x + 36, cy + 1, it.text, { size: 13 });
      cy += 24;
    }
    return this;
  }
  titleStrip() {
    const y = this.h - this.stripH;
    this.line(0, y, this.w, y, { weight: 1, opacity: 0.35 });
    const ty = y + (this.w < 1300 ? this.stripH * 0.45 : this.stripH * 0.62);
    this.add(
      `<text x="${n(this.w * 0.03)}" y="${n(ty)}" font-family="${FONT}" font-size="14" font-weight="500" fill="${INK}">Bracken &amp; Roe</text>`,
    );
    if (this.w >= 1300) {
      this.add(
        `<text x="${n(this.w * 0.5)}" y="${n(ty)}" font-family="${FONT}" font-size="14" text-anchor="middle" fill="${INK}">${esc(this.number)} — ${esc(this.title)}</text>`,
      );
      if (this.w < 1300) {
        this.add(
          `<text x="${n(this.w * 0.97)}" y="${n(ty)}" font-family="${FONT}" font-size="12" text-anchor="end" fill="${INK}" fill-opacity="0.75">${esc(this.projectTitle)}</text>`,
        );
        this.add(
          `<text x="${n(this.w * 0.03)}" y="${n(ty + 18)}" font-family="${FONT}" font-size="12" fill="${INK}" fill-opacity="0.75">${esc(this.projectTitle)}</text>`,
        );
      } else {
        this.add(
          `<text x="${n(this.w * 0.97)}" y="${n(ty)}" font-family="${FONT}" font-size="12" text-anchor="end" fill="${INK}" fill-opacity="0.75">${esc(this.projectTitle)}</text>`,
        );
      }
    } else {
      this.add(
        `<text x="${n(this.w * 0.97)}" y="${n(y + this.stripH * 0.42)}" font-family="${FONT}" font-size="13" text-anchor="end" fill="${INK}">${esc(this.number)} — ${esc(this.title)}</text>`,
      );
      this.add(
        `<text x="${n(this.w * 0.97)}" y="${n(y + this.stripH * 0.72)}" font-family="${FONT}" font-size="11" text-anchor="end" fill="${INK}" fill-opacity="0.75">${esc(this.projectTitle)}</text>`,
      );
    }
    return this;
  }
  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.w} ${this.h}" width="${this.w}" height="${this.h}" role="img" aria-labelledby="t d">
<title id="t">${esc(this.number)} — ${esc(this.title)} — ${esc(this.projectTitle)}</title>
<desc id="d">${esc(this.description)}</desc>
<defs><pattern id="newwork" patternUnits="userSpaceOnUse" width="8" height="8"><path d="M0 8L8 0" stroke="${ACCENT}" stroke-width="1.2"/></pattern><pattern id="stipple" patternUnits="userSpaceOnUse" width="6" height="6"><circle cx="1.5" cy="1.5" r="0.9" fill="${INK}"/><circle cx="4.5" cy="4.5" r="0.9" fill="${INK}"/></pattern><pattern id="crosshatch" patternUnits="userSpaceOnUse" width="8" height="8"><path d="M0 8L8 0M0 0L8 8" stroke="${INK}" stroke-width="0.8"/></pattern><pattern id="grey" patternUnits="userSpaceOnUse" width="4" height="4"><rect width="4" height="4" fill="${INK}" fill-opacity="0.35"/></pattern></defs>
<rect width="${this.w}" height="${this.h}" fill="${PAPER}"/>
${this.parts.join('\n')}
</svg>
`;
  }
}

/** Build a rectangular wall ring with thickness t from outer rect x,y,w,h (poché). */
export function wallRing(sheet, x, y, w, h, t, { newWork = false } = {}) {
  const outer = [
    [x, y],
    [x + w, y],
    [x + w, y + h],
    [x, y + h],
  ];
  const inner = [
    [x + t, y + t],
    [x + w - t, y + t],
    [x + w - t, y + h - t],
    [x + t, y + h - t],
  ];
  const d = `M${outer.map((p) => p.join(' ')).join('L')}Z M${inner.map((p) => p.join(' ')).join('L')}Z`;
  sheet.add(
    `<path d="${d}" fill="${newWork ? 'url(#newwork)' : INK}" fill-rule="evenodd" stroke="${newWork ? ACCENT : INK}" stroke-width="1"/>`,
  );
  return sheet;
}

export function writeSheet(fs, path, sheet) {
  fs.writeFileSync(path, sheet.render());
}
