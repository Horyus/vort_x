import React                          from 'react';
import { State, BigNumber }                      from 'ethvtx/lib/state';
import { connect }                    from 'react-redux';
import { getAccountList }             from 'ethvtx/lib/getters';
import { Card, CardHeader, CardBody } from 'shards-react';
import { Account }                    from 'ethvtx/lib/state';

interface IAccountsListProps {
    accounts?: any[];
}

export class AccountsListRaw extends React.Component<IAccountsListProps> {
    render(): React.ReactNode {

        const list = this.props.accounts!.map((account: Account, idx: number): React.ReactNode => {
            return <Card key={idx} style={{marginTop: '20px'}}>
                <CardHeader>{account.address}</CardHeader>
                <CardBody>
                    {account.balance
                        ? <p>Balance: {account.balance.div(new BigNumber('1000000000000000000')).toString()} Ethers</p>
                        : null }
                    {account.transaction_count !== null
                        ? <p>Transaction Count: {account.transaction_count}</p>
                        : null }
                    {account.contract === true ? <p>This is a contract</p> : null}
                </CardBody>
            </Card>;
        });

        return <Card>
            <CardHeader>Stored Accounts</CardHeader>
            <CardBody>
                <p>The balance and transaction count of these accounts is refreshed upon every new block</p>
                <p>0xa087a6Ddc4BDB1028fe4431C8616F8E15Cf5F522 is a permanent account, so it stays in the store even when it resets</p>
                {list}
            </CardBody>
        </Card>;
    }
}

const mapStateToProps = (state: State): IAccountsListProps => ({
    accounts: getAccountList(state).map((account: string) => state.accounts.accounts[account])
});

export const AccountsList = connect(mapStateToProps)(AccountsListRaw);
