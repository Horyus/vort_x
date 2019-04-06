export const VtxeventsTypes: {[key: string]: string} = {
    Error: 'Error',

    TxBroadcasted: 'TxBroadcasted',
    TxFollowed: 'TxFollowed',
    TxConfirmed: 'TxConfirmed',
    TxError: 'TxError',
    TxInvalid: 'TxInvalid',

    ContractsSpecAdded: 'ContractsSpecAdded',
    ContractsSpecRemoved: 'ContractsSpecRemoved',
    ContractsInstanceAdded: 'ContractsInstanceAdded',
    ContractsInstanceRemoved: 'ContractsInstanceRemoved',
    ContractsTxBroadcasted: 'ContractsTxBroadcasted'
};

export interface Vtxevent {
    type: string;
}

export const VtxeventErrorTypes: {[key: string]: string} = {
    TxBroadcastError: 'TxBroadcastError',
    TxFollowError: 'TxFollowError',
    BlockFetchError: 'BlockFetchError',
    ContractInvalid: 'ContractInvalid',
    ContractTxError: 'ContractTxError',
    TxFetchError: 'TxFetchError'

};

export interface VtxeventsError extends Vtxevent {
    e: Error;
    error_type: string;
}

export interface VtxeventsTxBroadcasted extends Vtxevent {
    tx_hash: string;
}

export type VtxeventsTxAdded = VtxeventsTxBroadcasted;
export type VtxeventsTxConfirmed = VtxeventsTxBroadcasted;
export type VtxeventsTxError = VtxeventsTxBroadcasted;
export type VtxeventsTxInvalid = VtxeventsTxBroadcasted;

export interface VtxeventsContractsSpecAdded extends Vtxevent {
    name: string;
}

export type VtxeventsContractsSpecRemoved = VtxeventsContractsSpecAdded;

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

export type VtxeventsContractsInstanceRemove = VtxeventsContractsInstanceAdded;

export type VtxeventsSection = Vtxevent;
