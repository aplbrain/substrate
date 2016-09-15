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

export default class PreloadStore extends Component {
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

    constructor(props) {
        super(props);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.getStore = this.getStore.bind(this);
        this.onReady = this.onReady.bind(this);
        this.registerReadyListener = this.registerReadyListener.bind(this);

        // Don't use state.
        this.state = {};

        // ReadyListeners is an array of functions that are called IN ORDER
        // when the component determines that it has loaded all of the entities
        // that have been requested of it.
        // First, append all listeners passed from props:
        this.readyListeners = [];
        if (typeof(props.readyListeners) == 'object') {
            this.readyListeners.push(...this.props.readyListeners);
        } else {
            this.readyListeners.push(this.props.readyListeners);
        }

        // Mounted entities are placed in a dictionary. The count is used
        // internally as a memo, so that readyListeners are not called until
        // all requested data are loaded into the store.
        this.mountedEntityCount = 0;
        this.mountableEntities = this.props.mountableEntities;
        // Mount each entity.
        // Note that if ANY of the mounts fail, the store will never call
        // the onReady function.
        this.mountEntity = function(filename, keyname, parse="json") {
            fetch(filename).then((res) => {
                if (res.ok) {
                    if (parse != "json") {
                        res.text().then(text => {
                            this.store[keyname] = text;
                            this.mountedEntityCount++;
                            if (this.mountedEntityCount === this.mountableEntities.length) {
                                // Trigger the on-ready listeners
                                this.onReady();
                            }
                        });
                    } else {
                        res.json().then(json => {
                            this.store[keyname] = json;
                            this.mountedEntityCount++;
                            if (this.mountedEntityCount === this.mountableEntities.length) {
                                // Trigger the on-ready listeners
                                this.onReady();
                            }
                        });
                    }
                } else {
                    console.error(res);
                }
            });
        };

        // Use a store instead of state when we don't care about a re-render
        // when a member changes:
        this.store = {};
    }

    registerReadyListener(fn) {
        /*
        Allows registering a readyListener after the component has been mounted

        Arguments:
            fn (function): A callback to run when all entities are mounted
        */
        this.readyListeners.push(fn);
    }

    onReady() {
        /*
        This function is run when all entities have been mounted and the store
        is ready to share data with other components.
        */
        for (var i = 0; i < this.readyListeners.length; i++) {
            this.readyListeners[i]();
        }
    }

    getStore(key) {
        /*
        A convenience function to access the store.

        Arguments:
            key (String): The key to look up in the store

        Returns:
            dict
        */
        return this.store[key];
    }

    componentWillMount() {
        /*
        Begin mounting entities as soon as the component enters the DOM.
        */
        for (var i = 0; i < this.mountableEntities.length; i++) {
            this.mountEntity(
                this.mountableEntities[i].filename,
                this.mountableEntities[i].keyname,
                this.mountableEntities[i].parse || "json"
            );
        }
    }

    render() {
        // Includes a simple div to indicate that the preloadStore has been
        // injected into the DOM.
        return (
            <div className="PreloadStorePlaceholder">
                <div style={{ display: 'none' }}>Preload Store</div>
            </div>
        );
    }
}
