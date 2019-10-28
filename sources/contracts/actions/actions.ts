import {
    ContractsActions,
    IContractsAddSpec, IContractsDeploy, IContractsInstanceSetValidity,
    IContractsNew, IContractsRemove,
    IContractsRemoveSpec,
    IContractsReset, IContractsSend, IContractsSetWeb3Instance
} from './actionTypes';
import { alias_checker }             from '../../utils/alias_checker';
import { address_checker }           from '../../utils/address_checker';
import { NewContractInfos, TxInfos } from '../../state/txs';

export const ContractsSetWeb3Instance = (contract_name: string, contract_address: string, clear: boolean): IContractsSetWeb3Instance => ({
    type: ContractsActions.ContractsSetWeb3Instance,
    contract_name,
    contract_address,
    clear
});

export const ContractsDeploy = (contract: NewContractInfos, tx_infos: Partial<TxInfos>, args: any[], id: number): IContractsDeploy => ({
    type: ContractsActions.ContractsDeploy,
    contract,
    tx_infos,
    args,
    id
});

export const ContractsSend = (call: () => Promise<string>, id: number, method: string, args: any[], contract: string, address: string): IContractsSend => ({
    type: ContractsActions.ContractsSend,
    call,
    id,
    method,
    args,
    contract,
    address: address_checker(address)
});

export const ContractsAddSpec = (name: string, abi: any, options?: { bin?: string, permanent?: boolean, constructor_bin?: string }): IContractsAddSpec => ({
    type: ContractsActions.ContractsAddSpec,
    name,
    abi,
    bin: options ? options.bin : null,
    constructor_bin: options ? options.constructor_bin : null,
    permanent: options ? !!options.permanent : false
});

export const ContractsRemoveSpec = (name: string): IContractsRemoveSpec => ({
    type: ContractsActions.ContractsRemoveSpec,
    name
});

export const ContractsNew = (contract: string, address: string, options?: { alias?: string, permanent?: boolean, balance?: boolean }): IContractsNew => ({
    type: ContractsActions.ContractsNew,
    contract,
    address: address_checker(address),
    alias: options ? alias_checker(options.alias) : null,
    permanent: options ? options.permanent : false,
    balance: options ? options.balance : false
});

export const ContractsReset = (): IContractsReset => ({
    type: ContractsActions.ContractsReset
});

export const ContractsRemove = (contract: string, address_or_alias: string): IContractsRemove => ({
    type: ContractsActions.ContractsRemove,
    contract,
    address_or_alias: address_checker(address_or_alias)
});

export const ContractsInstanceSetValidity = (contract_name: string, contract_address: string, validity: boolean): IContractsInstanceSetValidity => ({
    type: ContractsActions.ContractsInstanceSetValidity,
    contract_name,
    contract_address,
    validity
});
