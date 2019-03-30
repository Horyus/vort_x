import { Action } from 'redux';
import { BigNumber } from 'bignumber.js';
export declare const AccountsActions: {
    AccountsAdd: string;
    AccountsRemove: string;
    AccountsSetInfos: string;
    AccountsReset: string;
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
export declare type AccountsActionTypes = IAccountsAdd | IAccountsRemove | IAccountsSetInfos | IAccountsReset;
