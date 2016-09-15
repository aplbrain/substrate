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

import ThreejsLayer from '../ThreejsLayer.jsx';

export default class LineSegmentsLayer extends ThreejsLayer {
    /*
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
    */

    constructor(props) {
        super(props);
        this.getData = props.getData;
    }

    rescale(xyz) {
        return [
            (xyz[0] / 10),
            (xyz[1] / 10),
            (xyz[2] / 10),
        ];
    }

    requestInit(scene) {
        let self = this;
        self.needsUpdate = true;

        self.fibers = self.getData();
        self.children = [];

        for (var i = 0; i < self.fibers.length; i++) {
            var fiberGeometry = new THREE.Geometry();
            let starter = new THREE.Mesh(
                new THREE.SphereGeometry(0.025, 5, 5),
                new THREE.MeshBasicMaterial()
            );
            starter.position.set(...self.rescale(self.fibers[i][0]));
            scene.add(starter);
            for (var j = 0; j < self.fibers[i].length; j++) {
                if (j % 1 === 0) {
                    fiberGeometry.vertices.push(
                        new THREE.Vector3(
                            ...self.rescale(self.fibers[i][j])
                        )
                    );
                }
            }
            var line = new THREE.Line(
                fiberGeometry,
                new THREE.LineBasicMaterial({
                    color: 0x00ffff * self.fibers[i].length / 200,
                })
            );
            self.children.push(line);

            scene.add(line);
        }
    }
}
