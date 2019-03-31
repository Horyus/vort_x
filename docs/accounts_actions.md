---
id: accounts_actions
title: Accounts Actions
sidebar_label: Actions
---

All these types and functions are accessible from `ethvtx/lib/actions`.

## Identifiers

All the identifiers for the actions can be found in the `AccountsActions` export

```jsx
export const AccountsActions = {
    AccountsAdd: '[VTX][ACCOUNTS] ADD',
    AccountsRemove: '[VTX][ACCOUNTS] REMOVE',
    AccountsSetInfos: '[VTX][ACCOUNTS] SET_INFOS',
    AccountsReset: '[VTX][ACCOUNTS] RESET'
};
```

## Exposed Actions

Actions that you can use as you want in your app, sagas etc ...

### `AccountsAdd(address: string, config?: {alias?: string, permanent?: boolean}) => IAccountsAdd`

Adds an account in the store. `alias` creates a string alias for your convenience. `permanent` allows this account to stay in the store even between resets.

### `AccountsRemove(address_or_alias: string) => IAccountsRemove`

Removes an account from the store.

## Internal Actions

These actions are used internally by the store to make things work. You should not use them.

### `AccountsSetInfos(address: string, balance: BigNumber, transaction_count: number, contract: boolean) => IAccountsSetInfos`


Sets freshly fetched data for a specific account.

### `AccountsReset() => IAccountsReset`

Resets all the accounts, and keeps only the `permanent` ones.

