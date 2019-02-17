import { Action }    from 'redux';
import { BigNumber } from 'ethers/utils';

export const AccountsActions = {
    AccountsAdd: 'ACCOUNTS_ADD',
    AccountsRemove: 'ACCOUNTS_REMOVE',
    AccountsSetInfos: 'ACCOUNTS_SET_INFOS',
    AccountsReset: 'ACCOUNTS_RESET'
};

export interface IAccountsAdd extends Action<string> {
    address: string;
    alias?: string;
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

export interface IAccountsReset extends Action<string> {}

export type AccountsActionTypes = IAccountsAdd | IAccountsRemove | IAccountsSetInfos | IAccountsReset;
