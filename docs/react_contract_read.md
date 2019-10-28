---
id: react_contract_read
title: Read data from contract
sidebar_label: Read data from contract
---

Now that you know how to load contracts into your Components, you might want to make constant calls and display the results. Let's call the `get` method defined on our example `SimpleStorage` contract.

## Making a constant call from a Component 

```jsx
import React from 'react';
import { withContracts, getContractFromProps } from 'react-ethvtx';

class ContractGetContainer extends React.Component {

    render() {

        const contract = getContractFromProps(this.props, 'SimpleStorage', this.props.address);

        return (
            <div>
            {
                contracts !== null ? contract.fn.get() : 'Loading ...'
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

export const ContractGet = withContracts(loadContract, ContractGetContainer);
```

This will call the `get` method and store the result in the store. The value will be updated only when a new block is fetched. This will re-render your component as soon as new data is fetched !

Reading from contract is documented [**here**](/ethvtx/docs/vtxcontract#call-constant-methods)

