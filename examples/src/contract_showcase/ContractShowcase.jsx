import React from 'react';
import { Box, Grid } from 'grommet';
import { get_contract_address } from '../ethvtx_config/getContractAddress';
import { ContractEvents } from './ContractEvents';
import { ContractMethodCall } from './ContractMethodCall';
import { ContractMethodTx } from './ContractMethodTx';
import { FormCheckbox } from "shards-react";

export class ContractShowcase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            address: null,
            active: true
        }
    }

    activate = () => {
        this.setState({
            active: !this.state.active
        })
    }

    async componentDidMount() {
        const address = await get_contract_address();

        this.setState({
            address
        });

    }

    render() {
        return <div style={{marginTop: '20px'}}>
            <h2>Smart Contracts</h2>
            <FormCheckbox
                toggle
                checked={this.state.active}
                onChange={this.activate}>
                🚀 Enable Contracts
            </FormCheckbox>
            {
                this.state.active

                    ?
                    <Grid
                        rows={['auto']}
                        columns={['auto', 'auto', 'auto']}
                        gap="medium"
                        margin="medium"
                        areas={[
                            {name: 'call', start: [0, 0], end: [0, 0]},
                            {name: 'tx', start: [1, 0], end: [1, 0]},
                            {name: 'event', start: [2, 0], end: [2, 0]}
                        ]}
                    >
                        <Box gridArea="call">
                            <ContractMethodCall address={this.state.address}/>
                        </Box>
                        <Box gridArea="tx">
                            <ContractMethodTx address={this.state.address}/>
                        </Box>
                        <Box gridArea="event">
                            <ContractEvents address={this.state.address}/>
                        </Box>
                    </Grid>

                    :
                    null

            }
        </div>;
    }
}


