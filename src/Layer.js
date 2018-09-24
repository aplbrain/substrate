/*
Copyright 2016 The Johns Hopkins University Applied Physics Laboratory

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// @flow


class Layer {

    children : Array<Object>;
    visible : boolean;

    constructor(props : Object) {
        // the `children` array holds all objects that this layer should be
        // responsible for. If you remove this layer from the scene, .children
        // should hold all objects that need to be removed. It's courteous to
        // clean up after yourself!
        this.children = [];
        this.visible = true;
    }

    getRaycastIntersects() : Array<Object> {
        // Stubbed.
        return [];
    }

    getAtCoordinate(xyz : Array<number>) : Array<Object> {
        /*
        Returns the metadata for the object in this layer at the position
        (x, y, z).

        Arguments:
            xyz (array): [x, y, z] point, in *global* space.

        Returns:
            Dictionary: Metadata.
        */
        // Stubbed.
        return [];
    }

    rescale(xyz : Array<number>) {
        /*
        Convert layer-space into global space. For instance, if your images are
        10x10 but need to be half the size when rendered, this should return
        [x/2, y/2, z/2].

        Arguments:
            xyz (array): [x, y, z] point, in *global* space.

        Returns:
            [x, y, z]
        */
        return xyz;
    }

    clearChildren(scene : Object) {
        /*
        Remove all of this layer's children from the scene.

        Arguments:
            scene (THREE.Scene): The scene from which to remove children objs

        Returns:
            None
        */
        let self = this;
        for (var i = 0; i < self.children.length; i++) {
            scene.remove(self.children[i]);
        }
    }

    toggleVisibility() {
        this.visible = !this.visible;
        this.children.forEach(c => c.visible = this.visible);
    }

    requestInit(scene : Object) {
        /*
        This is run whenever the Visualizer requests that the layer be _fully_
        re-rendered from scratch. Override this function with your own layer's
        code for creating objects and adding them to `scene`. Be courteous and
        either (1) add these objects to the this.children array, or (2) ALSO
        override `this.clearChildren` with code to remove any objects that this
        layer makes from the scene.

        Arguments:
            scene (THREE.Scene): The scene to which objects should be added

        Returns:
            None
        */
        let self = this;
        // Permit adding to scene and attaching hooks.
    }

    requestRender(scene : Object) {
        /*
        This is run whenever the Visualizer requests that the layer be partially
        re-rendered (useful in cases where you simply need to update a material
        or position, but don't need to completely regenerate the entire mesh).
        Override this function with your own layer's code for updating existing
        objects from `this.children`.

        Arguments:
            scene (THREE.Scene): The scene in which objects reside.

        Returns:
            boolean: True if a re-render was performed; false if not. This is
                simply a courtesy to other listeners, and does not affect the
                render loop. Note that in future versions, a layer that rarely
                returns `true` may have its `requestRender` function less
                frequently called.
        */
        // Render loop.
        let self = this;
        return false;
    }
}

export default Layer;
