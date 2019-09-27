import { Reducer }              from 'redux';
import { VtxcacheSection }      from '../../state/vtxcache';
import { IVtxcacheSetRequired } from '../actions/actionTypes';

export const VtxcacheSetRequiredReducer: Reducer<VtxcacheSection, IVtxcacheSetRequired> =
    (state: VtxcacheSection, action: IVtxcacheSetRequired): VtxcacheSection => {

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
                        required: true
                    }
                }
            }
        };

    };
