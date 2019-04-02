import { Action }      from 'redux';

export const ContractsActions = {
    ContractsAddSpec: '[VTX][CONTRACTS] ADD_SPEC',
    ContractsRemoveSpec: '[VTX][CONTRACTS] REMOVE_SPEC',
    ContractsReset: '[VTX][CONTRACTS] RESET',
    ContractsNew: '[VTX][CONTRACTS] NEW',
    ContractsRemove: '[VTX][CONTRACTS] REMOVE',
    ContractsSetSigner: '[VTX][CONTRACTS] SET_SIGNER',
    ContractsSend: '[VTX][CONTRACTS] SEND'
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
}

export interface IContractsRemove extends Action<string> {
    contract: string;
    address_or_alias: string;
}

export interface IContractsReset extends Action<string> {
}

export type ContractsActionTypes =
    IContractsAddSpec
    | IContractsRemoveSpec
    | IContractsNew
    | IContractsRemove;
