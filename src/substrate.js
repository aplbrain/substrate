import * as THREE from 'three';

import Visualizer from './Visualizer';
import Layer from './Layer';

// Controls
import TrackballControls from "./controls/TrackballControls";

// Layers
import AxisLayer from "./layers/AxisLayer";
import LightingLayer from "./layers/LightingLayer";
import LineSegmentsLayer from "./layers/LineSegmentsLayer";
import MeshLayer from "./layers/MeshLayer";

// Loaders
import OBJLoader from "./loaders/OBJLoader";


let substrate = {
    Visualizer,
    Layer,
    controls: {
        TrackballControls,
    },
    layers: {
        AxisLayer,
        LightingLayer,
        LineSegmentsLayer,
        MeshLayer,
    },
    loaders: {
        OBJLoader,
    },
};

window.THREE = THREE;
window.substrate = substrate;
