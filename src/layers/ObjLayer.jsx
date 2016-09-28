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

import ThreejsLayer from '../ThreejsLayer';

export default class ObjLayer extends ThreejsLayer {
    /*
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
    */

    constructor(props) {
        super(props);
        this.getData = props.getData;
        this._material = props.material;
    }

    requestInit(scene) {
        let self = this;
        self.needsUpdate = true;

        let mesh = new THREE.OBJLoader().parse(self.getData());
        self._meshGeometry = new THREE.Mesh(
            new THREE.Geometry().fromBufferGeometry(mesh.children[0].geometry),
            new THREE.MeshBasicMaterial(self._material)
        );
        self.children = [self._meshGeometry];

        scene.add(self._meshGeometry);
    }
}
