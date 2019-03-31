---
id: blocks_getters
title: Blocks Getters
sidebar_label: Getters
---

All these getters are accessible from from `ethvtx/lib/getters`;

To efficiently recover informations about the blocks from the `state` (ex: in `mapStateToProps`), you can use the blocks getter helper functions. All of them take the state of the store as first argument.

## `getBlock(state: State, height: number) => Block`

This function helps you recover a specific block from its height.

This example will return the informations for the `initial_height`, the block numbre at which the app started.

```jsx

const mapStateToProps = (state) => ({
    block: getBlock(state, state.blocks.initial_height)
});

```

