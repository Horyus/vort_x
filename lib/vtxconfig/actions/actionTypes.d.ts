import { Action } from 'redux';
import { VtxStatus } from '../../state/vtxconfig';
export declare const VtxconfigActions: {
    VtxconfigSetWeb3: string;
    VtxconfigSetStatus: string;
    VtxconfigReset: string;
    VtxconfigResetSectionComplete: string;
    VtxconfigResetComplete: string;
    VtxconfigSetInfos: string;
    VtxconfigSetAllowedNet: string;
};
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
    status: VtxStatus;
}
export interface IVtxconfigReset extends Action<string> {
    enable?: () => Promise<void>;
}
export interface IVtxconfigResetSectionComplete extends Action<string> {
    section: string;
}
export interface IVtxconfigResetComplete extends Action<string> {
}
export declare type VtxconfigActionTypes = IVtxconfigSetWeb3 | IVtxconfigSetStatus | IVtxconfigReset | IVtxconfigResetSectionComplete | IVtxconfigResetComplete | IVtxconfigSetInfos | IVtxconfigSetAllowedNet;
