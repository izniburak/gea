---
"@geajs/core": patch
"@geajs/vite-plugin": patch
---

Pass the item key property from the compiler to the runtime per map registration instead of relying on a global heuristic.

`__geaRegisterMap` now accepts an optional `keyProp` argument that `__geaSyncItems` uses to extract the reconciliation key from each item. This replaces the module-level `__geaSyncItemKey` function that always assumed `item.id`. Maps whose items use a different key property (e.g. `item.value`) now reconcile correctly without falling back to `[object Object]`.
