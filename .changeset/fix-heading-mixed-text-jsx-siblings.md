---
'@geajs/vite-plugin': patch
---

Stop merging sibling text expressions into a single `textTemplate` prop binding when any sibling can render JSX (for example `cond && (<>…<span>…</>)`). That path assigned `textContent` on the whole element and escaped markup or broke conditional-slot DOM after updates. Skip merged-template and related array-text paths in that situation, and treat the heading like a mixed text run so non-JSX segments patch the correct text node. Adds a jsdom regression test for multipart list titles.
