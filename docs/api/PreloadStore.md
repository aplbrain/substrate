---
layout: page
---

# PreloadStore

The `PreloadStore` is an optional convenience-component that prefetches and preloads resources so that you don't have to fetch them in realtime from your `Layer`s.

It uses a memoing system to alert listeners to when it finishes loading
external data (or local data that requires some nontrivial load-time).

## Exposed Properties

### `readyListeners`: `function` or `[function]`
To attach a listener to the PreloadStore component, use the component's
`readyListeners` property, which can take either a function callback, or
an array of function callbacks:

```
<PreloadStore
    readyListeners={ () => { console.log("It's ready!") } }
/>
```

These will be called (in order, if specified in an array) when _all_ assets are done loading.

## `mountableEntities`: `json`

To add an entity to the `mountedEntity` list to be added to the store, use
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

**To later retrieve the data from the `PreloadStore`, use `myPreloadStore.getStore('myData')`, where `myData` is the `keyname` specified in the declaration of `mountableEntities`.**


## Example Usage

```
var dataAreReady = false;

<PreloadStore
    ref="myPreloadStore"
    readyListeners={ () => {
        console.log("Loaded everything!"); 
        dataAreReady = true;
    }}
    mountableEntities={[
        'keyname': 'countries',
        'filename': 'http://datasource.com/countries.json'
    ]}
/>
```

Then, elsewhere, you can use:

```
if (dataAreReady) {
    data = this.refs.myPreloadStore.getStore('countries');
}
```
