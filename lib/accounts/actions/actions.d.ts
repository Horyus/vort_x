import { IAccountsAdd, IAccountsRemove, IAccountsReset, IAccountsSetInfos } from './actionTypes';
import { BigNumber } from 'bignumber.js';
export declare const AccountsAdd: (address: string, config?: {
    alias?: string;
    permanent?: boolean;
}) => IAccountsAdd;
export declare const AccountsRemove: (address_or_alias: string) => IAccountsRemove;
export declare const AccountsSetInfos: (address: string, balance: BigNumber, transaction_count: number, contract: boolean) => IAccountsSetInfos;
export declare const AccountsReset: () => IAccountsReset;
