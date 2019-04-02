import {
    ContractsActions,
    IContractsAddSpec,
    IContractsNew, IContractsRemove,
    IContractsRemoveSpec,
    IContractsReset, IContractsSend
}                          from './actionTypes';
import { alias_checker }   from '../../utils/alias_checker';
import { address_checker } from '../../utils/address_checker';

export const ContractsSend = (call: () => Promise<string>, id: number, method: string, args: any[], contract: string, address: string): IContractsSend => ({
    type: ContractsActions.ContractsSend,
    call,
    id,
    method,
    args,
    contract,
    address: address_checker(address)
});

export const ContractsAddSpec = (name: string, abi: any, options?: { bin?: string, permanent?: boolean }): IContractsAddSpec => ({
    type: ContractsActions.ContractsAddSpec,
    name,
    abi,
    bin: options ? options.bin : null,
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
