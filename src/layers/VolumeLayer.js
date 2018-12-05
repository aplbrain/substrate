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


const frag = `\
uniform sampler2D texture;

varying vec3 vColor;

void main() {
    gl_FragColor = vec4(vColor, 1.0);
    // gl_FragColor = gl_FragColor * texture2D(texture, gl_PointCoord);
    // if ( gl_FragColor.a < ALPHATEST ) discard;

}
`;

const vert = `\
attribute float size;
varying vec3 vColor;
void main() {
    vColor = color;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}
`;

// $FlowFixMe
import * as THREE from 'three/build/three.min';
import Layer from '../Layer';


export default class VolumeLayer extends Layer {


    constructor(props) {
        super(props);
        this.data = props.data;
        this.shape = props.shape;
        this.mask = props.mask;
        this.scale = props.scale || {x: 1, y: 1, z: 1};
        this.origin = props.origin || {x: 0, y: 0, z: 0};
        this.radius = 5;
    }

    requestInit(scene) {
        let self = this;

        var shaderMaterial = new THREE.ShaderMaterial({

            vertexShader: vert,
            fragmentShader: frag,

            blending: THREE.NormalBlending,
            // blending: THREE.AdditiveBlending,
            depthTest: true,
            transparent: false,
            vertexColors: true

        });


        let geometry = new THREE.BufferGeometry();

        var positions = [];
        var colors = [];
        var sizes = [];

        var color = new THREE.Color();

        for (var i = 0; i < self.shape[0]; i++) {
            for (var j = 0; j < self.shape[1]; j++) {
                for (var k = 0; k < self.shape[2]; k++) {
                    let addToScene = true;

                    let dataIndex = (((i * self.shape[1]) + j) * self.shape[2]) + k;

                    let r, g, b;
                    if (Array.isArray(self.data[dataIndex])) {
                        r = self.data[dataIndex][0];
                        g = self.data[dataIndex][1];
                        b = self.data[dataIndex][2];
                    } else {
                        r = self.data[dataIndex];
                        g = r;
                        b = r;
                    }
                    if (!self.mask || self.mask[dataIndex]) {
                        positions.push(i * self.scale.x + self.origin.x);
                        positions.push(j * self.scale.y + self.origin.y);
                        positions.push(k * self.scale.z + self.origin.z);
                        colors.push(r, g, b);
                        sizes.push(this.radius);
                    }
                }
            }
        }

        geometry.addAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.addAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.addAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        let particleSystem = new THREE.Points(geometry, shaderMaterial);

        self.children.push(particleSystem);
        scene.add(particleSystem);
    }
}
