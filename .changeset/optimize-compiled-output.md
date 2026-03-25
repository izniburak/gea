---
"@geajs/vite-plugin": patch
---

### @geajs/vite-plugin (patch)

- **Style expression deduplication**: Inline style objects (`style={{ backgroundColor: color }}`) no longer triplicate the `Object.entries().map().join()` expression in the template output. Since object literals are always truthy, the `== null || === false` guard is eliminated entirely, reducing compiled code size.
- **Dead code elimination in conditional callbacks**: Fix `pruneDeadParamDestructuring` to skip binding targets (LHS) of variable declarators when collecting referenced identifiers. Previously, destructuring patterns in sibling statements (e.g. `const { selected } = this.props`) were counted as "references", preventing dead code removal. Functional components with multiple conditionals no longer emit unused prop destructuring in truthy render callbacks.
