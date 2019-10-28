import { Reducer }                                    from 'redux';
import { AccountsSection, AccountsStore, AliasStore } from '../../state/accounts';
import { IAccountsReset }                             from '../actions/actionTypes';

const ResetNonPermanentAccounts = (accounts: AccountsStore): AccountsStore => {

    const ret: AccountsStore = {};

    for (const key of Object.keys(accounts)) {
        if (accounts[key].permanent) {
            ret[key] = accounts[key];
        }
    }

    return ret;

};

const ResetNonPermanentAliases = (accounts: AccountsStore, aliases: AliasStore): AliasStore => {

    const ret: AliasStore = {};

    for (const key of Object.keys(aliases)) {
        if (accounts[aliases[key]].permanent) {
            ret[key] = aliases[key];
        }
    }

    return ret;

};

export const AccountsResetReducer: Reducer<AccountsSection, IAccountsReset> = (state: AccountsSection, action: IAccountsReset): AccountsSection => ({
    accounts: ResetNonPermanentAccounts(state.accounts),
    alias: ResetNonPermanentAliases(state.accounts, state.alias)
});
