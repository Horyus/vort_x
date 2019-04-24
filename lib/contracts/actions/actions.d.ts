import { IContractsAddSpec, IContractsDeploy, IContractsNew, IContractsRemove, IContractsRemoveSpec, IContractsReset, IContractsSend } from './actionTypes';
import { NewContractInfos, TxInfos } from '../../state/txs';
export declare const ContractsDeploy: (contract: NewContractInfos, tx_infos: Partial<TxInfos>, args: any[], id: number) => IContractsDeploy;
export declare const ContractsSend: (call: () => Promise<string>, id: number, method: string, args: any[], contract: string, address: string) => IContractsSend;
export declare const ContractsAddSpec: (name: string, abi: any, options?: {
    bin?: string;
    permanent?: boolean;
    constructor_bin?: string;
}) => IContractsAddSpec;
export declare const ContractsRemoveSpec: (name: string) => IContractsRemoveSpec;
export declare const ContractsNew: (contract: string, address: string, options?: {
    alias?: string;
    permanent?: boolean;
    balance?: boolean;
}) => IContractsNew;
export declare const ContractsReset: () => IContractsReset;
export declare const ContractsRemove: (contract: string, address_or_alias: string) => IContractsRemove;
