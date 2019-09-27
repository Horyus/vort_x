import { Reducer }                             from 'redux';
import { VtxcacheSection }                     from '../../state/vtxcache';
import { IVtxcacheSetData, IVtxcacheSetError } from '../actions/actionTypes';

export const VtxcacheSetErrorReducer: Reducer<VtxcacheSection, IVtxcacheSetError> =
    (state: VtxcacheSection, action: IVtxcacheSetError): VtxcacheSection => {

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
                        error: action.error,
                        block: action.block,
                        required: false
                    }
                }
            }
        };

    };
