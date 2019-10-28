import { Reducer }         from 'redux';
import { VtxcacheSection } from '../../state/vtxcache';
import { IVtxcacheClear }  from '../actions/actionTypes';

export const VtxcacheClearReducer: Reducer<VtxcacheSection, IVtxcacheClear> =
    (state: VtxcacheSection, action: IVtxcacheClear): VtxcacheSection => {

        if (state.store[action.entity]) {
            delete state.store[action.entity];
        }

        return {
            ...state,
        };

    };
