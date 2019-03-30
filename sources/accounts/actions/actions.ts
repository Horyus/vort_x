import { AccountsActions, IAccountsAdd, IAccountsRemove, IAccountsReset, IAccountsSetInfos } from './actionTypes';
import { address_checker }                                                                   from '../../utils/address_checker';
import { BigNumber }                                                                         from 'bignumber.js';

export const AccountsAdd = (address: string, config?: {alias?: string, permanent?: boolean}): IAccountsAdd => ({
    type: AccountsActions.AccountsAdd,
    address: address_checker(address),
    alias: config ? config.alias : undefined,
    permanent: config ? config.permanent : undefined
});

export const AccountsRemove = (address_or_alias: string): IAccountsRemove => ({
    type: AccountsActions.AccountsRemove,
    address_or_alias: address_checker(address_or_alias)
});

export const AccountsSetInfos = (address: string, balance: BigNumber, transaction_count: number, contract: boolean): IAccountsSetInfos => ({
    type: AccountsActions.AccountsSetInfos,
    address,
    balance,
    transaction_count,
    contract
});

export const AccountsReset = (): IAccountsReset => ({
    type: AccountsActions.AccountsReset
});
