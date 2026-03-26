---
"@geajs/core": patch
"@geajs/ui": patch
---

Replace the catch-all `JSX.IntrinsicElements` index signature with React DOM typings plus Gea-specific augmentations (`class`, short event names, `for` on labels). Make `Component` generic for typed props. Add `ButtonProps` / `DialogProps` and tighten a few UI components for TypeScript compatibility.
