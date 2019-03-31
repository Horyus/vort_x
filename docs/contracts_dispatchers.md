---
id: contracts_dispatchers
title: Contracts Dispatchers
sidebar_label: Dispatchers
---

All these dispatchers are accessible from from `ethvtx/lib/dispatchers`;

To efficiently dispatch actions in the store, you can use the contracts dispatchers.
All dispatchers take a dispatch function as first argument.

## `loadContractSpec(dispatch: Dispatch, name: string, abi: any, options?: {bin?: string; permanent?: boolean}) => void`

Loads a contract spec into the store.

If `bin` is provided (which takes the **RUNTIME** bytecode of the contract), the store will make an extra verification on all instances of this type. (Basically it will check if the bin it founds at the address of the contract is the same as the one you provided here, might prevent tragix transactions).

If `permanent` is provided, it only means that this spec will stay in the store even if the store resets itself.

The best usage example of `loadContractSpec` is in the [**Starting ethvtx section**](/ethvtx/docs/starting_ethvtx#manual)

Most of the time, you will call this method only during the store setup, not while the app is really running.

## `removeContractSpec(dispatch: Dispatch, name: string) => void`

Remove a contract spec from the store. (Yes, there might be no point in having this feature, but if someone needs dynamic contract spec loading / unloading, then why not)

```jsx

const mapDispatchToProps = (dispatch) => ({
    rm_spec: () => removeContractSpec(dispatch, 'SimpleStorage')
});

```

## `loadContractInstance(dispatch: Dispatch, contract_name: string, address: string, options?: {alias?: string, permanent?: boolean, balance?: boolean}): void`

Loads a contract instance into the store.
When a contract is loaded, the store will perform various verifications in order to set its status to `valid`. If you load a contract instance **BEFORE** starting the store, these verifications will alter the [**ethvtx status**](/ethvtx/docs/ethvtx_status), which can be very useful if you want extra security and prevent any user to use the application if contracts are not properly loaded.

If `alias` is provided, you will be able to refer to this instance by its alias instead of its address. It improves readability. An alias is unique for each contract type. 

Ex: You can't have two `SimpleStorage` instances with the alias `@default`, but you can have one `SimpleStorage` instance and one `SimpleMath` instance both with the `@default` alias.

If `permanent` is provided, it only means that this spec will stay in the store even if the store resets itself.

If `balance` is provided, it will also add this contract address to the `accounts` section.

The best usage example of `loadContractInstance` is in the [**Starting ethvtx section**](/ethvtx/docs/starting_ethvtx#manual)

## `removeContractInstance(dispatch: Dispatch, contract_name: string, address_or_alias: string) => void`

Removes a contract instance from the store.

```jsx

const mapDispatchToProps = (dispatch) => ({
    rm_instance: (address) => removeContractInstance(dispatch, 'SimpleStorage', address)
})

```

