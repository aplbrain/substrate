# Changelog

- 1.0.3
    - **`Visualizer#resize()` function**: Can take 1, 2, or 0 arguments:
        - If called with no arguments, resizes to fill container.
        - `resize(undefined, 100)` resizes `x` to fill the container, and `y` to 100 pixels. `resize(10, 20)` resizes to 10 by 20 pixels, and `resize(10, undefined)` resizes `x` to 10 pixels and `y` to fill the container.
