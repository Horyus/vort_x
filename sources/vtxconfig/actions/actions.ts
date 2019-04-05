import {
    IVtxconfigReset,
    IVtxconfigResetComplete,
    IVtxconfigResetSectionComplete, IVtxconfigSetAllowedNet, IVtxconfigSetInfos,
    IVtxconfigSetStatus,
    IVtxconfigSetWeb3,
    VtxconfigActions
} from './actionTypes';
import { VtxStatus } from '../../state/vtxconfig';
import Web3 = require('web3');

export const VtxconfigSetAllowedNet = (net_id: number, genesis_hash: string): IVtxconfigSetAllowedNet => ({
    type: VtxconfigActions.VtxconfigSetAllowedNet,
    net_id,
    genesis_hash
});

export const VtxconfigSetWeb3 = (web3: Web3): IVtxconfigSetWeb3 => ({
    type: VtxconfigActions.VtxconfigSetWeb3,
    web3,
});

export const VtxconfigSetStatus = (status: VtxStatus): IVtxconfigSetStatus => ({
    type: VtxconfigActions.VtxconfigSetStatus,
    status
});

export const VtxconfigReset = (enable?: () => Promise<void>): IVtxconfigReset => ({
    type: VtxconfigActions.VtxconfigReset,
    enable
});

export const VtxconfigResetSectionComplete = (section: 'txs' | 'blocks' | 'vtxcache' | 'contracts' | 'vtxconfig' | 'accounts'): IVtxconfigResetSectionComplete => ({
    type: VtxconfigActions.VtxconfigResetSectionComplete,
    section
});

export const VtxconfigResetComplete = (): IVtxconfigResetComplete => ({
    type: VtxconfigActions.VtxconfigResetComplete
});

export const VtxconfigSetInfos = (coinbase: string, net: number): IVtxconfigSetInfos => ({
    type: VtxconfigActions.VtxconfigSetInfos,
    coinbase,
    net
});
