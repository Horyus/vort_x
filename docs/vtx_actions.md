---
id: vtx_actions
title: Vortex Actions
sidebar_label: Actions
---

All these types and functions are accessible from `ethvtx/lib/actions`.

## Identifiers

```jsx
export const VtxconfigActions = {
    VtxconfigSetWeb3: '[VTX][VTXCONFIG] SET_WEB3',
    VtxconfigSetStatus: '[VTX][VTXCONFIG] SET_STATUS',
    VtxconfigReset: '[VTX][VTXCONFIG] RESET',
    VtxconfigResetSectionComplete: '[VTX][VTXCONFIG] RESET_SECTION_COMPLETE',
    VtxconfigResetComplete: '[VTX][VTXCONFIG] RESET_COMPLETE',
    VtxconfigSetInfos: '[VTX][VTXCONFIG] SET_INFOS',
    VtxconfigSetAllowedNet: `[VTX][VTXCONFIG] SET_ALLOWED_NET`
};
```

```jsx
export const VtxeventsActions = {
    VtxeventsAdd: '[VTX][VTXEVENTS] ADD'
};
```

```jsx
export const VtxcacheActions = {
    VtxcacheCreate: '[VTX][VTXCACHE] CREATE',
    VtxcacheSetData: '[VTX][VTXCACHE] SET_DATA',
    VtxcacheSetError: '[VTX][VTXCACHE] SET_ERROR',
    VtxcacheSetRequired: '[VTX][VTXCACHE] SET_REQUIRED',
    VtxcacheReset: '[VTX][VTXCACHE] RESET'
};
```

```jsx
export const VtxpollActions = {
    VtxpollSetIntervalId: '[VTX][VTXPOLL] SET_INTERVAL_ID',
    VtxpollKill: '[VTX][VTXPOLL] KILL',
    VtxpollAdd: '[VTX][VTXPOLL] ADD'
};
```

## Exposed Actions

Actions that you can use as you want in your app, sagas etc ...

## `VtxconfigSetWeb3(web3: Web3) => IVtxconfigSetWeb3`

Sets the web3 instance in the redux store.

## `VtxconfigReset(enable?: () => Promise<void>) => IVtxconfigReset`

Resets the store. Erases everything that is not marked `permanent`

## `VtxconfigSetAllowedNet(net_id: number, genesis_hash: string) => IVtxconfigSetAllowedNet`

Sets the expected genesis hash for a specific network id. Used to detect invalid networks

## `VtxpollAdd(name: string, interval: number, cb: VtxPollCb) => IVtxpollAdd`

Adds the given `cb` to the polling engine. The function will be called once between `interval` * `poll_interval` time.

## Internal Actions

These actions are used internally by the store to make things work. You should not use them.

## `VtxconfigSetStatus(status: VtxStatus) => IVtxconfigSetStatus`

Set the current store status.

## `VtxconfigResetSectionComplete(section: 'txs' | 'blocks' | 'vtxcache' | 'contracts' | ## 'vtxconfig' | 'accounts') => IVtxconfigResetSectionComplete`

Dispatched when a section of the store finished resetting. When all of them did, triggers the `VtxconfigResetComplete` action.

## `VtxconfigResetComplete() => IVtxconfigResetComplete`

Dispatched when all the sections have succesfully resetted.

## `VtxconfigSetInfos(coinbase: string, net: number) => IVtxconfigSetInfos`

Dispatched to set the coinbase et network id.

## `VtxeventsAdd(event: VtxeventsSection) => IVtxeventsAdd`

Adds a `VtxEvent` into the store. Can be useful to track what is happening in the store and get informations about main events.

## `VtxcacheCreate = <T = any>(signature: string, cb: VtxcacheCb<T>) => IVtxcacheCreate`

Creates a cache section, that will get updated only if needed.

## `VtxcacheSetData = <T = any>(signature: string, data: T, block: number) => IVtxcacheSetData`

Sets the data at a specific cache section.

## `VtxcacheSetRequired = (signature: string) => IVtxcacheSetRequired`

Sets the required flag to true at a specific cache section

## `VtxcacheSetError = (signature: string, error: Error, block: number) => IVtxcacheSetError`

Sets the error at a specific cache section

## `VtxcacheReset = () => IVtxcacheReset`

Resets all the cache

## `VtxpollSetIntervalId = (interval_id: NodeJS.Timeout) => IVtxpollSetIntervalId`

Sets the interval id generated when starting the poll interval

## `VtxpollKill = () => IVtxpollKill`

Stops the interval

