---
id: react_read_store
title: Reading the store
sidebar_label: Reading the store
---

To read the store, simply use the native `connect` HOC provided by `react-redux` to directly access the state. You can then use one of the many **getters** defined for each section of the store to easily recover the data you need.

If the `mapStateToProps` function and the `connect` HOC is not something you know, I suggest you take a look at [how `redux` & `react-redux` work](https://react-redux.js.org/introduction/basic-tutorial) before using `ethvtx`

These getters will never fail and will return `undefined` if there is no data for what you ask. It's your job to make sure the data you look for in the store is actually there (we cover this in the next page).

## Accounts - Recover balances

Easily get balances of any ethereum address.

```typescript
const mapStateToProps = (state: State, ownProps: any): any => {
    return {
        account: getAccount(state, ownProps.address)
    }
}
```

All `account` getters are documented [**here**](/ethvtx/docs/accounts_getters)

## Blocks - Recover blocks

Here, we always recover the last fetched block.

```typescript
const mapStateToProps = (state) => {
    return {
        block: getBlock(state, state.blocks.current_height)
    };
}
```

All `blocks` getters are documented [**here**](/ethvtx/docs/blocks_getters)

## Transactions - Get transactions

Get all transactions made by the `coinbase` address (that are stored into the store)

```typescript
const mapStateToProps = (state) => {
    return {
        all_txs: getTransactions(state, {
            from: state.vtxconfig.coinbase
        })
    }
};
```

All `txs` getters are documented [**here**](/ethvtx/docs/txs_getters)

## Getters

| Section | Link |
| :---: | :---: |
| `accounts` | [**here**](/ethvtx/docs/accounts_getters) |
| `blocks` | [**here**](/ethvtx/docs/blocks_getters) |
| `txs` | [**here**](/ethvtx/docs/txs_getters) |
| `contracts` | [**here**](/ethvtx/docs/contracts_getters) |
| `vtc` | [**here**](/ethvtx/docs/vtx_getters) |

