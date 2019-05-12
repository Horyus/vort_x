import { Action } from 'redux';
export declare const VtxconfigActions: {
    VtxconfigSetWeb3: string;
    VtxconfigSetStatus: string;
    VtxconfigReset: string;
    VtxconfigResetSectionComplete: string;
    VtxconfigResetComplete: string;
    VtxconfigSetInfos: string;
    VtxconfigSetAllowedNet: string;
    VtxconfigAuthorizeAndSetWeb3: string;
};
export interface Authorization {
    enable: () => Promise<void>;
    web3: () => Promise<Web3>;
}
export interface IVtxconfigAuthorizeAndSetWeb3 extends Action<string> {
    authorization: Authorization;
    cb: () => void;
}
export interface IVtxconfigSetAllowedNet extends Action<string> {
    net_id: number;
    genesis_hash: string;
}
export interface IVtxconfigSetInfos extends Action<string> {
    coinbase: string;
    net: number;
}
export interface IVtxconfigSetWeb3 extends Action<string> {
    web3: Web3;
}
export interface IVtxconfigSetStatus extends Action<string> {
    status: string;
}
export interface IVtxconfigReset extends Action<string> {
}
export interface IVtxconfigResetSectionComplete extends Action<string> {
    section: string;
}
export interface IVtxconfigResetComplete extends Action<string> {
}
export declare type VtxconfigActionTypes = IVtxconfigSetWeb3 | IVtxconfigSetStatus | IVtxconfigReset | IVtxconfigResetSectionComplete | IVtxconfigResetComplete | IVtxconfigSetInfos | IVtxconfigSetAllowedNet;
