import React from 'react';
import { withContracts, getContractFromProps } from 'react-ethvtx';
import { connect } from 'react-redux';
import { Card, CardHeader, CardBody } from 'shards-react';

export class ContractEventsRaw extends React.Component {
    render() {

        const list = this.props.events.map((event, idx) => {
            return <Card key={idx} style={{marginTop: '20px'}}>
                <CardHeader>Event ValueChanged #{idx + 1}</CardHeader>
                <CardBody>
                    <p>This Event was made by {event.returnValues.who}</p>
                    <p>It changed the value to {event.returnValues.new_value}</p>
                </CardBody>
            </Card>;
        });

        return <Card>
            <CardHeader>Contract Events</CardHeader>
            <CardBody>
                <p>This list shows all the EVM Events "ValueChanged" emitted by the smart contract</p>
                {list}
            </CardBody>
        </Card>;
    }
}

const mapStateToProps = (state, ownProps) => {
    const contract = getContractFromProps(ownProps, 'SimpleStorage', ownProps.address);

    return {
        events: contract && contract.instance && contract.instance.valid ? contract.instance.events.ValueChanged() : []
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

export const ContractEvents = withContracts(
    {
        contracts: loadContract,
        mapStateToProps,
    },
    connect(mapStateToProps)(ContractEventsRaw));

