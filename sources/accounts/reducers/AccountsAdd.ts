import { Reducer }         from 'redux';
import { AccountsSection } from '../../state/accounts';
import { IAccountsAdd }    from '../actions/actionTypes';

export const AccountsAddReducer: Reducer<AccountsSection, IAccountsAdd> = (state: AccountsSection, action: IAccountsAdd): AccountsSection => {
    if (action.alias) {

        return {
            accounts: {
                ...state.accounts,
                [action.address]: {
                    address: action.address,
                    balance: null,
                    transaction_count: null,
                    contract: null,
                    permanent: !!action.permanent
                }
            },
            alias: {
                ...state.alias,
                [action.alias]: action.address
            }
        };

    } else {

        return {
            ...state,
            accounts: {
                ...state.accounts,
                [action.address]: {
                    address: action.address,
                    balance: null,
                    transaction_count: null,
                    contract: null,
                    permanent: !!action.permanent
                }
            }
        };

    }
};
