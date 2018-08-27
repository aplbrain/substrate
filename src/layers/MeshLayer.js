/*
Copyright 2018 The Johns Hopkins University Applied Physics Laboratory

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

import * as THREE from 'three';
import Layer from '../Layer';
import OBJLoader from '../loaders/OBJLoader';

THREE.OBJLoader = OBJLoader;


export default class MeshLayer extends Layer {
    /*
    A layer that renders a mesh to the scene.
    */
    constructor(props) {
        super(props);
        this.data = props.data;
        this.path = props.path;
        this.opacity = props.opacity;
        this.origin = props.origin || new THREE.Vector3(0, 0, 0);
        this.scale = props.scale || new THREE.Vector3(1, 1, 1);

        if (!props.material) {
            if (props.opacity) {
                this._material = new THREE.MeshNormalMaterial({
                    opacity: props.opacity,
                    side: THREE.DoubleSide,
                    transparent: true
                });
            } else {
                this._material = new THREE.MeshNormalMaterial({
                    side: THREE.DoubleSide,
                });
            }
        } else {
            this._material = props.material;
        }
    }

    requestInit(scene) {
        let self = this;

        let meshData, _mesh;
        if (self.data) {
            console.log(`Parsing data as OBJ syntax...`);
            meshData = new THREE.OBJLoader.OBJLoader().parse(self.data);
            _mesh = new THREE.Mesh(
                new THREE.Geometry().fromBufferGeometry(meshData.children[0].geometry),
                self._material
            );
            self.children = [_mesh];
            _mesh.position.set(this.origin.x, this.origin.y, this.origin.z);
            _mesh.scale.set(self.scale.x, self.scale.y, self.scale.z);

            scene.add(_mesh);
        } else if (self.path) {
            console.log(`Parsing ${self.path} as path...`);
            meshData = new THREE.OBJLoader.OBJLoader().load(self.path, (_mesh) => {
                console.log(_mesh);
                _mesh = new THREE.Mesh(
                    new THREE.Geometry().fromBufferGeometry(_mesh.children[0].geometry),
                    self._material
                );
                self.children = [_mesh];
                _mesh.position.set(this.origin.x, this.origin.y, this.origin.z);
                _mesh.scale.set(self.scale.x, self.scale.y, self.scale.z);

                scene.add(_mesh);
            });
        } else {
            throw Error("Must provide one of data or path to MeshLayer.");
        }
    }
}
