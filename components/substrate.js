'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _three = require('three');

var THREE = _interopRequireWildcard(_three);

var _Visualizer = require('./Visualizer');

var _Visualizer2 = _interopRequireDefault(_Visualizer);

var _Layer = require('./Layer');

var _Layer2 = _interopRequireDefault(_Layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    Visualizer: _Visualizer2.default,
    Layer: _Layer2.default
};


window.THREE = THREE;
window.Visualizer = _Visualizer2.default;
window.Layer = _Layer2.default;