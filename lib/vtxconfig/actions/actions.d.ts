import { IVtxconfigReset, IVtxconfigResetComplete, IVtxconfigResetSectionComplete, IVtxconfigSetAllowedNet, IVtxconfigSetInfos, IVtxconfigSetStatus, IVtxconfigSetWeb3 } from './actionTypes';
import { VtxStatus } from '../../state/vtxconfig';
export declare const VtxconfigSetAllowedNet: (net_id: number, genesis_hash: string) => IVtxconfigSetAllowedNet;
export declare const VtxconfigSetWeb3: (web3: any) => IVtxconfigSetWeb3;
export declare const VtxconfigSetStatus: (status: VtxStatus) => IVtxconfigSetStatus;
export declare const VtxconfigReset: (enable?: () => Promise<void>) => IVtxconfigReset;
export declare const VtxconfigResetSectionComplete: (section: "txs" | "blocks" | "vtxcache" | "contracts" | "vtxconfig" | "accounts") => IVtxconfigResetSectionComplete;
export declare const VtxconfigResetComplete: () => IVtxconfigResetComplete;
export declare const VtxconfigSetInfos: (coinbase: string, net: number) => IVtxconfigSetInfos;
