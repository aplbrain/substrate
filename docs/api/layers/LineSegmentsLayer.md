---
layout: default
---

# LineSegmentsLayer

This layer renders an array of LineSegments. To use it, declare your layer
like so:

    let line1 = [
        [0, 0, 0],
        [1, 1, 1],
        [2, 5, 3]
    ];

    let line2 = [
        [1, 0, 2],
        [1, 4, 1],
        [7, 5, 7]
    ];

    new LineSegmentsLayer({
        getData: () => {
            return [line1, line2]
        }
    })

That is, the `getData` prop should return an array of at least one line,
where points on the line are represented as [x, y, z] point-arrays.
