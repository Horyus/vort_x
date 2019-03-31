---
id: contracts_getters
title: Contracts Getters
sidebar_label: Getters
---

All these getters are accessible from from `ethvtx/lib/getters`;

To efficiently recover informations about the contracts from the `state` (ex: in `mapStateToProps`), you can use the contracts getter helper functions. All of them take the state of the store as first argument.

## `getContractSpecList(state: State) => string[]`

This function will give you a full list of loaded contract specs.

```jsx

const mapStateToProps = (state) => ({
    spec_list: getContractSpecList(state)
});

```


## `getContract(state: State, contract_name: string, address_or_alias: string) => VtxContract`

Very useful function. By providing a contract type and its address / alias, it will recover the `VtxContract` instance for you.

```jsx
    
const mapStateToProps = (state) => ({
    my_contract_by_address: getContract(state, 'SimpleStorage', '
0x32dc9d787df5bffb7218bd247c7bc7838151d87f')
});

```

```jsx

// Assuming you added the contract instance with a @default alias
const mapStateToProps = (state) => ({
    my_contract_by_alias: getContract(state, 'SimpleStorage', '
@default')
});

```

```jsx

// Nice to chain with constant method call ...
const mapStateToProps = (state) => ({
    my_contract_data: getContract(state, 'SimpleStorage', '
@default').fn.getData()
});

```

```jsx

// ... or even with event fetch call
const mapStateToProps = (state) => ({
    my_contract_data: getContract(state, 'SimpleStorage', '
@default').events.ValueChanged()
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

