'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
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

var PreloadStore = function (_Component) {
    _inherits(PreloadStore, _Component);

    /*
    The PreloadStore element contains functionality to collect and store
    data from outside sources.
     It uses a memoing system to alert listeners to when it finishes loading
    external data (or local data that requires some nontrivial load-time).
     To attach a listener to the PreloadStore component, use the component's
    `readyListeners` property, which can take either a function callback, or
    an array of function callbacks:
     ```
    <PreloadStore
        readyListeners={ () => { console.log("It's ready!") } }
    />
    ```
     To add an entity to the mountedEntity list to be added to the store, use
    the `mountableEntities` prop, like this:
     ```
    <PreloadStore
        mountableEntities={[
            'keyname': 'myData',
            'filename': 'my/data/location/data.json'
        ]}
    />
    ```
     That is, `PreloadStore.store` will have a dictionary item called `myData`
    that holds the JSON data stored in the `my/data/location/data.json` file.
     Any number of entities can be requested: The `mountableEntities` prop
    accepts an array.
    */

    function PreloadStore(props) {
        _classCallCheck(this, PreloadStore);

        var _this = _possibleConstructorReturn(this, (PreloadStore.__proto__ || Object.getPrototypeOf(PreloadStore)).call(this, props));

        _this.componentWillMount = _this.componentWillMount.bind(_this);
        _this.getStore = _this.getStore.bind(_this);
        _this.onReady = _this.onReady.bind(_this);
        _this.registerReadyListener = _this.registerReadyListener.bind(_this);

        // Don't use state.
        _this.state = {};

        // ReadyListeners is an array of functions that are called IN ORDER
        // when the component determines that it has loaded all of the entities
        // that have been requested of it.
        // First, append all listeners passed from props:
        _this.readyListeners = [];
        if (_typeof(props.readyListeners) == 'object') {
            var _this$readyListeners;

            (_this$readyListeners = _this.readyListeners).push.apply(_this$readyListeners, _toConsumableArray(_this.props.readyListeners));
        } else {
            _this.readyListeners.push(_this.props.readyListeners);
        }

        // Mounted entities are placed in a dictionary. The count is used
        // internally as a memo, so that readyListeners are not called until
        // all requested data are loaded into the store.
        _this.mountedEntityCount = 0;
        _this.mountableEntities = _this.props.mountableEntities;
        // Mount each entity.
        // Note that if ANY of the mounts fail, the store will never call
        // the onReady function.
        _this.mountEntity = function (filename, keyname) {
            var _this2 = this;

            var parse = arguments.length <= 2 || arguments[2] === undefined ? "json" : arguments[2];

            fetch(filename).then(function (res) {
                if (res.ok) {
                    var mountFunction = function mountFunction(content) {
                        _this2.store[keyname] = content;
                        _this2.mountedEntityCount++;
                        if (_this2.mountedEntityCount === _this2.mountableEntities.length) {
                            // Trigger the on-ready listeners
                            _this2.onReady();
                        }
                    };

                    if (parse != "json") {
                        res.text().then(mountFunction);
                    } else {
                        res.json().then(mountFunction);
                    }
                } else {
                    console.error(res);
                }
            });
        };

        // Use a store instead of state when we don't care about a re-render
        // when a member changes:
        _this.store = {};
        return _this;
    }

    _createClass(PreloadStore, [{
        key: 'registerReadyListener',
        value: function registerReadyListener(fn) {
            /*
            Allows registering a readyListener after the component has been mounted
             Arguments:
                fn (function): A callback to run when all entities are mounted
            */
            this.readyListeners.push(fn);
        }
    }, {
        key: 'onReady',
        value: function onReady() {
            /*
            This function is run when all entities have been mounted and the store
            is ready to share data with other components.
            */
            for (var i = 0; i < this.readyListeners.length; i++) {
                this.readyListeners[i]();
            }
        }
    }, {
        key: 'getStore',
        value: function getStore(key) {
            /*
            A convenience function to access the store.
             Arguments:
                key (String): The key to look up in the store
             Returns:
                dict
            */
            return this.store[key];
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            /*
            Begin mounting entities as soon as the component enters the DOM.
            */
            for (var i = 0; i < this.mountableEntities.length; i++) {
                this.mountEntity(this.mountableEntities[i].filename, this.mountableEntities[i].keyname, this.mountableEntities[i].parse || "json");
            }
        }
    }, {
        key: 'render',
        value: function render() {
            // Includes a simple div to indicate that the preloadStore has been
            // injected into the DOM.
            return _react2.default.createElement(
                'div',
                { className: 'PreloadStorePlaceholder' },
                _react2.default.createElement(
                    'div',
                    { style: { display: 'none' } },
                    'Preload Store'
                )
            );
        }
    }]);

    return PreloadStore;
}(_react.Component);

exports.default = PreloadStore;