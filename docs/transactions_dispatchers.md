---
id: transactions_dispatchers
title: Transactions Dispatchers
sidebar_label: Dispatchers
---

All these dispatchers are accessible from from `ethvtx/lib/dispatchers`;

To efficiently dispatch actions in the store, you can use the transactions dispatchers.
All dispatchers take a dispatch function as first argument.

## `addTransaction(dispatch: Dispatch, tx_hash: string, tx_infos?: DeepPartial<TxInfos>) => void`

This dispatcher will simply add what you give him in the store. 

```jsx
    
const mapDispatchToProps = (dispatch) => ({
    add_tx: (tx_hash) => addTransaction(dispatch, tx_hash)
});
    
```

## `removeTransaction(dispatch: Dispatch, tx_hash: string) => void`

Remove a stored transaction. No more information fetching will occur.

```jsx
    
const mapDispatchToProps = (dispatch) => ({
    rm_tx: (tx_hash) => removeTransaction(dispatch, tx_hash)
});
    
```

## `sendTransaction(dispatch: Dispatch, tx_infos: DeepPartial<TxInfos>) => number`

This call will send a transaction depending on the arguments provided in `tx_infos`.

The return value can be used in the getters as transaction id.

```jsx

const mapDispatchToProps = (dispatch, props) => ({
    send_100_wei_to: (from, to) => sendTransaction(dispatch, {
        from: from,
        to: to,
        value: 100 
    })
});

```

## `followTransaction(dispatch: Dispatch, tx_hash: string) => number`

This call will start fetching informations on the transaction defined in `tx_hash`.

The return value can be used in the getters as transaction id.

```jsx

const mapDispatchToProps = (dispatch, props) => ({
    fetch_tx: (tx_hash) => followTransaction(dispatch, tx_hash)
});

```

