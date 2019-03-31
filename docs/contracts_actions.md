---
id: contracts_actions
title: Contracts Actions
sidebar_label: Actions
---

All these types and functions are accessible from `ethvtx/lib/actions`.

## Identifiers

All the identifiers for the actions can be found in the `ContractsActions` export

```jsx
export const ContractsActions = {
    ContractsAddSpec: '[VTX][CONTRACTS] ADD_SPEC',
    ContractsRemoveSpec: '[VTX][CONTRACTS] REMOVE_SPEC',
    ContractsReset: '[VTX][CONTRACTS] RESET',
    ContractsNew: '[VTX][CONTRACTS] NEW',
    ContractsRemove: '[VTX][CONTRACTS] REMOVE',
    ContractsSetSigner: '[VTX][CONTRACTS] SET_SIGNER',
    ContractsSend: '[VTX][CONTRACTS] SEND'
};
```

## Exposed Actions

Actions that you can use as you want in your app, sagas etc ...

### `ContractsAddSpec(name: string, abi: any, options?: { bin?: string, permanent?: boolean) => IContractsAddSpec`

Adds a contract specification into the store.

* If `bin` is provided AND the spec is loaded before starting the store, the store will actually check remotely for the bytecode of all the instances of this spec, and will tell if we are indeed on the good network by updating the store status.

* Otherwise `bin` will be checked as soon as a new instance is added.

* If no `bin` is provided, then no checks occur.

Setting `permanent` to true ensures that the spec remains in the store even after a reset

### `ContractsRemoveSpec(name: string) => IContractsRemoveSpec`

Removes a contract specification from the store.

### `ContractsNew(contract: string, address: string, options?: { alias?: string, permanent?: boolean }) => IContractsNew`

Loads a contract instance into the store and builds and `VtxContract` instance for you to use.
`alias` is here for naming convenience, and `permanent` keeps your instance in the store even after a reset.

### `ContractsRemove(contract: string, address_or_alias: string) => IContractsRemove`

Removes a contract instance

## Internal Actions

These actions are used internally by the store to make things work. You should not use them.

### `ContractsSend(call: () => Promise<string>, id: number, method: string, args: any[], contract: string, address: string) =>IContractsSend`

Use internally to trigger sagas that handle transaction sending.

### `ContractsReset() => IContractsReset`

Use internally to reset all the contracts of the store.

