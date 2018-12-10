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
import * as THREE from 'three/build/three.min';
import Layer from '../Layer';


export default class AxisLayer extends Layer {
    /*
    The hello-world of layers. Renders a 5-radius RGB-XYZ axis.
    */

    requestInit(scene : Object) {
        let self = this;
        let axes = new THREE.AxesHelper(5);
        self.children.push(axes);
        scene.add(axes);
    }
}
