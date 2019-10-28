---
id: react_contract_events
title: Get events emitted by contract
sidebar_label: Get events emitted by contract
---

Now that you know how to read Contract data into your Components and make transactions, you might want to catch events. Let's subscribe to the `ValueChanged` event defined on our example `SimpleStorage` contract.

## Making a constant call from a Component 

```jsx
import React from 'react';
import { withContracts, getContractFromProps } from 'react-ethvtx';

class ContractEventContainer extends React.Component {

    setValueToFive = () => {
        const contract = getContractFromProps(this.props, 'SimpleStorage', this.props.address);
   
        contract.fn.set(5); 
    }

    render() {

        const contract = getContractFromProps(this.props, 'SimpleStorage', this.props.address);
        
        const events = contract.events.ValueChanged();

        return (
            <div>
            <button onclick={this.setValueToFive}></button>
            <br/> 
            <p>{
                contracts !== null ? contract.fn.get() : 'Loading ...'
            }</p>
            <br/> 
            <p>{events.length}</p>
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

Catching contract events is documented [**here**](/ethvtx/docs/vtxcontract#catch-evm-events)

