import Web3 = require('web3');

export enum VtxStatus {
    Loading = 0,
    Authorizing,
    Idle,
    Loaded,
    WrongNet,
    Error,
    Unauthorized
}

export interface VtxResetStatus {
    txs: boolean;
    blocks: boolean;
    vtxcache: boolean;
    contracts: boolean;
    vtxconfig: boolean;
    accounts: boolean;
}

export interface VtxconfigAllowedNetworks {
    [key: number]: string;
}

export interface VtxconfigSection {
    web3: Web3;
    last_error: Error;
    status: VtxStatus;
    reset_status: VtxResetStatus;
    poll_timer: number;
    confirmation_threshold: number;
    coinbase: string;
    net_id: number;
    allowed_nets: VtxconfigAllowedNetworks;
}
