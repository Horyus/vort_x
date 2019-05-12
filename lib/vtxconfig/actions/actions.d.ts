import { Authorization, IVtxconfigAuthorizeAndSetWeb3, IVtxconfigReset, IVtxconfigResetComplete, IVtxconfigResetSectionComplete, IVtxconfigSetAllowedNet, IVtxconfigSetInfos, IVtxconfigSetStatus, IVtxconfigSetWeb3 } from './actionTypes';
export declare const VtxconfigSetAllowedNet: (net_id: number, genesis_hash: string) => IVtxconfigSetAllowedNet;
export declare const VtxconfigSetWeb3: (web3: any) => IVtxconfigSetWeb3;
export declare const VtxconfigSetStatus: (status: string) => IVtxconfigSetStatus;
export declare const VtxconfigReset: () => IVtxconfigReset;
export declare const VtxconfigResetSectionComplete: (section: "txs" | "blocks" | "vtxcache" | "contracts" | "vtxconfig" | "accounts") => IVtxconfigResetSectionComplete;
export declare const VtxconfigResetComplete: () => IVtxconfigResetComplete;
export declare const VtxconfigSetInfos: (coinbase: string, net: number) => IVtxconfigSetInfos;
export declare const VtxconfigAuthorizeAndSetWeb3: (authorization: Authorization, cb: () => void) => IVtxconfigAuthorizeAndSetWeb3;
