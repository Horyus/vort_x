---
id: transactions_state
title: Transactions State
sidebar_label: State
---

All these types are accessible in TS from `ethvtx/lib/state`;

## TxStatus

This enumeration contains the different possible statuses of a transaction.

```jsx
{
    Broadcasted: 'Broadcasted',
    Confirming: 'Confirming',
    Confirmed: 'Confirmed',
    Unknown: 'Unknown',
    Error: 'Error'
}
```

## TxInfos

Interface representing the informations about a transaction. This is what is fetched from the blockchain.

```jsx
{
    hash: string;
    nonce: number;
    blockHash: string;
    blockNumber: number;
    transactionIndex: number;
    from: string;
    to: string;
    value: string;
    gasPrice: string;
    gas: number;
    input: string;
    v?: string;
    r?: string;
    s?: string;
}
```

## Tx

This is the complete informations you can have about a transaction, containing its infos, status and possible errors. Also contains its id for easier fetching, we'll cover this under the `getters` section.

```jsx
{
    infos: Partial<TxInfos>;
    status: TxStatus;
    e: Error;
    hash: string;
    id?: number;
}
```

## TxSection

Simple key => value store, with transaction hashes as keys.

This is what you can access at `state.txs`.

```jsx
{
    [key: string]: Tx;
}
```


