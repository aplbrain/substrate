---
layout: page
---

# Visualizer

## Exposed Properties: Functions

### `onClick` (`Visualizer`, `event`, `[objects]`)
You may optionally pass an `onClick` property to the Visualizer. If you pass a function, it will receive a reference to the Visualizer that called it, the mouse-click event, and an array of objects in the scene for which that click may apply, ordered by distance from the camera (with the 0th element being the closest).

### `onKeyDown` (`Visualizer`, `event`)
The onKeyDown listener will receive a reference to its calling Visualizer, as well as the keydown event itself.

## Exposed Properties: Attributes

### `cameraDistance`: `Number`
A number that is the maximum camera distance from the origin when zooming.

### `renderLayers`: `{String: Layer}`
A dictionary or array of `Layer`s. If you specify an array, order is not guaranteed (that is, `renderLayer[0]` may be moved to `renderLayer[1]` without notice). If you want access to your layers after declaration, it is recommended that you provide a dictionary instead, in the form `{myLabel: Layer() }`. You can then access that layer using `Visualizer.renderLayers.myLabel` or `Visualizer.renderLayer['myLabel']`.

Note that this does not break compatibility with earlier `substrate` versions.

### `startingCameraPosition`: `[Number, Number, Number]`
A point in XYZ space at which the camera should be placed before the first render-cycle.
