---
"@geajs/core": patch
"@geajs/vite-plugin": patch
---

### @geajs/core (patch)

- **Runtime helpers**: Added `__child()`, `__el()`, `__updateText()`, `__observe()`, `__observeList()`, `__reconcileList()`, `__reorderChildren()` methods to Component base class, reducing compiled output size and complexity
- **`__refreshList` runtime helper**: Force-reconcile a list config by re-reading getter values through the store proxy, used by compiler-generated delegates for getter-backed array maps
- **Capture phase for non-bubbling events**: Event delegation now uses capture phase for events like `focus`, `blur`, `mouseenter`, `mouseleave` that don't bubble
- **Lazy component mount sync**: Pre-created list items are synced after lazy component mount to avoid stale DOM

### @geajs/vite-plugin (patch)

- **Cleaner compiler output**: Compiler now generates calls to runtime helpers instead of inlining boilerplate. Child components created eagerly in constructor via `__child()`. Array rendering uses `__observeList()` with change-type-aware updates. Duplicate observers merged. `__via` indirection eliminated.
- **Getter-backed component array maps**: Generate delegate observers for computed getter dependencies so that component array maps (e.g. `store.filteredTracks.map(...)`) update when underlying store properties change
- **Map registration setup statements**: Always include `computationSetupStatements` in `getItems` lambda for `__geaRegisterMap`, regardless of whether template prop replacement is needed
- **Computed array setup**: Include `arrSetupStatements` before `constructorInit` for computed arrays
- **Three compiler bugs blocking e2e tests**: Fixed multi-part getter paths, TemplateLiteral expansion in `collectTextChildren`, and `rewriteStateRefs` for destructured store/local refs
- **Enhanced map registration and class handling**: Fix class toggle bindings and improve map registration for components with multiple reactive dependencies
- **Style expression deduplication**: Inline style objects no longer triplicate `Object.entries().map().join()` in template output — the unnecessary null/false guard is eliminated since object literals are always truthy
- **Dead code elimination in conditional callbacks**: Fix `pruneDeadParamDestructuring` to skip binding targets (LHS) of variable declarators. Functional components with multiple conditionals no longer emit unused prop destructuring in truthy render callbacks.
- **Deduplicate store observer methods**: When a text template references multiple store properties (e.g. `${store.a} / ${store.b}`), each property previously got its own observer method with an identical body. The compiler now keeps one canonical method and redirects all subscriptions to it, reducing compiled output size.
