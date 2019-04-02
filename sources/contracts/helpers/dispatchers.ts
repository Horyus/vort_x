import { Dispatch }                                                             from 'redux';
import { ContractsAddSpec, ContractsNew, ContractsRemove, ContractsRemoveSpec } from '../actions/actions';
import { VtxContract }                                                          from '../VtxContract';

/**
 * @description This method loads a contract specification. Required before creating instances.
 * @param dispatch
 * @param name
 * @param abi
 * @param options If bin is provided, will be checked against network value. If permanent is true, will remain in store even after reset
 */
export const loadContractSpec = (dispatch: Dispatch, name: string, abi: any, options?: { bin?: string, permanent?: boolean }): void => {
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
