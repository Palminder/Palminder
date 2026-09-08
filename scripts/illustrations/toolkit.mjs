// Flat-colour illustration toolkit for the site's context imagery. Every scene is built from
// the brand palette only (Paper, Ink, Sandstone, Stone, Terracotta, Moss) with ink overlays for
// shade, so the set reads as one considered graphic language rather than photography.
// No text is ever drawn inside a scene.
export const PAPER = '#F3F0E8';
export const INK = '#242722';
export const SANDSTONE = '#D5C2A3';
export const STONE = '#C8C2B6';
export const TERRACOTTA = '#8C4F3D';
export const MOSS = '#405448';
export const WHITE = '#FBFAF6';

const n = (v) => (Math.round(v * 100) / 100).toString();

export class Scene {
  constructor({ width, height, title, description }) {
    this.w = width;
    this.h = height;
    this.title = title;
    this.description = description;
    this.parts = [];
  }
  add(s) {
    this.parts.push(s);
    return this;
  }
  rect(x, y, w, h, fill, { opacity = 1 } = {}) {
    return this.add(
      `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${fill}"${opacity !== 1 ? ` fill-opacity="${opacity}"` : ''}/>`,
    );
  }
  poly(points, fill, { opacity = 1 } = {}) {
    return this.add(
      `<polygon points="${points.map((p) => `${n(p[0])},${n(p[1])}`).join(' ')}" fill="${fill}"${opacity !== 1 ? ` fill-opacity="${opacity}"` : ''}/>`,
    );
  }
  line(x1, y1, x2, y2, { weight = 1, color = INK, opacity = 0.18 } = {}) {
    return this.add(
      `<line x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}" stroke="${color}" stroke-width="${weight}" stroke-opacity="${opacity}"/>`,
    );
  }
  circle(cx, cy, r, fill, { opacity = 1 } = {}) {
    return this.add(
      `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(r)}" fill="${fill}"${opacity !== 1 ? ` fill-opacity="${opacity}"` : ''}/>`,
    );
  }
  /** Ink shade over a region (0.06–0.3 typical). */
  shade(x, y, w, h, amount = 0.12) {
    return this.rect(x, y, w, h, INK, { opacity: amount });
  }
  /** Paper light over a region. */
  light(x, y, w, h, amount = 0.25) {
    return this.rect(x, y, w, h, PAPER, { opacity: amount });
  }
  // ---- sky and ground ----
  sky(fill = PAPER) {
    return this.rect(0, 0, this.w, this.h, fill);
  }
  /** Overcast Glasgow sky: paper with a faint stone gradient band at the horizon. */
  overcast(horizonY) {
    this.rect(0, 0, this.w, this.h, PAPER);
    for (let i = 0; i < 6; i++)
      this.rect(0, horizonY - (i + 1) * 40, this.w, 40, STONE, { opacity: 0.05 * (6 - i) });
    return this;
  }
  pavement(y, { depth = 40, kerb = true } = {}) {
    this.rect(0, y, this.w, this.h - y, STONE);
    this.shade(0, y, this.w, this.h - y, 0.06);
    if (kerb) this.rect(0, y, this.w, 6, INK, { opacity: 0.22 });
    this.rect(0, y + depth, this.w, 2, INK, { opacity: 0.1 });
    return this;
  }
  // ---- masonry ----
  /** Sandstone façade with faint coursing. */
  facade(x, y, w, h, { fill = SANDSTONE, course = 34, tone = 0 } = {}) {
    this.rect(x, y, w, h, fill);
    if (tone) this.shade(x, y, w, h, tone);
    for (let cy = y + course; cy < y + h; cy += course)
      this.line(x, cy, x + w, cy, { opacity: 0.09 });
    return this;
  }
  /** String course / cornice band with a shadow beneath. */
  cornice(x, y, w, h = 14) {
    this.rect(x, y, w, h, SANDSTONE);
    this.light(x, y, w, h, 0.3);
    this.shade(x, y + h, w, h * 0.7, 0.16);
    return this;
  }
  /** Sash window with reveal shade, sill and meeting rail. */
  window(x, y, w, h, { reveal = 8, sill = true, lit = false } = {}) {
    this.shade(x - reveal, y - reveal, w + reveal * 2, h + reveal, 0.22); // reveal
    this.rect(x, y, w, h, INK, { opacity: 0.82 });
    if (lit) this.rect(x, y, w, h, SANDSTONE, { opacity: 0.35 });
    this.light(x + 3, y + 3, w - 6, h * 0.42, 0.1); // sky reflection
    this.rect(x, y + h / 2 - 2, w, 4, PAPER, { opacity: 0.85 }); // meeting rail
    this.rect(x + w / 2 - 1.5, y, 3, h, PAPER, { opacity: 0.65 }); // astragal
    if (sill)
      (this.rect(x - reveal - 4, y + h, w + reveal * 2 + 8, 7, SANDSTONE),
        this.light(x - reveal - 4, y + h, w + reveal * 2 + 8, 7, 0.35),
        this.shade(x - reveal - 4, y + h + 7, w + reveal * 2 + 8, 6, 0.18));
    return this;
  }
  /** Three-sided bay window rising through `storeys` floors from y to y+h. */
  bay(x, y, w, h, { side = 0.22 } = {}) {
    const s = w * side;
    this.rect(x, y, w, h, SANDSTONE);
    this.shade(x, y, s, h, 0.14); // left return in shade
    this.light(x + w - s, y, s, h, 0.12); // right return catching light
    this.line(x + s, y, x + s, y + h, { opacity: 0.25 });
    this.line(x + w - s, y, x + w - s, y + h, { opacity: 0.25 });
    return { inner: [x + s, x + w - s] };
  }
  door(x, y, w, h, { fanlight = true, fill = INK } = {}) {
    this.shade(x - 8, y - 8, w + 16, h + 8, 0.2);
    this.rect(x, y, w, h, fill, { opacity: 0.88 });
    this.rect(x + w / 2 - 1.5, y + (fanlight ? h * 0.22 : 0), 3, h, PAPER, { opacity: 0.4 });
    if (fanlight) {
      this.rect(x, y, w, h * 0.18, INK, { opacity: 0.7 });
      this.light(x + 3, y + 3, w - 6, h * 0.12, 0.25);
    }
    return this;
  }
  /** Pitched slate roof drawn as a band with ridge highlight. */
  roof(x, y, w, h, { fill = INK } = {}) {
    this.rect(x, y, w, h, fill, { opacity: 0.55 });
    for (let cy = y + 12; cy < y + h; cy += 12)
      this.line(x, cy, x + w, cy, { color: PAPER, opacity: 0.12 });
    this.rect(x, y, w, 4, PAPER, { opacity: 0.35 });
    return this;
  }
  chimney(x, y, w, h, pots = 3) {
    this.rect(x, y, w, h, SANDSTONE);
    this.shade(x, y, w, h, 0.08);
    this.rect(x - 4, y, w + 8, 8, SANDSTONE);
    this.light(x - 4, y, w + 8, 8, 0.3);
    const pw = w / (pots * 2 + 1);
    for (let i = 0; i < pots; i++)
      this.rect(x + pw * (2 * i + 1), y - 26, pw, 26, TERRACOTTA, { opacity: 0.9 });
    return this;
  }
  rooflight(x, y, w, h) {
    this.rect(x - 3, y - 3, w + 6, h + 6, PAPER, { opacity: 0.7 });
    this.rect(x, y, w, h, INK, { opacity: 0.8 });
    this.light(x + 3, y + 3, w - 6, h * 0.4, 0.25);
    return this;
  }
  /** Painted timber shopfront: stallriser, glazing, fascia. */
  shopfront(x, y, w, h, { fascia = 0.2, stallriser = 0.18, fill = MOSS, pilaster = 18 } = {}) {
    const fh = h * fascia,
      sh = h * stallriser;
    this.rect(x, y, w, h, fill);
    this.rect(x + pilaster, y + fh, w - pilaster * 2, h - fh - sh, INK, { opacity: 0.85 }); // glazing
    this.light(x + pilaster + 4, y + fh + 4, w - pilaster * 2 - 8, (h - fh - sh) * 0.45, 0.12);
    this.rect(x + pilaster, y + fh + (h - fh - sh) * 0.22, w - pilaster * 2, 4, fill); // transom
    this.shade(x, y + fh, w, 6, 0.25); // fascia shadow
    this.light(x, y, w, fh, 0.08);
    return this;
  }
  /** Lime joint pattern for close masonry studies. */
  coursing(
    x,
    y,
    w,
    h,
    { course = 60, stone = 150, joint = 6, fill = SANDSTONE, jointFill = STONE } = {},
  ) {
    this.rect(x, y, w, h, jointFill);
    let row = 0;
    for (let cy = y; cy < y + h; cy += course + joint) {
      const offset = row % 2 ? stone / 2 : 0;
      for (let cx = x - offset; cx < x + w; cx += stone + joint) {
        const sx = Math.max(cx, x),
          ex = Math.min(cx + stone, x + w);
        if (ex > sx) {
          const tone = ((row * 7 + Math.round(cx / 10)) % 5) * 0.025;
          this.rect(sx, cy, ex - sx, Math.min(course, y + h - cy), fill);
          if (tone) this.shade(sx, cy, ex - sx, Math.min(course, y + h - cy), tone);
        }
      }
      row++;
    }
    return this;
  }
  render() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${this.w} ${this.h}" width="${this.w}" height="${this.h}" role="img" aria-labelledby="t d">
<title id="t">${esc(this.title)}</title>
<desc id="d">${esc(this.description)}</desc>
${this.parts.join('\n')}
</svg>
`;
  }
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
