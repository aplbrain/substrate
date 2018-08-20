import * as THREE from 'three';

import Visualizer from './Visualizer';
import Layer from './Layer';


export default {
    Visualizer,
    Layer
};

window.THREE = THREE;
window.Visualizer = Visualizer;
window.Layer = Layer;
