'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ThreejsLayer2 = require('../ThreejsLayer');

var _ThreejsLayer3 = _interopRequireDefault(_ThreejsLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var ObjLayer = function (_ThreejsLayer) {
    _inherits(ObjLayer, _ThreejsLayer);

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

    function ObjLayer(props) {
        _classCallCheck(this, ObjLayer);

        var _this = _possibleConstructorReturn(this, (ObjLayer.__proto__ || Object.getPrototypeOf(ObjLayer)).call(this, props));

        _this.getData = props.getData;
        _this._material = props.material;
        return _this;
    }

    _createClass(ObjLayer, [{
        key: 'requestInit',
        value: function requestInit(scene) {
            var self = this;
            self.needsUpdate = true;

            var mesh = new THREE.OBJLoader().parse(self.getData());
            self._meshGeometry = new THREE.Mesh(new THREE.Geometry().fromBufferGeometry(mesh.children[0].geometry), new THREE.MeshBasicMaterial(self._material));
            self.children = [self._meshGeometry];

            scene.add(self._meshGeometry);
        }
    }]);

    return ObjLayer;
}(_ThreejsLayer3.default);

exports.default = ObjLayer;