export declare const VtxeventsTypes: {
    [key: string]: string;
};
export interface Vtxevent {
    type: string;
}
export declare const VtxeventErrorTypes: {
    [key: string]: string;
};
export interface VtxeventsError extends Vtxevent {
    e: Error;
    error_type: string;
}
export interface VtxeventsTxBroadcasted extends Vtxevent {
    tx_hash: string;
}
export declare type VtxeventsTxAdded = VtxeventsTxBroadcasted;
export declare type VtxeventsTxConfirmed = VtxeventsTxBroadcasted;
export declare type VtxeventsTxError = VtxeventsTxBroadcasted;
export declare type VtxeventsTxInvalid = VtxeventsTxBroadcasted;
export interface VtxeventsContractsSpecAdded extends Vtxevent {
    name: string;
}
export declare type VtxeventsContractsSpecRemoved = VtxeventsContractsSpecAdded;
export interface VtxeventsContractsInstanceAdded extends Vtxevent {
    contract: string;
    address: string;
}
export interface VtxeventsContractsTxBroadcasted extends Vtxevent {
    contract: string;
    address: string;
    method: string;
    args: any[];
    tx_hash: string;
}
export declare type VtxeventsContractsInstanceRemove = VtxeventsContractsInstanceAdded;
export declare type VtxeventsSection = Vtxevent;
