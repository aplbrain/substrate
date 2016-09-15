# Visualizer

## Exposed Properties: Functions

### `onClick` (`Visualizer`, `event`, `[objects]`)
You may optionally pass an `onClick` property to the Visualizer. If you pass a function, it will receive a reference to the Visualizer that called it, the mouse-click event, and an array of objects in the scene for which that click may apply, ordered by distance from the camera (with the 0th element being the closest).

### `onKeyDown` (`Visualizer`, `event`)
The onKeyDown listener will receive a reference to its calling Visualizer, as well as the keydown event itself.

## Exposed Properties: Attributes

### `cameraDistance`: `Number`
A number that is the maximum camera distance from the origin when zooming.

### `renderLayers`: `[Layer]`
An array of `Layer`s.
