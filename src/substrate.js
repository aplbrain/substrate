import Visualizer from './Visualizer';
import Layer from './Layer';


export default {
	Visualizer,
	Layer
}

if (!window.THREE) {
	throw "You must import THREE >= 0."
}

window.Visualizer = Visualizer
window.Layer = Layer