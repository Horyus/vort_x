import { Reducer }   from 'redux';
import { TxSection } from '../../state/txs';
import { ITxSet }    from '../actions/actionTypes';

export const TxSetReducer: Reducer<TxSection, ITxSet> = (state: TxSection, action: ITxSet): TxSection =>
    action.status
        ? {
            ...state,
            [action.tx_hash]: {
                ...state[action.tx_hash],
                infos: {
                    ...state[action.tx_hash].infos,
                    ...action.tx_infos
                },
                status: action.status,
                contract_address: action.contract_address ? action.contract_address : state[action.tx_hash].contract_address
            }
        }
        : {
            ...state,
            [action.tx_hash]: {
                ...state[action.tx_hash],
                infos: {
                    ...state[action.tx_hash].infos,
                    ...action.tx_infos
                },
                contract_address: action.contract_address ? action.contract_address : state[action.tx_hash].contract_address
            }
        };
