# Changelog

- 1.1.0
    - **Add TrackballControls to live endogenously inside substrate**. Remove reliance upon window.THREE.
	- **Add loaders/OBJLoader**
	- **Add `MeshLayer`** to natively supported layers
- 1.0.4
    - **Visualizer#addLayer` and `Visualizer#removeLayer`**: Add and remove layers after the Visualizer has been created and rendered.
- 1.0.3 (September 7, 2017)
    - **`Visualizer#resize()` function**: Can take 1, 2, or 0 arguments:
        - If called with no arguments, resizes to fill container.
        - `resize(undefined, 100)` resizes `x` to fill the container, and `y` to 100 pixels. `resize(10, 20)` resizes to 10 by 20 pixels, and `resize(10, undefined)` resizes `x` to 10 pixels and `y` to fill the container.
