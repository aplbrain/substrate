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

export default class Layer {
    /*
    Layers are the containers for data render in the Visualizer frame. Each
    Layer requires several properties:

    Required Properties:
        requestRender: A function that should be run every time a refresh is
            requested on this Layer. For optimized or high-compute-intensity
            Layers (such as those that request remote assets or large files),
            a Layer inheritor may choose to cache the rendered layer and, on
            requestRender, choose NOT to perform a render.
    */
}
