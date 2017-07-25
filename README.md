<p align="center">
 <img align="center" alt="substrate" src="https://user-images.githubusercontent.com/693511/28587772-50c8d264-7146-11e7-8bbc-2da5d95d5215.png" width="50%" />
 <h1 align="center" fontsize="3em">substrate</h1>
</p>

<p align="center">
<a href="https://badge.fury.io/js/apl-substrate"><img alt="npm version" src="https://badge.fury.io/js/apl-substrate.svg" /></a> •
<a href="https://circleci.com/gh/jhuapl-boss/substrate/tree/master"><img alt="CircleCI" src="https://circleci.com/gh/jhuapl-boss/substrate/tree/master.svg?style=svg" /></a> •
<a href="https://codeclimate.com/github/jhuapl-boss/substrate"><img alt="Code Climate" src="https://codeclimate.com/github/jhuapl-boss/substrate/badges/gpa.svg" /></a>
</p>


## Installation and Configuration
- Install via npm or yarn:
```
npm install apl-substrate
```
OR:

- Clone the repository.
```
git clone https://github.com/jhuapl-boss/substrate.git
```
- Install all dependencies.
```
npm install
```


## Usage

```js
import Visualizer from 'apl-substrate/components/Visualizer';
import AxisLayer from 'apl-substrate/components/layers/AxisLayer';

V = new Visualizer({
    renderTarget: "dom-id",
    layers: {
        axis: new AxisLayer()
    }
});

V.triggerRender();
```


More documentation forthcoming... In the meantime, see the inline documentation, or get in touch with @j6k4m8.

## License
If not otherwise marked, all code in this repository falls under the license granted in LICENSE.md.
