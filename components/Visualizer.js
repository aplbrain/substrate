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
        };
        this.cameraDistance = this.props.cameraDistance || 1000;
        this.backgroundColor = this.props.backgroundColor || new window.THREE.Color(0x000000);

        this.startingCameraPosition = props.startingCameraPosition || [0, 0, -100];

        this.onReady = this.props.onReady || function (self) {};
        this.onReady(self);

        this.onKeyDown = this.props.onKeyDown || function () {};
        this.onClick = this.props.onClick || function () {};

        this.vizWidth = props.width || window.innerWidth;
        console.log(this.vizWidth);
        this.vizHeight = props.height || window.innerHeight;

        // obligatory binding to class
        this.animate = this.animate.bind(this);
        this.getObjectsAtScreenCoordinate = this.getObjectsAtScreenCoordinate.bind(this);
        this.init = this.init.bind(this);
        this.requestUpdate = this.requestUpdate.bind(this);
        this.setCameraLocRot = this.setCameraLocRot.bind(this);
        this.triggerRender = this.triggerRender.bind(this);
        this.resize = this.resize.bind(this);
    }

    _createClass(Visualizer, [{
        key: 'resize',
        value: function resize(newWidth, newHeight) {
            /*
            Resize the Visualizer to new pixel sizes.
            */
            if (!newWidth) {
                newWidth = this.container.offsetWidth;
            }
            if (!newHeight) {
                newHeight = this.container.offsetHeight;
            }
            this.vizWidth = newWidth;
            this.vizHeight = newHeight;
            this.requestUpdate();
        }
    }, {
        key: 'removeLayer',
        value: function removeLayer(key) {
            this.renderLayers[key].clearChildren(self.scene);
            delete this.renderLayers[key];
        }
    }, {
        key: 'addLayer',
        value: function addLayer(key, layer) {
            this.renderLayers[key] = layer;
            this.renderLayers[key].requestInit(self.scene);
        }
    }, {
        key: 'requestUpdate',
        value: function requestUpdate() {
            /*
            Explicitly sets `needsUpdate` in each Layer. Layers can optionally
            check for this flag in their requestRender.
            */
            this.camera.aspect = this.vizWidth / this.vizHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.vizWidth, this.vizHeight);

            var self = this;
            for (var i in self.renderLayers) {
                self.renderLayers[i].needsUpdate = true;
            }
        }
    }, {
        key: 'setCameraLocRot',
        value: function setCameraLocRot(loc, rot) {
            var _self$camera$position, _self$camera$up;

            /*
            Sets the camera's location and rotation. This is useful if you have
            "look-at" logic or other camera-moving functions in your code.
            */
            var self = this;
            (_self$camera$position = self.camera.position).set.apply(_self$camera$position, _toConsumableArray(loc));
            (_self$camera$up = self.camera.up).set.apply(_self$camera$up, _toConsumableArray(rot));
            self.camera.updateProjectionMatrix();
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
            self.renderer.setSize(this.vizWidth, this.vizHeight);
            self.scene.background = self.backgroundColor;

            // Insert into document:
            var container = document.getElementById(this.props.targetElement);
            if (!container) {
                throw Error('Could not find ' + this.props.targetElement + ' in DOM.');
            }
            container.appendChild(self.renderer.domElement);
            self.container = container;

            // Provide camera, controls, and renderer:
            self.camera = new window.THREE.PerspectiveCamera(10, self.vizWidth / self.vizHeight, 1, 100000);

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
                self.mouse.x = ev.clientX / self.vizWidth * 2 - 1;
                self.mouse.y = -(ev.clientY / self.vizHeight) * 2 + 1;

                // Get the items that fall along the raytraced line between the
                // camera and the mouse at +inf
                self.raycaster.setFromCamera(self.mouse, self.camera);

                // Perform the on-click as specified in props.
                // TODO: Allow layerwise behavior (i.e. ignore certain layers)
                self.onClick(self, ev, self.raycaster.intersectObjects(self.scene.children));
            });

            window.addEventListener('resize', function () {
                self.camera.aspect = self.vizWidth / self.vizHeight;
                self.camera.updateProjectionMatrix();
                self.renderer.setSize(self.vizWidth, self.vizHeight);
            }, false);

            for (var i in self.renderLayers) {
                self.renderLayers[i].requestInit(self.scene);
            }
        }
    }, {
        key: 'getObjectsAtScreenCoordinate',
        value: function getObjectsAtScreenCoordinate(x, y) {
            /*
            This is eventually moving out of the Visualizer and into individual
            Layers. Currently returns ALL objects in the scene that intersect the
            ray from (x, y) on the screen to +infinity.
            */
            var self = this;
            self.raycaster.setFromCamera(new window.THREE.Vector2(x, y), self.camera);
            return self.raycaster.intersectObjects(self.scene.children);
        }
    }, {
        key: 'animate',
        value: function animate() {
            /*
            Called on every frame (or as quickly as possible). You should never
            need to call this explicitly.
            */
            var self = this;
            // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
            // self.animate is a reference to this function:
            // requestAnimationFrame(self.animate) means "call `animate()` on next frame"
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
            /*
            Kick off the animate-loop of this Visualizer. Call this once, and then
            never again.
            */
            var self = this;

            self.init();
            self.animate();
        }
    }]);

    return Visualizer;
}();

exports.default = Visualizer;