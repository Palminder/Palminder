# Diagram sources

Keep the editable source of every architecture or process diagram here (draw.io `.drawio`,
Excalidraw `.excalidraw`, Mermaid `.mmd`, or similar), one folder per case study or lab:

```
diagrams/
  endpoint-provisioning-and-security-baseline/
    architecture.drawio
    architecture.svg        ← exported, sanitised, then copied next to the content entry
```

Rendering happens outside the build: export the diagram to SVG or PNG, run it through
SANITISATION_CHECKLIST.md (no hostnames, tenant names, identifiers, embedded fonts, scripts or
metadata), then copy the export next to the Markdown entry (or into `src/assets/`) and reference it
from the entry's `diagram.image`. Astro optimises raster images at build time; SVGs are served as-is.

Every diagram needs a caption and a written `textAlternative` in frontmatter.
