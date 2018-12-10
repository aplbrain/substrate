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

// @flow

// $FlowFixMe
import * as THREE from 'three';
import Layer from '../Layer';


export default class LightingLayer extends Layer {
    /*
    Classic three-point lighting scheme, as a substrate layer.
    */

    requestInit(scene : Object) {
        let self = this;
        // Key
        let key = new THREE.PointLight(0xfff, 1, 100);
        key.position.set(-5, -5, 5);
        self.children.push(key);
        scene.add(key);
        // Fill
        let fill = new THREE.PointLight(0xccc, 0.7, 100);
        fill.position.set(5, -5, 4);
        self.children.push(fill);
        scene.add(fill);
        // Back
        let back = new THREE.PointLight(0xccc, 0.65, 100);
        back.position.set(-5, 5, 3);
        self.children.push(back);
        scene.add(back);
    }
}
