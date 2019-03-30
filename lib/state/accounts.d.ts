import { BigNumber } from 'bignumber.js';
export interface Account {
    address: string;
    balance: BigNumber;
    transaction_count: number;
    contract: boolean;
    permanent: boolean;
}
export interface AccountsStore {
    [key: string]: Account;
}
export interface AliasStore {
    [key: string]: string;
}
export interface AccountsSection {
    accounts: AccountsStore;
    alias: AliasStore;
}
