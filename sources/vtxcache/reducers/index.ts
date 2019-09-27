import { Reducer }                    from 'redux';
import { VtxcacheSection }            from '../../state/vtxcache';
import {
    IVtxcacheClear,
    IVtxcacheCreate, IVtxcacheReset,
    IVtxcacheSetData, IVtxcacheSetError,
    IVtxcacheSetRequired,
    VtxcacheActions,
    VtxcacheActionTypes
}                                     from '../actions/actionTypes';
import { VtxcacheSetRequiredReducer } from './VtxcacheSetRequired';
import { VtxcacheSetDataReducer }     from './VtxcacheSetData';
import { VtxcacheCreateReducer }      from './VtxcacheCreate';
import { VtxcacheSetErrorReducer }    from './VtxcacheSetError';
import { VtxcacheResetReducer }       from './VtxcacheReset';
import { VtxcacheClearReducer }       from './VtxcacheClear';
import { InitialState }               from '../../state/index';

export const VtxcacheReducer: Reducer<VtxcacheSection, VtxcacheActionTypes> =
    (state: VtxcacheSection = InitialState.vtxcache, action: VtxcacheActionTypes): VtxcacheSection => {
        switch (action.type) {
            case VtxcacheActions.VtxcacheSetRequired:
                return VtxcacheSetRequiredReducer(state, action as IVtxcacheSetRequired);
            case VtxcacheActions.VtxcacheSetData:
                return VtxcacheSetDataReducer(state, action as IVtxcacheSetData);
            case VtxcacheActions.VtxcacheSetError:
                return VtxcacheSetErrorReducer(state, action as IVtxcacheSetError);
            case VtxcacheActions.VtxcacheCreate:
                return VtxcacheCreateReducer(state, action as IVtxcacheCreate);
            case VtxcacheActions.VtxcacheReset:
                return VtxcacheResetReducer(state, action as IVtxcacheReset);
            case VtxcacheActions.VtxcacheClear:
                return VtxcacheClearReducer(state, action as IVtxcacheClear);
            default:
                return state;
        }
    };
