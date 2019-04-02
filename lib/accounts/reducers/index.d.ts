import { Reducer } from 'redux';
import { AccountsSection } from '../../state/accounts';
import { AccountsActionTypes } from '../actions/actionTypes';
import { IContractsNew } from '../../contracts/actions/actionTypes';
export declare const AccountsReducer: Reducer<AccountsSection, AccountsActionTypes | IContractsNew>;
