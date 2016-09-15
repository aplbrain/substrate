// https://github.com/j6k4m8/statestore.js

class StateMachine {
    constructor(prior) {
        this.store = {};
        if (prior) {
            this.loadState(prior);
        }
    }

    setState(key, val) {
        this.store[key] = val;
    }

    getState(key) {
        return this.store[key];
    }

    loadState(dict) {
        Object.assign(this.store, dict);
    }

    saveState() {
        return this.store;
    }
}

class URLStateMachine extends StateMachine {
    constructor(prior) {
        super(prior);
        Object.assign(this.store, this._jsonizeUrl());
    }

    _jsonizeUrl() {
        if (window.location.search.length <= 1) {
            return {};
        }
        return JSON.parse('{"' +
            decodeURI(
                window.location.search.substring(1).replace(/&/g, '","')
                .replace(/=/g,'":"')
            ) + '"}');
    }

    loadState(dict) {
        for (let k in dict) {
            if (dict[k]) {
                this.setState(k, dict[k]);
            }
        }
    }

    setState(key, val) {
        this.store = this._jsonizeUrl();
        this.store[key] = val;
        window.history.pushState(
            null,
            document.title,
            window.location.origin + window.location.pathname +
            '?' + Object.keys(this.store).reduce((last, key, i) => (
                `${last}${i!=0?'&':''}${key}=${this.store[key]}`
            ), '')
        );
    }

    getState(key) {
        return this._jsonizeUrl()[key];
    }
}


class LocalStorageStateMachine extends StateMachine {
    constructor(prior) {
        super();
        this._prefix = "__nav";
        this.store = window.localStorage;
        if (prior) {
            this.loadState(prior);
        }
    }

    setState(key, val) {
        this.store[this._prefix + key] = val;
    }

    getState(key) {
        return this.store[this._prefix + key];
    }

    loadState(dict) {
        for (let k in dict) {
            this.setState(k, dict[k]);
        }
    }

    saveState() {
        let raw = super.saveState();
        let res = {};
        for (let r in raw) {
            if (r.indexOf(this._prefix) === 0) {
                res[r.substring(this._prefix.length)] = raw[r];
            }
        }
        return res;
    }
}


if (window.location.search.length >= 1) {
    _state = new LocalStorageStateMachine(
        (new URLStateMachine()).saveState()
    );
} else {
    _state = new LocalStorageStateMachine();
}

getState = function(key) {
    return _state.getState(key);
};

setState = function(key, val) {
    return _state.setState(key, val);
};

updateState = setState;

saveURL = function() {
    (new URLStateMachine(_state.saveState())).saveState();
};
