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

var _TrackballControls = require('./controls/TrackballControls');

var _TrackballControls2 = _interopRequireDefault(_TrackballControls);

var _OBJLoader = require('./loaders/OBJLoader');

var _OBJLoader2 = _interopRequireDefault(_OBJLoader);

var _AxisLayer = require('./layers/AxisLayer');

var _AxisLayer2 = _interopRequireDefault(_AxisLayer);

var _LightingLayer = require('./layers/LightingLayer');

var _LightingLayer2 = _interopRequireDefault(_LightingLayer);

var _LineSegmentsLayer = require('./layers/LineSegmentsLayer');

var _LineSegmentsLayer2 = _interopRequireDefault(_LineSegmentsLayer);

var _MeshLayer = require('./layers/MeshLayer');

var _MeshLayer2 = _interopRequireDefault(_MeshLayer);

var _VolumeLayer = require('./layers/VolumeLayer');

var _VolumeLayer2 = _interopRequireDefault(_VolumeLayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// Loaders:
var substrate = {
    Visualizer: _Visualizer2.default,
    Layer: _Layer2.default,
    layers: {
        AxisLayer: _AxisLayer2.default,
        LightingLayer: _LightingLayer2.default,
        LineSegmentsLayer: _LineSegmentsLayer2.default,
        MeshLayer: _MeshLayer2.default,
        VolumeLayer: _VolumeLayer2.default
    },
    controls: {
        TrackballControls: _TrackballControls2.default
    },
    loaders: {
        OBJLoader: _OBJLoader2.default
    }
};

// Layers:


// Controls:


window.substrate = substrate;

exports.default = { substrate: substrate };