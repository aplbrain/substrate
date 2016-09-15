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
import ReactDOM from 'react-dom';

import Visualizer from './components/Visualizer.jsx';

import ThreejsAxisLayer from './components/layers/ThreejsAxisLayer.jsx';
import ThreejsLightingLayer from './components/layers/ThreejsLightingLayer.jsx';


class MainLayout extends Component {
    /*
    The MainLayout component does not have any state: To use state here would
    mean a full refresh of all child components, which is far too expensive.
    Instead, use the <PreloadStore /> component to hold persistent data.
    */

    constructor(props) {
        super(props);
        console.log(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        this.refs.mainVisualizer.triggerRender();
    }

    render() {
        return (
            <div>
                <Visualizer
                    ref="mainVisualizer"
                    renderLayers={[
                        new ThreejsAxisLayer(),
                        new ThreejsLightingLayer()
                    ]}
                    cameraDistance={150}
                    onKeyDown={
                        (viz, ev) => {
                            let KEYS = {
                                DIGIT1: 49,
                                DIGIT3: 51,
                                DIGIT5: 53,
                                DIGIT7: 55,

                                W: 87,
                                S: 83,
                                N: 78,

                                PLUS: 107,
                                MINUS: 109,
                            };

                            console.log(ev.keyCode);

                            if (ev.keyCode === KEYS.DIGIT3) {
                                viz.setCameraLocRot(
                                    [0, viz.cameraDistance, 0],
                                    [1, 0, 0]
                                );
                            } else if (ev.keyCode === KEYS.DIGIT7) {
                                viz.setCameraLocRot(
                                    [viz.cameraDistance, 0, 0],
                                    [0, 0, 1]
                                );
                            } else if (ev.keyCode === KEYS.DIGIT1) {
                                viz.setCameraLocRot(
                                    [0, 0, -viz.cameraDistance],
                                    [1, 0, 0]
                                );
                            }

                            if (ev.keyCode === KEYS.PLUS) {
                                viz.camera.position.x *= 0.9;
                                viz.camera.position.y *= 0.9;
                                viz.camera.position.z *= 0.9;
                            } else if (ev.keyCode === KEYS.MINUS) {
                                viz.camera.position.x /= 0.9;
                                viz.camera.position.y /= 0.9;
                                viz.camera.position.z /= 0.9;
                            }

                            viz.updateCameraState();
                        }
                    }
                    />
            </div>
        );
    }
}


ReactDOM.render(
    <MainLayout />,
    document.getElementById('react-target')
);
