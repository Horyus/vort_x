import {
    ITxAdd,
    ITxError,
    ITxFollow,
    ITxContractCreation,
    ITxRemove,
    ITxReset,
    ITxSend,
    ITxSet,
    TxActions
}                                    from './actionTypes';
import { NewContractInfos, TxInfos } from '../../state/txs';
import { tx_hash_checker }           from '../../utils/tx_hash_checker';
import { format_txinfos }            from '../../utils/format_txinfos';

export const TxAdd = (tx_hash: string, tx_infos: Partial<TxInfos>, tx_id?: number, contract?: NewContractInfos): ITxAdd => ({
    type: TxActions.TxAdd,
    tx_hash: tx_hash_checker(tx_hash),
    tx_infos: format_txinfos(tx_infos),
    tx_id,
    contract
});

export const TxRemove = (tx_hash: string): ITxRemove => ({
    type: TxActions.TxRemove,
    tx_hash: tx_hash_checker(tx_hash)
});

export const TxSet = (tx_hash: string, tx_infos: Partial<TxInfos>, status?: string, contract_address?: string): ITxSet => ({
    type: TxActions.TxSet,
    tx_hash: tx_hash_checker(tx_hash),
    tx_infos: format_txinfos(tx_infos),
    status,
    contract_address
});

export const TxError = (tx_hash: string, e: Error): ITxError => ({
    type: TxActions.TxError,
    tx_hash: tx_hash_checker(tx_hash),
    e
});

export const TxSend = (tx_infos: Partial<TxInfos>, tx_id?: number): ITxSend => ({
    type: TxActions.TxSend,
    tx_infos: format_txinfos(tx_infos),
    tx_id
});

export const TxContractCreation = (tx_infos: Partial<TxInfos>, contract: NewContractInfos, tx_id?: number): ITxContractCreation => ({
    type: TxActions.TxContractCreation,
    tx_infos: format_txinfos(tx_infos),
    tx_id,
    contract
});

export const TxReset = (): ITxReset => ({
    type: TxActions.TxReset
});

export const TxFollow = (tx_hash: string, tx_id?: number): ITxFollow => ({
    type: TxActions.TxFollow,
    tx_hash: tx_hash_checker(tx_hash),
    tx_id
});
