---
id: contracts_getters
title: Contracts Getters
sidebar_label: Getters
---

All these getters are accessible from from `ethvtx/lib/getters`;

To efficiently recover informations about the contracts from the `state` (ex: in `mapStateToProps`), you can use the contracts getter helper functions. All of them take the state of the store as first argument.

## Getting a contract instance

To recover a `VtxContract` instance, follow the instructions for your library:

- React can be found [**here**](/ethvtx/docs/react_intro)

## `getContractSpecList(state: State) => string[]`

This function will give you a full list of loaded contract specs.

```jsx

const mapStateToProps = (state) => ({
    spec_list: getContractSpecList(state)
});

```

## `getContractList(state: State) => ContractList`

The `ContractList` type is defined by:

```jsx
{
    [key: string]: string[];
}
```

This method will return all the currently loaded instances of all the different types of contracts. The returned list is only a list of addresses.


```jsx

const mapStateToProps = (state) => ({
    simple_storage_list: getContractList(state).SimpleStorage
});

```

