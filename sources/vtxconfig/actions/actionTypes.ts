import { Action }    from 'redux';
import { VtxStatus } from '../../state/vtxconfig';
import Web3 = require('web3');

export const VtxconfigActions = {
    VtxconfigSetWeb3: '[VTX][VTXCONFIG] SET_WEB3',
    VtxconfigSetStatus: '[VTX][VTXCONFIG] SET_STATUS',
    VtxconfigReset: '[VTX][VTXCONFIG] RESET',
    VtxconfigResetSectionComplete: '[VTX][VTXCONFIG] RESET_SECTION_COMPLETE',
    VtxconfigResetComplete: '[VTX][VTXCONFIG] RESET_COMPLETE',
    VtxconfigSetInfos: '[VTX][VTXCONFIG] SET_INFOS',
    VtxconfigSetAllowedNet: `[VTX][VTXCONFIG] SET_ALLOWED_NET`
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

export type VtxconfigActionTypes =
    | IVtxconfigSetWeb3
    | IVtxconfigSetStatus
    | IVtxconfigReset
    | IVtxconfigResetSectionComplete
    | IVtxconfigResetComplete
    | IVtxconfigSetInfos
    | IVtxconfigSetAllowedNet;
