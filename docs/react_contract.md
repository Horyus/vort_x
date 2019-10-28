---
id: react_contract
title: Use the withContracts HOC
sidebar_label: Use the withContracts HOC
---

Contracts are a different part of the store. To properly interact with Contracts, you **NEED** to use the `withContracts` HOC in order to recover the `VtxContract` instance.

A `VtxContract` instance is an object that will allow you to both read data (constant calls and events) from a smart contract and trigger transactions. By using the `withContracts` helper, you will be sure that the refreshing flow preserved.

## The Smart Contract

Let's say we have the following contract in the exemples that follow.

```solidity
pragma solidity ^0.5.0;

contract SimpleStorage {
    uint public storedData;
    event ValueChanged(address indexed who, uint new_value);

    constructor(uint initialValue) public {
        storedData = initialValue;
    }

    function set(uint x) public {
        storedData = x;
        emit ValueChanged(msg.sender, x);
    }

    function get() public view returns (uint retVal) {
        return storedData;
    }

}
```

In the following sections, we will see how we can use the three items that the contract expose: `set`, `get` and the `ValueChanged` event.

## Loading the Spec

Loading the spec is simple, and is explained [**here**](/ethvtx/docs/starting_ethvtx#setting-initial-smart-contracts-accounts). When you contract is compiled, you should be able to recover the informations required to build the spec (abi, binary code ...)

## Loading the Contract in a React Component

```jsx
import React from 'react';
import { withContracts, getContractFromProps } from 'react-ethvtx';

class ContractLoaderContainer extends React.Component {

    render() {

        const contract = getContractFromProps(this.props, 'SimpleStorage', this.props.address);

        return (
            <div>
            {
                contracts !== null ? 'Loaded !' : 'Loading ...'
            }
            </div>
        );
    }
}

const loadContract = (state, props) => {

    if (props.address) {
        return [
            {
                contract: 'SimpleStorage',
                address: props.address,
                balance: true
            }
        ]
    } else {
        return [];
    }

};

export const ContractLoader = withContracts(loadContract, ContractLoaderContainer);
```

## `withContracts`

```javascript
function withContracts(contracts_or_function, component);
```

### `contracts_or_function`

#### ContractParams

```
{
    contract: string;
    address?: string;
    alias?: string;
    balance?: boolean;
    persist_cache?: boolean;
    persist_balance?: boolean;
    persist_events?: boolean;
    persist_contract?: boolean;
}
```

The first argument is either an array of objects of type `ContractParams`, or a function taking the store `state` and the given `props` as arguments and returning an array of object of type `ContractParams`.

To sum things up, this

```javascript
withContracts([
    {
        contract: 'SimpleStorage',
        address: '0x6C90AeCe04198DA2d5CA9B956b8F95aF8041DE37'
    }
], ContractBuilder)
```

is the same as this

```javascript
const loadContract = (state, props) => ({
    contract: 'SimpleStorage',
    address: '0x6C90AeCe04198DA2d5CA9B956b8F95aF8041DE37'
})

withContracts(loadContract, ContractBuilder)
```

The function allows more modularity, taking address or contract type from props.

The `ContractParams` is defined by the following fields

| Name | Optional | Description |
| :---: | :---: | :---: |
| `contract` | No | Name of the Contract Spec to use |
| `address` | Yes | Can be omitted if using an `alias` |
| `alias` | Yes | Load a contract based on the given `alias` |
| `balance` | Yes | If contract is not in store (and address is provided), `withContracts` will load the contract instance for you ! This argument allows you to also add the contract address in the `accounts` section of the store. |
| `persist_cache` | Yes | If contracts are loaded, the instances are also destroyed when all components using a specific instance are unmounted. To keep the cache of the contract, set this flag to true. |
| `persist_balance` | Yes |To keep the balance of the contract, set this flag to true. |
| `persist_events` | Yes | To keep the events of the contract, set this flag to true. |
| `persist_contract` | Yes | To keep the instance of the contract, set this flag to true. |

