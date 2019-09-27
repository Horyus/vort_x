import React from 'react';
import { withContracts, getContractFromProps } from 'react-ethvtx';
import {
    Card,
    CardHeader,
    CardBody
} from 'shards-react';

export class ContractMethodCallRaw extends React.Component {

    render() {

        const contract = getContractFromProps(this.props, 'SimpleStorage', this.props.address);

        return (
            <div>
                <Card>
                    <CardHeader>Constant Calls</CardHeader>
                    <CardBody>
                        <p>Constant Calls are made by the store and data is refreshed automatically</p>
                        <p>Value stored by contracts is: <span style={{
                            fontSize: 20
                        }}>{
                            contract && contract.instance.valid ? contract.instance.fn.get() || 'Loading ...' : 'Loading ...'
                        }</span></p>
                    </CardBody>
                </Card>
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

export const ContractMethodCall = withContracts(loadContract, ContractMethodCallRaw);

