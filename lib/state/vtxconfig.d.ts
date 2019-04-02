export declare enum VtxStatus {
    Loading = 0,
    Authorizing = 1,
    Idle = 2,
    Loaded = 3,
    WrongNet = 4,
    Error = 5,
    Unauthorized = 6
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
