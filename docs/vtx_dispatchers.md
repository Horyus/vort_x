---
id: vtx_dispatchers
title: ΞVTX Dispatchers
sidebar_label: Dispatchers
---

All these dispatchers are accessible from from `ethvtx/lib/dispatchers`;

To efficiently dispatch actions in the store, you can use the `ethvtx` dispatchers.
All dispatchers take a dispatch function as first argument.

## `setWeb3(dispatch: Dispatch, web3: Web3) => void`

Sets the web3 instance into the store. Used when configuring the store, explained [**here**](/ethvtx/docs/starting_ethvtx#setting-web3)

## `authorizeAndSetWeb3(dispatch: Dispatch, authorization: Authorization) => Promise<void>`

Should be used just like `setWeb3` but only in the case where your wallet provider requires a manually authorization. This method returns a Promise that resolves when authorization is granted and web is set (or when no authorization is granted). Explained [**here**](/ethvtx/docs/starting_ethvtx#setting-web3)

## `start(dispatch: Dispatch) => void`

Starts `ethvtx`. A usage example can be found [**here**](/ethvtx/docs/starting_ethvtx#setting-web3)

## `reset(dispatch: Dispatch) => void`

Basically, it's like calling start. It erases everything from the store (except the permanent contract specs and instances). Used internaly whenver the coinbase changes. You can use it if you ever need to reset the store.

```jsx

const mapDispatchToProps = (dispatch) => ({
    reset_everything_from_the_store_if_called: () => reset(dispatch)
});

```

## `setAllowedNet(dispatch: Dispatch, net_id: number, genesis_hash: string) => void`

Sets the expected genesis hash for a given network id. Helps detecting invalid networks. A usage example can be found [**here**](/ethvtx/docs/starting_ethvtx#setting-web3)

