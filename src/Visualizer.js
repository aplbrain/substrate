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

// @flow

import * as _THREE from 'three/build/three.min';
// import TrackballControls from 'three-trackballcontrols';

window.THREE = window.THREE || _THREE;

// window.THREE.TrackballControls = TrackballControls;


export default class Visualizer {

    props : Object;
    renderLayers : Object;
    setControls : Function;
    controls : Object;
    cameraDistance : number;
    backgroundColor : Object;
    startingCameraPosition : [number, number, number];

    onReady: Function;
    onKeyDown : Function;
    onClick : Function;

    camera : Object;
    mouse : Object;
    raycaster : Object;
    scene : Object;
    renderer : Object;

    constructor(props : Object) {
        let self = this;

        this.props = props;

        this.renderLayers = this.props.renderLayers || {};
        this.setControls = this.props.setControls || ((viz, cam, dom) => {
            self.controls = new window.THREE.TrackballControls(cam, dom);
            self.controls.rotateSpeed = 1.0;
            self.controls.zoomSpeed = 0.5;
            self.controls.panSpeed = 0.05;
            self.controls.maxDistance = 4000;
        });
        this.cameraDistance = this.props.cameraDistance || 1000;
        this.backgroundColor = this.props.backgroundColor || new window.THREE.Color(0x000000);

        this.startingCameraPosition = props.startingCameraPosition || [0, 0, -100];

        this.onReady = this.props.onReady || (self => {});
        this.onReady(self);

        this.onKeyDown = this.props.onKeyDown || (() => {});
        this.onClick = this.props.onClick || (() => {});
    }

    requestUpdate() {
        /*
        Explicitly sets `needsUpdate` in each Layer. Layers can optionally
        check for this flag in their requestRender.
        */
        let self = this;
        for (let i in self.renderLayers) {
            self.renderLayers[i].needsUpdate = true;
        }
    }

    setCameraLocRot(
        loc : [number, number, number],
        rot : [number, number, number]
    ) {
        /*
        Sets the camera's location and rotation. This is useful if you have
        "look-at" logic or other camera-moving functions in your code.
        */
        let self = this;
        self.camera.position.set(...loc);
        self.camera.up.set(...rot);
        self.camera.updateProjectionMatrix();
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
        var container = document.getElementById(this.props.targetElement);
        if (!container) {
            throw Error(`Could not find ${this.props.targetElement} in DOM.`);
        }
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
        window.addEventListener('keydown', ev => {
            self.onKeyDown(self, ev);
        });

        window.addEventListener('mousedown', ev => {
            // Set the position of the mouse vector2 in space
            self.mouse.x = (ev.clientX / window.innerWidth) * 2 - 1;
            self.mouse.y = - (ev.clientY / window.innerHeight) * 2 + 1;

            // Get the items that fall along the raytraced line between the
            // camera and the mouse at +inf
            self.raycaster.setFromCamera(self.mouse, self.camera);

            // Perform the on-click as specified in props.
            // TODO: Allow layerwise behavior (i.e. ignore certain layers)
            self.onClick(self, ev, self.raycaster.intersectObjects(self.scene.children));
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

    getObjectsAtScreenCoordinate(x : number, y : number) {
        /*
        This is eventually moving out of the Visualizer and into individual
        Layers. Currently returns ALL objects in the scene that intersect the
        ray from (x, y) on the screen to +infinity.
        */
        let self = this;
        self.raycaster.setFromCamera(new window.THREE.Vector2(x, y), self.camera);
        return self.raycaster.intersectObjects(self.scene.children);
    }

    animate() {
        /*
        Called on every frame (or as quickly as possible). You should never
        need to call this explicitly.
        */
        let self = this;
        // https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
        // self.animate is a reference to this function:
        // requestAnimationFrame(self.animate) means "call `animate()` on next frame"
        requestAnimationFrame(self.animate);

        self.controls.update();

        for (let i in self.renderLayers) {
            self.renderLayers[i].requestRender(self.scene, self);
        }
        self.renderer.render(self.scene, self.camera);
    }

    triggerRender() {
        /*
        Kick off the animate-loop of this Visualizer. Call this once, and then
        never again.
        */
        let self = this;

        self.init();
        self.animate();
    }
}
