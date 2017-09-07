---
layout: default
---

# Visualizer

## Exposed Functions

### `addLayer` (`key : string`, `layer : Layer`)
Add a Layer to the Visualizer.

### `removeLayer` (`key : string`)
Remove the layer from the scene with the key specified.

### `resize` `(x : number, y: number)`
Resizes the visualizer to X by Y pixels. All arguments are optional:

`V.resize()` resizes to fill the container.

`V.resize(10, undefined)` resizes automatically in Y, and sizes to 10 pixels in X.

`V.resize(500, 100)` resizes to 500px X, 100px Y.

### `onClick` (`Visualizer`, `event`, `[objects]`)
You may optionally pass an `onClick` property to the Visualizer. If you pass a function, it will receive a reference to the Visualizer that called it, the mouse-click event, and an array of objects in the scene for which that click may apply, ordered by distance from the camera (with the 0th element being the closest).

### `onKeyDown` (`Visualizer`, `event`)
The onKeyDown listener will receive a reference to its calling Visualizer, as well as the keydown event itself.

## Exposed Attributes

### `cameraDistance`: `Number`
A number that is the maximum camera distance from the origin when zooming.

### `renderLayers`: `{String: Layer}`
A dictionary or array of `Layer`s. If you specify an array, order is not guaranteed (that is, `renderLayer[0]` may be moved to `renderLayer[1]` without notice). If you want access to your layers after declaration, it is recommended that you provide a dictionary instead, in the form `{myLabel: Layer() }`. You can then access that layer using `Visualizer.renderLayers.myLabel` or `Visualizer.renderLayer['myLabel']`.

Note that this does not break compatibility with earlier `substrate` versions.

### `startingCameraPosition`: `[x : number, y : number, z : number]`
A point in XYZ space at which the camera should be placed before the first render-cycle.

### `width`: `number`
In pixels. Optional.
### `height`: `number`
In pixels. Optional.
