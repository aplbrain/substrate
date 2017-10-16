'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _Visualizer = require('./Visualizer');

var _Visualizer2 = _interopRequireDefault(_Visualizer);

var _Layer = require('./Layer');

var _Layer2 = _interopRequireDefault(_Layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	Visualizer: _Visualizer2.default,
	Layer: _Layer2.default
};


if (!window.THREE) {
	throw "You must import THREE >= 0.";
}

window.Visualizer = _Visualizer2.default;
window.Layer = _Layer2.default;