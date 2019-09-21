import React from 'react';
import { withContracts, getContractFromProps } from 'react-ethvtx';
import {
    Card,
    CardHeader,
    CardBody
} from 'shards-react';
import { connect } from 'react-redux';

export class ContractMethodCallRaw extends React.Component {

    render() {

        return (
            <div>
                <Card>
                    <CardHeader>Constant Calls</CardHeader>
                    <CardBody>
                        <p>Constant Calls are made by the store and data is refreshed automatically</p>
                        <p>Value stored by contracts is: <span style={{
                            fontSize: 20
                        }}>{
                            this.props.simple_storage_get || 'Loading ...'
                        }</span></p>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const contract = getContractFromProps(ownProps, 'SimpleStorage', ownProps.address);

    return {
        simple_storage_get: contract && contract.instance && contract.instance.valid ? contract.instance.fn.get() : null
    }
};

const loadContract = (props) => {

    if (props.address) {
        return [
            {
                contract: 'SimpleStorage',
                address: props.address,
                load: true
            }
        ]
    } else {
        return [];
    }

};
export const ContractMethodCall =
    withContracts(
        {
            contracts: loadContract,
            mapStateToProps
        },
        connect(mapStateToProps)(ContractMethodCallRaw)
    );
