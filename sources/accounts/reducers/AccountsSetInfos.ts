import { Reducer }           from 'redux';
import { AccountsSection }   from '../../state/accounts';
import { IAccountsSetInfos } from '../actions/actionTypes';

export const AccountsSetInfosReducer: Reducer<AccountsSection, IAccountsSetInfos> = (state: AccountsSection, action: IAccountsSetInfos): AccountsSection => {

    if (!state.accounts[action.address]) {
        return {
            ...state
        };
    }

    return {
        ...state,
        accounts: {
            ...state.accounts,
            [action.address]: {
                ...state.accounts[action.address],
                balance: action.balance,
                transaction_count: action.transaction_count,
                contract: action.contract !== undefined ? action.contract : (state.accounts[action.address] !== undefined ? state.accounts[action.address].contract : null)
            }
        }
    };

};
