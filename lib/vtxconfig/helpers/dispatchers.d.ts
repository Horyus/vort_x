import { Dispatch } from 'redux';
import { Authorization } from '../actions/actionTypes';
export declare const init: (dispatch: Dispatch<import("redux").AnyAction>, web3: any) => void;
export declare const authorizeAndSetWeb3: (dispatch: Dispatch<import("redux").AnyAction>, authorization: Authorization) => Promise<void>;
export declare const setWeb3: (dispatch: Dispatch<import("redux").AnyAction>, web3: any) => void;
export declare const reset: (dispatch: Dispatch<import("redux").AnyAction>) => void;
export declare const start: (dispatch: Dispatch<import("redux").AnyAction>) => void;
export declare const setAllowedNet: (dispatch: Dispatch<import("redux").AnyAction>, net_id: number, genesis_hash: string) => void;
