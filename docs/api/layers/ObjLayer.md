---
layout: default
---


# ObjLayer

Renders a .obj-formatted mesh from a string. For example,

    let mesh = `
        v 0 0 0
        v 0 0 1
        v 0 1 0
        f 1 2 3
    `;

    new ObjLayer({
        getData: () => {
            return mesh;
        }
    });
