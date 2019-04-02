import { Reducer }                 from 'redux';
import { AccountsSection }         from '../../state/accounts';
import {
    AccountsActions,
    AccountsActionTypes,
    IAccountsAdd,
    IAccountsRemove, IAccountsReset,
    IAccountsSetInfos
}                                          from '../actions/actionTypes';
import { AccountsAddReducer }              from './AccountsAdd';
import { AccountsRemoveReducer }           from './AccountsRemove';
import { AccountsSetInfosReducer }         from './AccountsSetInfos';
import { AccountsResetReducer }            from './AccountsReset';
import { InitialState }                    from '../../state/index';
import { ContractsActions, IContractsNew } from '../../contracts/actions/actionTypes';
import { ContractsNewReducer }             from './ContractNew';

export const AccountsReducer: Reducer<AccountsSection, AccountsActionTypes | IContractsNew> = (state: AccountsSection = InitialState.accounts, action: AccountsActionTypes): AccountsSection => {
    switch (action.type) {
        case AccountsActions.AccountsAdd:
            return AccountsAddReducer(state, action as IAccountsAdd);
        case AccountsActions.AccountsRemove:
            return AccountsRemoveReducer(state, action as IAccountsRemove);
        case AccountsActions.AccountsSetInfos:
            return AccountsSetInfosReducer(state, action as IAccountsSetInfos);
        case AccountsActions.AccountsReset:
            return AccountsResetReducer(state, action as IAccountsReset);

        case ContractsActions.ContractsNew:
            return ContractsNewReducer(state, action as IContractsNew);

        default:
            return state;
    }
};
