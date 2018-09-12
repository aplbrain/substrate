<p align="center">
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
 <img align="center" alt="substrate" src="https://user-images.githubusercontent.com/693511/28587772-50c8d264-7146-11e7-8bbc-2da5d95d5215.png" width="50%" />
 <h1 align="center" fontsize="3em">substrate</h1>
</p>

<p align="center">
<a href="https://badge.fury.io/js/apl-substrate"><img alt="npm version" src="https://badge.fury.io/js/apl-substrate.svg" /></a> •
<a href="https://circleci.com/gh/jhuapl-boss/substrate/tree/master"><img alt="CircleCI" src="https://circleci.com/gh/iscoe/substrate.svg?style=svg" /></a> •
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
    renderTarget: "existing-dom-id",
    layers: {
        axis: new AxisLayer()
    }
});

V.triggerRender();
```


For more documentation, see the [docs/](docs/) directory.

# Contributing

Before contributing, please see the [contributors' guide](CONTRIBUTING.md).

## License
If not otherwise marked, all code in this repository falls under the license granted in LICENSE.md.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/7283561?v=4" width="100px;"/><br /><sub><b>Joe Downs</b></sub>](https://github.com/jtpdowns)<br />[💻](https://github.com/iscoe/substrate/commits?author=jtpdowns "Code") | [<img src="https://avatars3.githubusercontent.com/u/14301614?v=4" width="100px;"/><br /><sub><b>hpcowley</b></sub>](https://github.com/hpcowley)<br />[💻](https://github.com/iscoe/substrate/commits?author=hpcowley "Code") | [<img src="https://avatars2.githubusercontent.com/u/693511?v=4" width="100px;"/><br /><sub><b>Jordan Matelsky</b></sub>](http://jordan.matelsky.com)<br />[💻](https://github.com/iscoe/substrate/commits?author=j6k4m8 "Code") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!