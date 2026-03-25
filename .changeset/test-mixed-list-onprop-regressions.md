---
'@geajs/core': patch
'@geajs/vite-plugin': patch
---

Add regression tests for `__reorderChildren` with static siblings before keyed list items, for `expressionAccessesValueProperties` / conditional `__onPropChange` nullish guards, and for clearing child text when a primitive prop becomes null (`value || ''`).
