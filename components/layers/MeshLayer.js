'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _Layer2 = require('../Layer');

var _Layer3 = _interopRequireDefault(_Layer2);

var _OBJLoader = require('../loaders/OBJLoader');

var _OBJLoader2 = _interopRequireDefault(_OBJLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

THREE.OBJLoader = _OBJLoader2.default;

var MeshLayer = function (_Layer) {
    _inherits(MeshLayer, _Layer);

    /*
    A layer that renders a mesh to the scene.
    */
    function MeshLayer(props) {
        _classCallCheck(this, MeshLayer);

        var _this = _possibleConstructorReturn(this, (MeshLayer.__proto__ || Object.getPrototypeOf(MeshLayer)).call(this, props));

        _this.data = props.data;
        _this.path = props.path;
        _this.opacity = props.opacity;
        _this.origin = props.origin || new THREE.Vector3(0, 0, 0);
        _this.scale = props.scale || new THREE.Vector3(1, 1, 1);

        if (!props.material) {
            if (props.opacity) {
                _this._material = new THREE.MeshNormalMaterial({
                    opacity: props.opacity,
                    side: THREE.DoubleSide,
                    transparent: true
                });
            } else {
                _this._material = new THREE.MeshNormalMaterial({
                    side: THREE.DoubleSide
                });
            }
        } else {
            _this._material = props.material;
        }
        return _this;
    }

    _createClass(MeshLayer, [{
        key: 'requestInit',
        value: function requestInit(scene) {
            var _this2 = this;

            var self = this;

            var meshData = void 0,
                _mesh = void 0;
            if (self.data) {
                console.log('Parsing data as OBJ syntax...');
                meshData = new THREE.OBJLoader.OBJLoader().parse(self.data);
                _mesh = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(meshData.children[0].geometry), self._material);
                self.children = [_mesh];
                _mesh.position.set(this.origin.x, this.origin.y, this.origin.z);
                _mesh.scale.set(self.scale.x, self.scale.y, self.scale.z);

                scene.add(_mesh);
            } else if (self.path) {
                console.log('Parsing ' + self.path + ' as path...');
                meshData = new THREE.OBJLoader.OBJLoader().load(self.path, function (_mesh) {
                    console.log(_mesh);
                    _mesh = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(_mesh.children[0].geometry), self._material);
                    self.children = [_mesh];
                    _mesh.position.set(_this2.origin.x, _this2.origin.y, _this2.origin.z);
                    _mesh.scale.set(self.scale.x, self.scale.y, self.scale.z);

                    scene.add(_mesh);
                });
            } else {
                throw Error("Must provide one of data or path to MeshLayer.");
            }
        }
    }]);

    return MeshLayer;
}(_Layer3.default);

exports.default = MeshLayer;