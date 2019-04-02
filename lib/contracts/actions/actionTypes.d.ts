import { Action } from 'redux';
export declare const ContractsActions: {
    ContractsAddSpec: string;
    ContractsRemoveSpec: string;
    ContractsReset: string;
    ContractsNew: string;
    ContractsRemove: string;
    ContractsSetSigner: string;
    ContractsSend: string;
};
export interface IContractsSend extends Action<string> {
    call: () => Promise<string>;
    id: number;
    method: string;
    args: any[];
    contract: string;
    address: string;
}
export interface IContractsAddSpec extends Action<string> {
    name: string;
    abi: any;
    bin?: string;
    permanent?: boolean;
}
export interface IContractsRemoveSpec extends Action<string> {
    name: string;
}
export interface IContractsNew extends Action<string> {
    contract: string;
    address: string;
    alias?: string;
    permanent?: boolean;
    balance?: boolean;
}
export interface IContractsRemove extends Action<string> {
    contract: string;
    address_or_alias: string;
}
export interface IContractsReset extends Action<string> {
}
export declare type ContractsActionTypes = IContractsAddSpec | IContractsRemoveSpec | IContractsNew | IContractsRemove;
