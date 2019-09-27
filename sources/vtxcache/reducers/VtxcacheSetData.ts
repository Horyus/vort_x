import { Reducer }          from 'redux';
import { VtxcacheSection }  from '../../state/vtxcache';
import { IVtxcacheSetData } from '../actions/actionTypes';

export const VtxcacheSetDataReducer: Reducer<VtxcacheSection, IVtxcacheSetData> =
    (state: VtxcacheSection, action: IVtxcacheSetData): VtxcacheSection => {

        if (!state.store[action.entity]) {
            return {
                ...state
            };
        }

        return {
            ...state,
            store: {
                ...state.store,
                [action.entity]: {
                    [action.signature]: {
                        ...state.store[action.entity][action.signature],
                        data: action.data,
                        block: action.block,
                        required: false
                    }
                }
            }
        };

    };
