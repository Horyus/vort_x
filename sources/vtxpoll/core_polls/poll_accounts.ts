import { VtxPollCb }        from '../../state/vtxpoll';
import { State }            from '../../state';
import { Dispatch }         from 'redux';
import { BigNumber }        from 'bignumber.js';
import { AccountsSetInfos } from '../../accounts/actions/actions';

export const poll_accounts: VtxPollCb = async (state: State, emit: Dispatch, new_block: boolean): Promise<void> => {

    const web3 = state.vtxconfig.web3;

    for (const account of Object.keys(state.accounts.accounts)) {

        if (!new_block && state.accounts.accounts[account].balance !== null) continue;

        const balance: BigNumber = new BigNumber(await web3.eth.getBalance(account));
        const transaction_count: number = await web3.eth.getTransactionCount(account);

        let contract = undefined;
        if (state.accounts.accounts[account].contract === null) {
            const code = (await web3.eth.getCode(account));
            contract = code !== '0x' && code !== '0x0';
        }

        if (state.accounts.accounts[account].balance !== balance || state.accounts.accounts[account].transaction_count !== transaction_count) {
            emit(AccountsSetInfos(account, balance, transaction_count, contract));
        }

    }

};

export const poll_accounts_interval: number = 1;
