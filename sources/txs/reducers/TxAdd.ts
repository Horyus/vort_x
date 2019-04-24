import { Reducer }             from 'redux';
import { TxSection, TxStatus } from '../../state/txs';
import { ITxAdd }              from '../actions/actionTypes';

export const TxAddReducer: Reducer<TxSection, ITxAdd> = (state: TxSection, action: ITxAdd): TxSection => ({
    ...state,
    [action.tx_hash]: {
        infos: {
            ...action.tx_infos
        },
        status: TxStatus.Unknown,
        hash: action.tx_hash,
        id: action.tx_id,
        e: null,
        new_contract: action.contract
    }
});
