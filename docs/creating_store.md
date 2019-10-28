---
id: creating_store
title: Creating the store
sidebar_label: Creating the store
---

`ethvtx` is and `redux` store configuration. In order to offer as much flexibility as possible, the package will not handle the store creation. Instead, it will provide you all the key components so you can easily add yours alongside if needed.

## Reducers

`ethvtx` provides the `getReducers` method to easily retrieve the core reducers.

```jsx

import { getReducers } from 'ethvtx';

const reducers = getReducers();

```

## Initial State and Configuration

You will need the initial state in order to configure some aspects of the store. The initial state is simply the state of the store that you can set before starting it. By inserting specific values, we can configure arguments for `ethvtx`. This is how it works.

```jsx

import { getInitialState, configureVtx } from 'ethvtx';

// This is the raw initial state
const initial_state = getInitialState();

// This is the configured state
const configured_initial_state = configureVtx(initial_state, {
    poll_timer: 500,
    confimation_treshold: 5,
    allowed_nets: {
        2702: '0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553'
    }
});

```

One important thing to note is that the configuration is optional, you can use the value returned by `getInitialState` directly.

The configuration arguments are:

#### poll_timer (number)

The time in ms between two poll cycles. To fetch its data, the store will poll for informations in the background. Mainly it will fetch for the current block height and will update all informations that need to be updated only if a new block has been mined.

#### confirmation_treshold (number)

The number of blocks needed for a transaction to be considered as `confirmed`.

#### allowed_nets (object)

Each key represents a network id, and should have the hash of the genesis block. If none are present, no block hash network checks will be performed. Otherwise, the store will check if current network is valid by comparing network id and genesis block hash with the configuration.


## Sagas

Just like the reducers, you can retrieve the sagas with `getSagas`.

```jsx

import { getSagas } from 'ethvtx';

...
// Create the store
...

const sagas = getSagas(store);

```

It should be called after the store creation.

## Assembling everything

```jsx

import { applyMiddleware, compose, createStore } from 'redux';
import { getSagas, getReducers, getInitialState, configureVtx, VtxContract } from 'ethvtx';
import createSagaMiddleware from 'redux-saga';


// If you want to enable the Redux DevTools extension
const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Your initial state and configuration
const initial_state = configureVtx(getInitialState(), {
    poll_timer: 500,
    confimation_treshold: 5,
    allowed_nets: {
        2702: '0xfe88c94d860f01a17f961bf4bdfb6e0c6cd10d3fda5cc861e805ca1240c58553'
    }
});

// Your reducers
const reducers = getReducers();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    reducers,
    initial_state,
    composer(applyMiddleware(sagaMiddleware))
);

// Your sagas
const sagas = getSagas(store);

sagaMiddleware.run(sagas);

```

And you're good to go ! If you need to add your own reducers / sagas / initial state, see you in the next section !
