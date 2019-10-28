---
id: accounts_state
title: Accounts State
sidebar_label: State
---

All these types are accessible in TS from `ethvtx/lib/state`;

## Accounts

This is the intersting type. It contains all the informations about an account (Ethereum address).

```jsx
{
    address: string;
    balance: BigNumber;
    transaction_count: number;
    contract: boolean;
    permanent: boolean;
}
```

## AccountsStore

Simple key => value store, with Ethereum addresses as the key.

/!\ All the addresses in the `ethvtx` store are checksummed addresses, so double check your inputs !

```jsx
{
    [key: string]: Accounts
}
```

## AliasStore

Simple key => value store, binding aliases to Ethereum Addresses

```jsx
{
    [key: string]: string;
}
```

## AccountsSection

This is what you can access at `state.accounts`.

```jsx
{
    accounts: AccountsStore,
    alias: AliasStore
}
```


