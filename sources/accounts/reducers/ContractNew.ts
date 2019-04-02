import { Reducer }            from 'redux';
import { IContractsNew }      from '../../contracts/actions/actionTypes';
import { AccountsAddReducer } from './AccountsAdd';
import { AccountsSection }    from '../../state/accounts';
import { AccountsAdd }        from '../actions/actions';

export const ContractsNewReducer: Reducer<AccountsSection, IContractsNew> =
    (state: AccountsSection, action: IContractsNew): AccountsSection => {
        if (action.balance) {
            return AccountsAddReducer(state, AccountsAdd(action.address, {
                alias: action.alias,
                permanent: action.permanent
            }));
        } else {
            return state;
        }
    };
