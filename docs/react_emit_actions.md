---
id: react_emit_actions
title: Dispatch actions
sidebar_label: Dispatch actions
---

To dispatch actions, simply use the native `connect` HOC provided by `react-redux` to directly access the `dispatch` function. You can then use one of the many **dispatchers** defined for each section of the store to easily interact with `ethvtx`.

If the `mapDispatchToProps` function and the `connect` HOC is not something you know, I suggest you take a look at [how `redux` & `react-redux` work](https://react-redux.js.org/introduction/basic-tutorial) before using `ethvtx`

## Dispatchers

| Section | Link |
| :---: | :---: |
| `accounts` | [**here**](/ethvtx/docs/accounts_getters) |
| `blocks` | [**here**](/ethvtx/docs/blocks_getters) |
| `txs` | [**here**](/ethvtx/docs/txs_getters) |
| `contracts` | [**here**](/ethvtx/docs/contracts_getters) |
| `vtc` | [**here**](/ethvtx/docs/vtx_getters) |

