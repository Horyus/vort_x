---
id: accounts_getters
title: Accounts Getters
sidebar_label: Getters
---

All these getters are accessible from from `ethvtx/lib/getters`;

To efficiently recover informations about the accounts from the `state` (ex: in `mapStateToProps`), you can use the accounts getter helper functions. All of them take the state of the store as first argument.

## `getAccount(state: State, address_or_alias: string) => Account`

This function helps you recover a specific account from its ethereum address or its alias.

```jsx

const mapStateToProps = (state) => ({
    account: getAccount(state, '0x09A38F24D34fa76CFe79725AE62ABb0906571634')
});

```

```jsx

const mapStateToProps = (state) => ({
    coinbase: getAccount(state, '@coinbase')
});

```

## `getAccountList(state: State) => string[]`

This function will simply return a list with all the account scurrently stored in the `ethvtx` store.

```jsx

const mapStateToProps = (state) => ({
    all_accounts: getAccountList(state)
});

```

