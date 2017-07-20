'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*
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

var _three = require('three/build/three.min');

var _THREE = _interopRequireWildcard(_three);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import TrackballControls from 'three-trackballcontrols';

window.THREE = window.THREE || _THREE;

// window.THREE.TrackballControls = TrackballControls;


var Visualizer = function () {
    function Visualizer(props) {
        _classCallCheck(this, Visualizer);

        var self = this;

        this.props = props;

        this.renderLayers = this.props.renderLayers || {};
        this.setControls = this.props.setControls || function (viz, cam, dom) {
            self.controls = new window.THREE.TrackballControls(cam, dom);
            self.controls.rotateSpeed = 1.0;
            self.controls.zoomSpeed = 0.5;
            self.controls.panSpeed = 0.05;

            self.controls.maxDistance = 4000;
            self.controls.addEventListener('end', function (ev) {
                self.updateCameraState();
            });
        };
        this.cameraDistance = this.props.cameraDistance || 1000;
        this.backgroundColor = this.props.backgroundColor || new window.THREE.Color(0x000000);

        this.startingCameraPosition = props.startingCameraPosition || [0, 0, -100];

        this.onReady = this.props.onReady || function (self) {};
        this.onReady(self);

        this.onKeyDown = this.props.onKeyDown || function () {};
        this.onClick = this.props.onClick || function () {};
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
            self.mouse = new window.THREE.Vector2();
            self.raycaster = new window.THREE.Raycaster();

            // Set up scene primitives:
            self.scene = new window.THREE.Scene();
            window.scene = self.scene;
            self.renderer = new window.THREE.WebGLRenderer();
            self.renderer.setPixelRatio(window.devicePixelRatio);
            self.renderer.setSize(window.innerWidth, window.innerHeight);
            self.scene.background = self.backgroundColor;

            // Insert into document:
            // $FlowBug: Flow doesn't like this but WE DO
            var container = document.getElementById(this.props.targetElement);
            if (!container) {
                throw Error('Could not find ' + this.props.targetElement + ' in DOM.');
            }
            container.appendChild(self.renderer.domElement);

            // Provide camera, controls, and renderer:
            self.camera = new window.THREE.PerspectiveCamera(10, window.innerWidth / window.innerHeight, 1, 100000);

            // Set the default camera location.
            // TODO: Allow this to be overridden by a prop
            self.setCameraLocRot(self.startingCameraPosition, [1, 0, 0]);

            self.setControls(self, self.camera, self.renderer.domElement);

            // Add event listeners:
            window.addEventListener('keydown', function (ev) {
                self.onKeyDown(self, ev);
            });

            window.addEventListener('mousedown', function (ev) {
                // Set the position of the mouse vector2 in space
                self.mouse.x = ev.clientX / window.innerWidth * 2 - 1;
                self.mouse.y = -(ev.clientY / window.innerHeight) * 2 + 1;

                // Get the items that fall along the raytraced line between the
                // camera and the mouse at +inf
                self.raycaster.setFromCamera(self.mouse, self.camera);

                // Perform the on-click as specified in props.
                // TODO: Allow layerwise behavior (i.e. ignore certain layers)
                self.onClick(self, ev, self.raycaster.intersectObjects(self.scene.children));
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
            self.raycaster.setFromCamera(new window.THREE.Vector2(x, y), self.camera);
            return self.raycaster.intersectObjects(self.scene.children);
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
    }]);

    return Visualizer;
}();

exports.default = Visualizer;