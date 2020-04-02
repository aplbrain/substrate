import * as THREE from 'three';

import Visualizer from './Visualizer';
import Layer from './Layer';

// Controls:
import TrackballControls from "./controls/TrackballControls";

// Loaders:
import OBJLoader from "./loaders/OBJLoader";

// Layers:
import AxisLayer from "./layers/AxisLayer";
import LightingLayer from "./layers/LightingLayer";
import LineSegmentsLayer from "./layers/LineSegmentsLayer";
import MeshLayer from "./layers/MeshLayer";
import VolumeLayer from "./layers/VolumeLayer";


let substrate = {
    Visualizer: Visualizer,
    Layer: Layer,
    layers: {
        AxisLayer,
        LightingLayer,
        LineSegmentsLayer,
        MeshLayer,
        VolumeLayer,
    },
    controls: {
        TrackballControls,
    },
    loaders: {
        OBJLoader,
    }
};

window.substrate = substrate;

export default { substrate };

