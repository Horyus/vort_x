import { Reducer }         from 'redux';
import { VtxcacheSection } from '../../state/vtxcache';
import { IVtxcacheCreate } from '../actions/actionTypes';

export const VtxcacheCreateReducer: Reducer<VtxcacheSection, IVtxcacheCreate> =
    (state: VtxcacheSection, action: IVtxcacheCreate): VtxcacheSection => ({
        ...state,
        store: {
            ...state.store,
            [action.entity]: {
                [action.signature]: {
                    signature: action.signature,
                    cb: action.cb,
                    block: null,
                    required: true,
                    data: undefined,
                    error: null
                }
            }
        }
    });
