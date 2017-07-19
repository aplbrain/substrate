'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three/build/three.min');

var THREE = _interopRequireWildcard(_three);

var _ThreejsLayer2 = require('../ThreejsLayer');

var _ThreejsLayer3 = _interopRequireDefault(_ThreejsLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

var LineSegmentsLayer = function (_ThreejsLayer) {
    _inherits(LineSegmentsLayer, _ThreejsLayer);

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

    function LineSegmentsLayer(props) {
        _classCallCheck(this, LineSegmentsLayer);

        var _this = _possibleConstructorReturn(this, (LineSegmentsLayer.__proto__ || Object.getPrototypeOf(LineSegmentsLayer)).call(this, props));

        _this.getData = props.getData;
        return _this;
    }

    _createClass(LineSegmentsLayer, [{
        key: 'rescale',
        value: function rescale(xyz) {
            return [xyz[0] / 10, xyz[1] / 10, xyz[2] / 10];
        }
    }, {
        key: 'requestInit',
        value: function requestInit(scene) {
            var self = this;
            self.needsUpdate = true;

            self.fibers = self.getData();
            self.children = [];

            for (var i = 0; i < self.fibers.length; i++) {
                var fiberGeometry = new THREE.Geometry();

                for (var j = 0; j < self.fibers[i].length; j++) {
                    if (j % 1 === 0) {
                        fiberGeometry.vertices.push(new (Function.prototype.bind.apply(THREE.Vector3, [null].concat(_toConsumableArray(self.rescale(self.fibers[i][j])))))());
                    }
                }
                var line = new THREE.Line(fiberGeometry, new THREE.LineBasicMaterial({
                    color: 0x00ffff * self.fibers[i].length / 200
                }));
                self.children.push(line);
                scene.add(line);
            }
        }
    }]);

    return LineSegmentsLayer;
}(_ThreejsLayer3.default);

exports.default = LineSegmentsLayer;