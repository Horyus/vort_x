---
id: transactions_getters
title: Transactions Getters
sidebar_label: Getters
---

All these getters are accessible from from `ethvtx/lib/getters`;

To efficiently recover informations about the transactions from the `state` (ex: in `mapStateToProps`), you can use the transactions getter helper functions. All of them take the state of the store as first argument.

## `getTransaction(state: State, transaction_hash: string) => Tx`

This function helps you recover a specific transaction from its transaction hash.

```jsx

const mapStateToProps = (state) => ({
    tx: getTransaction(state, '0x27b7183996df421b55e3f9f00734fe07d40792630a37040362917efd50101ee9')
});

```

## `getTransactionById(state: State, tx_id: number) => Tx`

When you dispatch a transaction from our `dispatchers`, you will recover a transaction id. This transaction id can be used to recover the transaction you just broadcasted very easily.

```jsx

const mapStateToProps = (state) => ({
    tx: getTransactionById(state, 12)
});

```

## `getTransactions(state: State, tx_infos?: DeepPartial<TxInfos>) => Tx[]`

Recover a group of transactions. If no tx_infos are provided, recovers all the transactions.
Otherwise, will filter on defined fields.

```jsx

// Getting all transactions
const mapStateToProps = (state) => ({
    all_txs: getTransactions(state)
});

```

```jsx

// Getting all transactions broadcasted from 0x32dc9d787df5bffb7218bd247c7bc7838151d87f
const mapStateToProps = (state) => ({
    all_txs: getTransactions(state, {
        from: '0x32dc9d787df5bffb7218bd247c7bc7838151d87f'
    })
});

```

/!\ This is only a getter, it will not fetch all the transactions ever made by `0x32dc9d787df5bffb7218bd247c7bc7838151d87f` on the blockchain, only the ones currently stored in the redux store.

