import { Dispatch } from 'redux';
import { NewContractInfos, TxInfos } from '../../state/txs';
/**
 * @description This method loads a contract specification. Required before creating instances.
 * @param dispatch
 * @param name
 * @param abi
 * @param options If bin is provided, will be checked against network value. If permanent is true, will remain in store even after reset
 */
export declare const loadContractSpec: (dispatch: Dispatch<import("redux").AnyAction>, name: string, abi: any, options?: {
    bin?: string;
    permanent?: boolean;
    constructor_bin?: string;
}) => void;
/**
 * @description Removes the specified contract specification
 * @param dispatch
 * @param name
 */
export declare const removeContractSpec: (dispatch: Dispatch<import("redux").AnyAction>, name: string) => void;
/**
 * @description Loads a contract instance by using the appropriate specification
 * @param dispatch
 * @param name Name of the specification to use
 * @param address
 * @param options If alias is provided, creates a new alias for this specific contract/address. If permanent is true, will remain in store event after reset. If balance is true, will add address to accounts
 */
export declare const loadContractInstance: (dispatch: Dispatch<import("redux").AnyAction>, name: string, address: string, options?: {
    alias?: string;
    permanent?: boolean;
    balance?: boolean;
}) => void;
/**
 * @description Remove specified contract instance
 * @param dispatch
 * @param name
 * @param address_or_alias
 */
export declare const removeContractInstance: (dispatch: Dispatch<import("redux").AnyAction>, name: string, address_or_alias: string) => void;
/**
 * @description Deploys a contract (if contract spec contains bin only)
 * @param dispatch
 * @param contract
 * @param tx
 * @param args
 */
export declare const deployContract: (dispatch: Dispatch<import("redux").AnyAction>, contract: NewContractInfos, tx: Partial<TxInfos>, args: any[]) => number;
