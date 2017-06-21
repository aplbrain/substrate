'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _three = require('three/build/three.min');

var THREE = _interopRequireWildcard(_three);

var _threeTrackballcontrols = require('three-trackballcontrols');

var _threeTrackballcontrols2 = _interopRequireDefault(_threeTrackballcontrols);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


THREE.TrackballControls = _threeTrackballcontrols2.default;

var Visualizer = function (_Component) {
    _inherits(Visualizer, _Component);

    function Visualizer(props) {
        _classCallCheck(this, Visualizer);

        var _this = _possibleConstructorReturn(this, (Visualizer.__proto__ || Object.getPrototypeOf(Visualizer)).call(this, props));

        var self = _this;

        _this.setCameraLocRot = _this.setCameraLocRot.bind(_this);
        _this.init = _this.init.bind(_this);
        _this.animate = _this.animate.bind(_this);
        _this.triggerRender = _this.triggerRender.bind(_this);
        _this.updateCameraState = _this.updateCameraState.bind(_this);

        _this.renderLayers = _this.props.renderLayers || {};
        _this.setControls = _this.props.setControls || function (viz, cam, dom) {
            self.controls = new THREE.TrackballControls(cam, dom);
            self.controls.rotateSpeed = 1.0;
            self.controls.zoomSpeed = 0.5;
            self.controls.panSpeed = 0.05;

            self.controls.maxDistance = 4000;
            self.controls.addEventListener('end', function (ev) {
                self.updateCameraState();
            });
        };
        _this.cameraDistance = _this.props.cameraDistance || 1000;
        _this.backgroundColor = _this.props.backgroundColor || new THREE.Color(0x000000);

        _this.startingCameraPosition = props.startingCameraPosition || [0, 0, -100];

        _this.onReady = _this.props.onReady || function () {};
        _this.onReady(self);

        _this.onKeyDown = _this.props.onKeyDown || function () {};
        _this.onClick = _this.props.onClick || function () {};
        return _this;
    }

    _createClass(Visualizer, [{
        key: 'requestUpdate',
        value: function requestUpdate() {
            var self = this;
            for (var i in self.renderLayers) {
                self.renderLayers[i].needsUpdate = true;
            }
        }
    }, {
        key: 'setCameraLocRot',
        value: function setCameraLocRot(loc, rot) {
            var _self$camera$position, _self$camera$up;

            var self = this;
            (_self$camera$position = self.camera.position).set.apply(_self$camera$position, _toConsumableArray(loc));
            (_self$camera$up = self.camera.up).set.apply(_self$camera$up, _toConsumableArray(rot));
            self.camera.updateProjectionMatrix();
        }
    }, {
        key: 'updateCameraState',
        value: function updateCameraState() {
            var self = this;
        }
    }, {
        key: 'init',
        value: function init() {
            var self = this;

            // Needed for mouse-camera raytracing (for mouse events):
            self.mouse = new THREE.Vector2();
            self.raycaster = new THREE.Raycaster();

            // Set up scene primitives:
            self.scene = new THREE.Scene();
            window.scene = self.scene;
            self.renderer = new THREE.WebGLRenderer();
            self.renderer.setPixelRatio(window.devicePixelRatio);
            self.renderer.setSize(window.innerWidth, window.innerHeight);
            self.scene.background = self.backgroundColor;

            // Insert into document:
            var container = document.getElementById('visualizer-target');
            container.appendChild(self.renderer.domElement);

            // Provide camera, controls, and renderer:
            self.camera = new THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 100000);

            // Set the default camera location.
            // TODO: Allow this to be overridden by a prop
            self.setCameraLocRot(self.startingCameraPosition, [1, 0, 0]);

            self.setControls(self, self.camera, self.renderer.domElement);

            // Add event listeners:
            addEventListener('keydown', function (ev) {
                self.onKeyDown(self, ev);
            });

            addEventListener('mousedown', function (ev) {
                // Set the position of the mouse vector2 in space
                self.mouse.x = ev.clientX / window.innerWidth * 2 - 1;
                self.mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

                // Get the items that fall along the raytraced line between the
                // camera and the mouse at +inf
                self.raycaster.setFromCamera(self.mouse, self.camera);

                // Perform the on-click as specified in props.
                // TODO: Allow layerwise behavior (i.e. ignore certain layers)
                self.onClick(self, ev, self.raycaster.intersectObjects(scene.children));
            });

            window.addEventListener('resize', function () {
                self.camera.aspect = window.innerWidth / window.innerHeight;
                self.camera.updateProjectionMatrix();
                self.renderer.setSize(window.innerWidth, window.innerHeight);
            }, false);

            for (var i in self.renderLayers) {
                self.renderLayers[i].requestInit(self.scene);
            }
        }
    }, {
        key: 'getObjectsAtScreenCoordinate',
        value: function getObjectsAtScreenCoordinate(x, y) {
            var self = this;
            self.raycaster.setFromCamera(new THREE.Vector2(x, y), self.camera);
            return self.raycaster.intersectObjects(scene.children);
        }
    }, {
        key: 'animate',
        value: function animate() {
            var self = this;
            requestAnimationFrame(self.animate);

            self.controls.update();

            for (var i in self.renderLayers) {
                self.renderLayers[i].requestRender(self.scene, self);
            }
            self.renderer.render(self.scene, self.camera);
        }
    }, {
        key: 'triggerRender',
        value: function triggerRender() {
            var self = this;

            self.init();
            self.animate();
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { id: 'visualizer-target' });
        }
    }]);

    return Visualizer;
}(_react.Component);

exports.default = Visualizer;