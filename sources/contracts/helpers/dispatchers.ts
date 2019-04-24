import { Dispatch }                  from 'redux';
import {
    ContractsAddSpec,
    ContractsDeploy,
    ContractsNew,
    ContractsRemove,
    ContractsRemoveSpec
}                                    from '../actions/actions';
import { NewContractInfos, TxInfos } from '../../state/txs';
import { get_tx_id }                 from '../../utils/get_tx_id';

/**
 * @description This method loads a contract specification. Required before creating instances.
 * @param dispatch
 * @param name
 * @param abi
 * @param options If bin is provided, will be checked against network value. If permanent is true, will remain in store even after reset
 */
export const loadContractSpec = (dispatch: Dispatch, name: string, abi: any, options?: { bin?: string, permanent?: boolean, constructor_bin?: string }): void => {
    dispatch(ContractsAddSpec(name, abi, options));
};

/**
 * @description Removes the specified contract specification
 * @param dispatch
 * @param name
 */
export const removeContractSpec = (dispatch: Dispatch, name: string): void => {
    dispatch(ContractsRemoveSpec(name));
};

/**
 * @description Loads a contract instance by using the appropriate specification
 * @param dispatch
 * @param name Name of the specification to use
 * @param address
 * @param options If alias is provided, creates a new alias for this specific contract/address. If permanent is true, will remain in store event after reset. If balance is true, will add address to accounts
 */
export const loadContractInstance = (dispatch: Dispatch, name: string, address: string, options?: { alias?: string, permanent?: boolean, balance?: boolean }): void => {
    dispatch(ContractsNew(name, address, options));
};

/**
 * @description Remove specified contract instance
 * @param dispatch
 * @param name
 * @param address_or_alias
 */
export const removeContractInstance = (dispatch: Dispatch, name: string, address_or_alias: string): void => {
    dispatch(ContractsRemove(name, address_or_alias));
};

/**
 * @description Deploys a contract (if contract spec contains bin only)
 * @param dispatch
 * @param contract
 * @param tx
 * @param args
 */
export const deployContract = (dispatch: Dispatch, contract: NewContractInfos, tx: Partial<TxInfos>, args: any[]): number => {
    const tx_id = get_tx_id();
    dispatch(ContractsDeploy(contract, tx, args, tx_id));
    return tx_id;
};
