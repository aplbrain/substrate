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

## Testing
- Install eslint and its react plugin:
```
npm i --global eslint eslint-plugin-react@latest --save-dev
```
- Run the tests:
```
./run-lint
```

## Usage
- Run the server:
```
./run-server
```
- Now open your browser and navigate to `http://localhost:8003/`.

 Navigate by clicking and dragging. Use <kbd>1</kbd>, <kbd>3</kbd>, and <kbd>7</kbd> to snap to cardinal axis views. Press <kbd>D</kbd> while dragging to pan instead of tilt. Scroll to zoom. (These keyboard controls are defined by the end-develoer )

### Using `substrate`

This system exposes inheritable `Layer`s that can be extended to provide a visualization engine for independent 3D or 2D objects in order to combine them efficiently in the same scene.

More documentation forthcoming... In the meantime, see the inline documentation, or get in touch with @j6k4m8.

## License
If not otherwise marked, all code in this repository falls under the license granted in LICENSE.md.
