---
id: vtx_getters
title: ΞVTX Getters
sidebar_label: Getters
---

All these getters are accessible from from `ethvtx/lib/getters`;

To efficiently recover informations about the `ethvtx` sections from the `state` (ex: in `mapStateToProps`), you can use the `ethvtx` getter helper functions. All of them take the state of the store as first argument.

## `getVtxStatus(state: State) => VtxStatus`

Simply returns the current status of `ethvtx`.

```jsx

const mapStateToProps = (state) => ({
    vtx_status: getVtxStatus(state)
});

```

## `getWeb3(state: State) => Web3`

And this one simply returns the loaded web3 instance.

```jsx

const mapStateToProps = (state) => ({
    web3: getWeb3(state)
});

```

## `getVtxEvents(state: State, type: VtxeventsType, error_type?: VtxeventsErrorTypes) => Vtxevent[]`

Get events with a specific type. If type is `Error`, you can specify the sub type. You should have a look at the interface and types for the `vtxevents` section to have a complete list of the error types.

```jsx

const mapStateToProps = (state) => ({
    transactions_broadcasted: getVtxEvents(state, VtxeventsType.TxBroadcasted)
});

```
