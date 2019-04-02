import { Action }    from 'redux';
import { BigNumber } from 'bignumber.js';

export const AccountsActions = {
    AccountsAdd: '[VTX][ACCOUNTS] ADD',
    AccountsRemove: '[VTX][ACCOUNTS] REMOVE',
    AccountsSetInfos: '[VTX][ACCOUNTS] SET_INFOS',
    AccountsReset: '[VTX][ACCOUNTS] RESET'
};

export interface IAccountsAdd extends Action<string> {
    address: string;
    alias?: string;
    permanent?: boolean;
}

export interface IAccountsRemove extends Action<string> {
    address_or_alias: string;
}

export interface IAccountsSetInfos extends Action<string> {
    address: string;
    balance: BigNumber;
    transaction_count: number;
    contract: boolean;
}

export interface IAccountsReset extends Action<string> {
}

export type AccountsActionTypes = IAccountsAdd | IAccountsRemove | IAccountsSetInfos | IAccountsReset;
