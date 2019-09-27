import React from 'react';
import { withContracts, getContractFromProps } from 'react-ethvtx';
import { Card, CardHeader, CardBody } from 'shards-react';

export class ContractEventsRaw extends React.Component {
    render() {
        const contract = getContractFromProps(this.props, 'SimpleStorage', this.props.address);

        if (contract) {

            const events = contract.instance.events.ValueChanged();

            const list = events.map((event, idx) => {
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

        } else {

            return <Card>
                <CardHeader>Contract Events</CardHeader>
                <CardBody>
                    <p>This list shows all the EVM Events "ValueChanged" emitted by the smart contract</p>
                </CardBody>
            </Card>;

        }
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

export const ContractEvents = withContracts(loadContract, ContractEventsRaw);

