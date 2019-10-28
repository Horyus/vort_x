---
id: react_contract_tx
title: Send transaction to contract
sidebar_label: Send transaction to contract
---

Now that you know how to read Contract data into your Components, you might want to make transactions. Let's call the `set` method defined on our example `SimpleStorage` contract.

## Making a constant call from a Component 

```jsx
import React from 'react';
import { withContracts, getContractFromProps } from 'react-ethvtx';

class ContractSetContainer extends React.Component {

    setValueToFive = () => {
        const contract = getContractFromProps(this.props, 'SimpleStorage', this.props.address);
   
        contract.fn.set(5); 
    }

    render() {

        const contract = getContractFromProps(this.props, 'SimpleStorage', this.props.address);

        return (
            <div>
            <button onclick={this.setValueToFive}></button>
            <br/> 
            <p>{
                contracts !== null ? contract.fn.get() : 'Loading ...'
            }</p>
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

export const ContractSet = withContracts(loadContract, ContractSetContainer);
```

This will call the `get` method and display the result. Clicking the button will make a transaction to set the smart contract value to 5. The displayed value will update.

Calling contract transaction method is documented [**here**](/ethvtx/docs/vtxcontract#call-transaction-methods)

