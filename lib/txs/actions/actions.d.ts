import { ITxAdd, ITxError, ITxFollow, ITxRemove, ITxReset, ITxSend, ITxSet } from './actionTypes';
import { TxInfos } from '../../state/txs';
export declare const TxAdd: (tx_hash: string, tx_infos: Partial<TxInfos>, tx_id?: number) => ITxAdd;
export declare const TxRemove: (tx_hash: string) => ITxRemove;
export declare const TxSet: (tx_hash: string, tx_infos: Partial<TxInfos>, status?: string) => ITxSet;
export declare const TxError: (tx_hash: string, e: Error) => ITxError;
export declare const TxSend: (tx_infos: Partial<TxInfos>, tx_id?: number) => ITxSend;
export declare const TxReset: () => ITxReset;
export declare const TxFollow: (tx_hash: string, tx_id?: number) => ITxFollow;
