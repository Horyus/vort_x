---
id: transactions_actions
title: Transactions Actions
sidebar_label: Actions
---

All these types and functions are accessible from `ethvtx/lib/actions`.

## Identifiers

All the identifiers for the actions can be found in the `TxActions` export

```jsx
export const TxActions = {
    TxAdd: '[VTX][TX] ADD',
    TxRemove: '[VTX][TX] REMOVE',
    TxSet: '[VTX][TX] SET',
    TxError: '[VTX][TX] ERROR',
    TxSend: '[VTX][TX] SEND',
    TxReset: '[VTX][TX] RESET',
    TxFollow: '[VTX][TX] FOLLOW'
};
```

## Exposed Actions

Actions that you can use as you want in your app, sagas etc ...

### `TxRemove(tx_hash: string) => ITxRemove`

Removes a transaction from the store.

### `TxSend(tx_infos: Partial<TxInfos>, tx_id?: number) => ITxSend`

Sends a new transaction. The `tx_id` that you can specify can be used later to retrieve your transaction informations (instead of using the hash that you don't have for the moment). If you use the dispatcher, it will set this `tx_id` and return it to you.

### `TxFollow(tx_hash: string, tx_id?: number) => ITxFollow`

Tells the store to start fetching informations about given transaction hash. Also works with the `tx_id` if you want.



## Internal Actions

These actions are used internally by the store to make things work. You should not use them.

### `TxAdd(tx_hash: string, tx_infos: Partial<TxInfos>, tx_id?: number) => ITxAdd`

Adds the given transaction in the store, with optional informations. Will enter the fetch loop and its informations will be updated if required.

### `TxSet(tx_hash: string, tx_infos: Partial<TxInfos>, status?: TxStatus) => ITxSet`

When new data is fetched, it is set into the store with this action.

### `TxError(tx_hash: string, e: Error) => ITxError`

When an error occured with the transaction, this action is called.

### `TxReset() => ITxReset`

Resets this section of the store.

