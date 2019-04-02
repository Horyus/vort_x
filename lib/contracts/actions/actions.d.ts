import { IContractsAddSpec, IContractsNew, IContractsRemove, IContractsRemoveSpec, IContractsReset, IContractsSend } from './actionTypes';
export declare const ContractsSend: (call: () => Promise<string>, id: number, method: string, args: any[], contract: string, address: string) => IContractsSend;
export declare const ContractsAddSpec: (name: string, abi: any, options?: {
    bin?: string;
    permanent?: boolean;
}) => IContractsAddSpec;
export declare const ContractsRemoveSpec: (name: string) => IContractsRemoveSpec;
export declare const ContractsNew: (contract: string, address: string, options?: {
    alias?: string;
    permanent?: boolean;
    balance?: boolean;
}) => IContractsNew;
export declare const ContractsReset: () => IContractsReset;
export declare const ContractsRemove: (contract: string, address_or_alias: string) => IContractsRemove;
