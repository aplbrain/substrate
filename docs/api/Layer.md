---
layout: page
---

# ThreejsLayer

A `Layer` is a subset of objects and interactability that can be placed in a Visualizer scene.

If you are implementing your own `Layer`, you should provide the following:

## Functions

### `requestInit`: (`THREE.Scene`)
This is run whenever the Visualizer requests that the layer be _fully_
re-rendered from scratch. Override this function with your own layer's
code for creating objects and adding them to `scene`. Be courteous and
either (1) add these objects to the this.children array, or (2) ALSO
override `this.clearChildren` with code to remove any objects that this
layer makes from the scene.

Arguments:
- `scene` (`THREE.Scene`): The scene in which objects reside.

### `requestRender`: (`THREE.Scene`)
This is run whenever the Visualizer requests that the layer be partially
re-rendered (useful in cases where you simply need to update a material
or position, but don't need to completely regenerate the entire mesh).
Override this function with your own layer's code for updating existing
objects from `this.children`.

Arguments:
- `scene` (`THREE.Scene`): The scene in which objects reside.

Returns:
- `boolean`: True if a re-render was performed; false if not. This is simply a courtesy to other listeners, and does not affect the render loop. Note that in future versions, a layer that rarely returns `true` may have its `requestRender` function less frequently called.


## Optional Functions

### `rescale`: ([`Number`, `Number`, `Number`]) → [`Number`, `Number`, `Number`]
Convert layer-space into global space. For instance, if your images are
10x10 but need to be half the size when rendered, this should return
`[xyz[0]/2, xyz[1]/2, xyz[2]/2]`.

By default, this performs no rescale (i.e., it returns `xyz`).

Arguments:
- `xyz` (array): [x, y, z] point, in *global* space.

Returns:
- `[x, y, z]`

### `clearChildren`
You may choose to implement a `clearChildren` function as well. This is run by default when the Layer is removed from the Scene, but you may also call it internally to clear all objects from `scene.children` that should not exist after the layer is removed.

This is only a courtesy to prevent memory-leaks, orphaned 3D objects, or stale object references; it will not affect the Visualizer's render loop.

By default, this removes all items in `Layer#children`, so if you choose not to implement this function, you may opt to only ever add objects to the scene that have been added to the `children` array; then, cleanup is done for you.
