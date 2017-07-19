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
import React, { Component } from 'react';

import * as _THREE from 'three/build/three.min';
import TrackballControls from 'three-trackballcontrols';

window.THREE = window.THREE || _THREE;

window.THREE.TrackballControls = TrackballControls;


export default class Visualizer extends Component {

    constructor(props) {
        super(props);

        let self = this;

        this.setCameraLocRot = this.setCameraLocRot.bind(this);
        this.init = this.init.bind(this);
        this.animate = this.animate.bind(this);
        this.triggerRender = this.triggerRender.bind(this);
        this.updateCameraState = this.updateCameraState.bind(this);

        this.renderLayers = this.props.renderLayers || {};
        this.setControls = this.props.setControls || ((viz, cam, dom) => {
            self.controls = new window.THREE.TrackballControls(cam, dom);
            self.controls.rotateSpeed = 1.0;
            self.controls.zoomSpeed = 0.5;
            self.controls.panSpeed = 0.05;

            self.controls.maxDistance = 4000;
            self.controls.addEventListener('end', ev => {
                self.updateCameraState();
            });
        });
        this.cameraDistance = this.props.cameraDistance || 1000;
        this.backgroundColor = this.props.backgroundColor || new window.THREE.Color(0x000000);

        this.startingCameraPosition = props.startingCameraPosition || [0, 0, -100];

        this.onReady = this.props.onReady || (() => {});
        this.onReady(self);

        this.onKeyDown = this.props.onKeyDown || (() => {});
        this.onClick = this.props.onClick || (() => {});
    }

    requestUpdate() {
        let self = this;
        for (let i in self.renderLayers) {
            self.renderLayers[i].needsUpdate = true;
        }
    }

    setCameraLocRot(loc, rot) {
        let self = this;
        self.camera.position.set(...loc);
        self.camera.up.set(...rot);
        self.camera.updateProjectionMatrix();
    }

    updateCameraState() {
        let self = this;
    }

    init() {
        let self = this;

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
        var container = document.getElementById('visualizer-target');
        container.appendChild(self.renderer.domElement);

        // Provide camera, controls, and renderer:
        self.camera = new window.THREE.PerspectiveCamera(
            10,
            window.innerWidth / window.innerHeight,
            1, 100000
        );

        // Set the default camera location.
        // TODO: Allow this to be overridden by a prop
        self.setCameraLocRot(
            self.startingCameraPosition,
            [1, 0, 0]
        );

        self.setControls(self, self.camera, self.renderer.domElement);

        // Add event listeners:
        addEventListener('keydown', ev => {
            self.onKeyDown(self, ev);
        });

        addEventListener('mousedown', ev => {
            // Set the position of the mouse vector2 in space
            self.mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
            self.mouse.y = - (ev.clientY / window.innerHeight) * 2 + 1;

            // Get the items that fall along the raytraced line between the
            // camera and the mouse at +inf
            self.raycaster.setFromCamera(self.mouse, self.camera);

            // Perform the on-click as specified in props.
            // TODO: Allow layerwise behavior (i.e. ignore certain layers)
            self.onClick(self, ev, self.raycaster.intersectObjects(scene.children));
        });

        window.addEventListener('resize', () => {
            self.camera.aspect = window.innerWidth / window.innerHeight;
            self.camera.updateProjectionMatrix();
            self.renderer.setSize(window.innerWidth, window.innerHeight);
        }, false);

        for (let i in self.renderLayers) {
            self.renderLayers[i].requestInit(self.scene);
        }
    }

    getObjectsAtScreenCoordinate(x, y) {
        let self = this;
        self.raycaster.setFromCamera(new window.THREE.Vector2(x, y), self.camera);
        return self.raycaster.intersectObjects(scene.children);
    }

    animate() {
        let self = this;
        requestAnimationFrame(self.animate);

        self.controls.update();

        for (let i in self.renderLayers) {
            self.renderLayers[i].requestRender(self.scene, self);
        }
        self.renderer.render(self.scene, self.camera);
    }

    triggerRender() {
        let self = this;

        self.init();
        self.animate();
    }

    render() {
        return (
            <div id="visualizer-target"></div>
        );
    }
}
