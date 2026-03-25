---
"@geajs/vite-plugin": patch
---

### @geajs/vite-plugin (patch)

- **Map registration setup statements**: Always include `computationSetupStatements` in `getItems` lambda for `__geaRegisterMap`, regardless of whether template prop replacement is needed. Previously, destructuring statements (e.g. `const { categories } = store`) were only included when `needsReplace` was true, causing `ReferenceError` at runtime for components without template props.
