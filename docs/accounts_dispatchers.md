---
id: accounts_dispatchers
title: Accounts Dispatchers
sidebar_label: Dispatchers
---

All these dispatchers are accessible from from `ethvtx/lib/dispatchers`;

To efficiently dispatch actions in the store, you can use the accounts dispatchers.
All dispatchers take a dispatch function as first argument.

## `addAccount(dispatch: Dispatch, address: string, config?: {alias?: string, permanent?: boolean}) => void`

To add an account in the store, use this dispatcher. After adding an account in the store, its informations will start getting fetched and updated accordingly.

Setting `permanenet` to `true` will keep the account in the store even after a reset.

```jsx

const mapDispatchToProps = (dispatch) => ({
    add_account: (address) => addAccount(dispatch, address),
    add_account_with_alias: (address, alias) => addAccount(dispatch, address, {alias}),
    add_permanant_account_with_alias: (address, alias) => addAccount(dispatch, address, {alias, permanent: true}),
    
});

```

## `removeAccount(dispatch: Dispatch, address_or_alias: string) => void`

You can of course remove an account from the store.

```jsx

const mapDispatchToProps = (dispatch) => ({
    rm_account: (address_or_alias) => removeAccount(dispatch, address_or_alias)
});

```

