import { Action }                    from 'redux';
import { NewContractInfos, TxInfos } from '../../state/txs';

export const TxActions = {
    TxAdd: '[VTX][TX] ADD',
    TxRemove: '[VTX][TX] REMOVE',
    TxSet: '[VTX][TX] SET',
    TxError: '[VTX][TX] ERROR',
    TxSend: '[VTX][TX] SEND',
    TxContractCreation: '[VTX][TX] CONTRACT CREATION',
    TxReset: '[VTX][TX] RESET',
    TxFollow: '[VTX][TX] FOLLOW'
};

export interface ITxAdd extends Action<string> {
    tx_hash: string;
    tx_infos: Partial<TxInfos>;
    tx_id?: number;
    contract?: NewContractInfos;
}

export interface ITxRemove extends Action<string> {
    tx_hash: string;
}

export interface ITxSet extends Action<string> {
    tx_hash: string;
    tx_infos: Partial<TxInfos>;
    status?: string;
    contract_address?: string;
}

export interface ITxError extends Action<string> {
    tx_hash: string;
    e: Error;
}

export interface ITxSend extends Action<string> {
    tx_infos: Partial<TxInfos>;
    tx_id?: number;
}

export interface ITxContractCreation extends ITxSend {
    contract: NewContractInfos;
}

export interface ITxFollow extends Action<string> {
    tx_hash: string;
    tx_id?: number;
}

export interface ITxReset extends Action<string> {
}

export type TxActionTypes =
    | ITxAdd
    | ITxRemove
    | ITxSet
    | ITxError
    | ITxSend
    | ITxReset
    | ITxFollow
    | ITxContractCreation;
