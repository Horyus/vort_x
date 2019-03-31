---
id: blocks_dispatchers
title: Blocks Dispatchers
sidebar_label: Dispatchers
---

All these dispatchers are accessible from from `ethvtx/lib/dispatchers`;

To efficiently dispatch actions in the store, you can use the blocks dispatchers.
All dispatchers take a dispatch function as first argument.

## `fetchBlock(dispatch: Dispatch, height: number) => void`

Adds a block in the store. The polling engine will fetch its information on the next time it's called.

```jsx

const mapDispatchToProps = (dispatch) => ({
    fetch_block: (height) => fetchBlock(dispatch, height)
});

```
