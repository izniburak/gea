# @geajs/vite-plugin

## 1.0.2

### Patch Changes

- [`82c94f4`](https://github.com/dashersw/gea/commit/82c94f41e5ddce4ad5e9919204577eb48b754ec4) Thanks [@dashersw](https://github.com/dashersw)! - Fix compiler and runtime handling of complex component patterns discovered while building the Jira clone example.

  **@geajs/vite-plugin**
  - Expand `collectDependentPropNames` through class getter bodies so template expressions like `this.someGetter` that transitively read `this.props.*` stay reactive without manually listing props in JSX.
  - Preserve `.map()` callback body statements (variable declarations, early-return guards) through compilation into `renderItem` and `createItem` methods.
  - Register unresolved `.map()` observers on the full member path (e.g. `project.users`) instead of only the first segment, preventing unrelated maps from re-running.
  - Apply `replacePropRefs` rewrite to `createItem` patch expressions so destructured `template()` props work inside `.map()` rows during incremental sync.
  - Walk JSX children in source order during template analysis so conditional slots match the transform pass; merge slot HTML by `slotId` instead of cursor index.
  - Separate conditional slot HTML setup statements from condition setup so truthy/falsy branch rendering has access to all needed variables.
  - Resolve `store-alias` references (`const project = projectStore.project`) and imported-destructured state paths for proper observe key generation.
  - Track text node indices in mixed-content elements to patch individual text nodes instead of overwriting parent `textContent`.
  - Enforce `key` prop on `.map()` root elements at compile time with a clear error message.
  - Prefix component tag names that collide with reserved HTML elements (e.g. `Link` → `gea-link`).
  - Always use the lazy `__ensureChild_` instantiation pattern for compiled child components instead of eager constructor instantiation.
  - Wrap conditional patch initialization in try-catch for resilience against early evaluation errors.
  - Handle multiple `.map()` calls sharing the same item variable via queue-based template injection lookup.

  **@geajs/core**
  - Re-resolve map containers on every `__geaSyncMap` call so DOM replacements after a full template re-render target the live subtree instead of a detached node.
  - Compare list item keys using `item.id` when present instead of `String(object)` (which collapsed to `[object Object]`), so keyed object rows reconcile correctly.
  - Resolve nested map containers inside conditional slots by walking descendants for `data-gea-item-id` markers.
  - Dispose compiled child components when a conditional slot hides its content; re-mount, re-instantiate, and rebind events when it shows.
  - Sync the `value` DOM property alongside the `value` attribute in `__patchNode` and add `__syncValueProps` / `__syncAutofocus` helpers for conditional slot reveals.
  - Trigger `instantiateChildComponents_()` after `__applyListChanges` when child count changes.
  - Deduplicate `__childComponents` entries and skip re-mounting children already rendered at their target element.
  - Propagate array metadata (`arrayPathParts`, `arrayIndex`, `leafPathParts`) on store splice change events.
  - Call `_resolve()` when creating a `Router` even without a route map so `router.path` reflects the initial URL and deep links are not clobbered by redirects.
  - Pass `route` and `page` props to layout components for nested routing.
  - Link: accept `children`, `target`, `rel`, `exact`, and `onNavigate` props; restrict SPA interception to left-click only.

  **@geajs/ui**
  - Remove `SpreadMap` return-type annotations on `getSpreadMap()` to prevent `ReferenceError: SpreadMap is not defined` when compiled through the plugin.
  - Add missing `key` props to `.map()` items across all Zag-based components (Accordion, Combobox, FileUpload, Menu, PinInput, RadioGroup, RatingGroup, Select, TagsInput, ToggleGroup).
  - Dialog: conditionally render the trigger button only when `triggerLabel` is provided.

- [`68c4029`](https://github.com/dashersw/gea/commit/68c4029ce3a80d197f149105aee15b56f76a517d) Thanks [@dashersw](https://github.com/dashersw)! - Pass the item key property from the compiler to the runtime per map registration instead of relying on a global heuristic.

  `__geaRegisterMap` now accepts an optional `keyProp` argument that `__geaSyncItems` uses to extract the reconciliation key from each item. This replaces the module-level `__geaSyncItemKey` function that always assumed `item.id`. Maps whose items use a different key property (e.g. `item.value`) now reconcile correctly without falling back to `[object Object]`.

- [`3de8f86`](https://github.com/dashersw/gea/commit/3de8f86a00a3b824b46f0edcb92ed3ca4a846a5d) Thanks [@dashersw](https://github.com/dashersw)! - Add style objects, ref attribute, and DnD manager overhaul; improve compiler robustness.

  **@geajs/vite-plugin**
  - Support inline style objects with camelCase property names (`style={{ backgroundColor: 'red' }}`). Static objects compile to CSS strings at build time; dynamic objects convert to `cssText` at runtime. Applied consistently across observe patchers, array item patchers, and conditional slot patchers.
  - Support `ref={this.myProp}` attribute: compiles to a `data-gea-ref` marker and generates a `__setupRefs()` method that assigns the DOM element to the component property after render.
  - Handle `key={item}` for primitive-value `.map()` lists where the item itself serves as the key, propagated through all code generators.
  - Move item marker injection (`data-gea-item-id`, container id) into `processElement` in transform-jsx, removing the standalone `insertItemMarker` function.
  - Collect props referenced in full conditional slot expressions (not just the condition) so `__buildProps` methods include all needed props for branch HTML rendering.
  - Detect IIFE expressions as potential JSX producers so immediately-invoked arrow functions are treated as conditional slots.
  - Consolidate child component injection into a single `ClassDeclaration` visitor pass instead of three separate traversals.
  - Skip `data-*`, `class`, `style`, and `id` attributes when detecting hoistable root events to prevent false positives.
  - Throw a clear compile error for Fragment (`<>...</>`) as `.map()` item root.
  - Keyed component array refresh now uses `Map`-based reconciliation: reuses existing instances by key, disposes removed ones, and reorders DOM to match the new array order.
  - HMR: skip getter/setter properties when snapshotting component state to avoid triggering side effects during hot reload.
  - Log warnings instead of silently swallowing errors in `getHoistableRootEvents` and HMR code generation.

  **@geajs/core**
  - Add `Store.silent(fn)` method that executes mutations without triggering observers — useful for drag-and-drop and other bulk operations that handle their own DOM updates.
  - Set `__geaComponent` back-reference on rendered elements so the DnD manager can walk from DOM to component instances. Cleared on dispose.
  - Call `__setupRefs()` after render and re-render cycles when the method exists, enabling the `ref` attribute feature.

  **@geajs/ui**
  - Overhaul `DndManager` to move the actual source element instead of cloning: removes the clone-based approach, moves the element to `document.body` with fixed positioning during drag, and restores it on drop or cancel.
  - Auto-discover droppables via `[data-droppable-id]` and draggables via `[data-draggable-id]` attributes — no manual registration required.
  - Add animated placeholder with height transitions when moving between containers, and a shrinking ghost element at the vacated position.
  - Direction-aware drop index calculation (threshold adjusts based on pointer movement direction).
  - Perform DOM transfer on drop: physically move the element and update the Gea component tree (`__childComponents`, `parentComponent`) to match.
  - Skip `onDragEnd` callback when dropping back at the original position.
  - Export `dndManager` singleton, `DragResult` type, `Draggable`, `Droppable`, and `DragDropContext` from the package index.

## 1.0.1

### Patch Changes

- [`977a065`](https://github.com/dashersw/gea/commit/977a0657ec905cc23548ffb12e9cd320c8c06ded) Thanks [@dashersw](https://github.com/dashersw)! - Fix compiler handling of hyphenated component names, template-scoped variables, early-return guards, && guards with .map(), class getter reactivity, and render props. Improve component discovery with import-based global registry. Fix Router to read initial URL on construction and add navigate() alias.
