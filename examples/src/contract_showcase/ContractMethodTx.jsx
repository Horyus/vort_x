import { withContracts, getContractFromProps } from 'react-ethvtx';
import React from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Button,
    Form,
    FormGroup,
    FormInput,
} from 'shards-react';

export class ContractMethodTxRaw extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: 0
        }
    }

    handleValueInput = (e) => {
        this.setState({value: e.target.value});
    }

    handleButtonClick = () => {
        const contract = getContractFromProps(this.props, 'SimpleStorage', this.props.address);

        if (contract) {
            contract.instance.fn.set(this.state.value);
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <CardHeader>Tx Calls</CardHeader>
                    <CardBody>
                        <p>Tx Calls are made by the store, and the transactions are automatically followed</p>
                        <Form>
                            <FormGroup>
                                <label htmlFor="#to">New Value</label>
                                <FormInput id="#to" placeholder="value" type="number" onChange={this.handleValueInput}/>
                            </FormGroup>
                            <FormGroup>
                                <Button onClick={this.handleButtonClick} outline theme="dark">
                                    Set Value
                                </Button>
                            </FormGroup>
                        </Form>
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

export const ContractMethodTx = withContracts(loadContract, ContractMethodTxRaw);

