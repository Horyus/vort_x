---
id: blocks_actions
title: Blocks Actions
sidebar_label: Actions
---

All these types and functions are accessible from `ethvtx/lib/actions`.

## Identifiers

All the identifiers for the actions can be found in the `BlocksActions` export

```jsx
export const BlocksActions = {
    BlocksInitialHeight: '[VTX][BLOCKS] INITIAL_HEIGHT',
    BlocksFetch: '[VTX][BLOCKS] FETCH',
    BlocksFetched: '[VTX][BLOCKS] FETCHED',
    BlocksFetchedHeight: '[VTX][BLOCKS] FETCHED_HEIGHT',
    BlocksNew: '[VTX][BLOCKS] NEW'
};
```

## Exposed Actions

Actions that you can use as you want in your app, sagas etc ...

### `BlocksFetch = (height: number) => IBlocksFetch`

Add a block without infos at the given `height`. The store will take care of it and will fetch informations. You can set any height, even if previous to the height at which the app started.

## Internal Actions

These actions are used internally by the store to make things work. You should not use them.

### `BlocksInitialHeight = (height: number) => IBlocksInitialHeight`

Used internally to set the initial height, the height at which the app started.

### `BlocksFetchedHeight = (height: number) => IBlocksFetchedHeight`

Used internally to set the current height

### `BlocksFetched = (number: number, block_infos: Block) => IBlocksNew`

Used internally to set informations about a block.

### `BlocksNew = (number: number, block_infos: Block) => IBlocksNew`

Used internally to set informations about a brand new block. This is one of the core actions in the store, as a lot of data refresh works around this action, and waits only for new blocks to refresh anything.

