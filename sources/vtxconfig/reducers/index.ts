import { Reducer }                              from 'redux';
import {
    IVtxconfigReset,
    IVtxconfigResetComplete,
    IVtxconfigResetSectionComplete, IVtxconfigSetAllowedNet, IVtxconfigSetInfos,
    IVtxconfigSetStatus,
    IVtxconfigSetWeb3,
    VtxconfigActions,
    VtxconfigActionTypes
} from '../actions/actionTypes';
import { VtxconfigSection, VtxStatus }          from '../../state/vtxconfig';
import { VtxconfigSetWeb3Reducer }              from './VtxconfigSetWeb3';
import { VtxconfigSetStatusReducer }            from './VtxconfigSetStatus';
import { VtxconfigResetSectionCompleteReducer } from './VtxconfigResetSectionComplete';
import { VtxconfigResetCompleteReducer }        from './VtxconfigResetComplete';
import { VtxconfigSetInfosReducer }             from './VtxconfigSetInfos';
import { VtxconfigResetReducer }                from './VtxconfigReset';
import { InitialState }                         from '../../state/index';
import { VtxconfigSetAllowedNetReducer }        from './VtxconfigSetAllowedNet';

export const VtxconfigReducer: Reducer<VtxconfigSection, VtxconfigActionTypes> =
    (state: VtxconfigSection = InitialState.vtxconfig, action: VtxconfigActionTypes): VtxconfigSection => {
        switch (action.type) {
            case VtxconfigActions.VtxconfigSetWeb3:
                return VtxconfigSetWeb3Reducer(state, action as IVtxconfigSetWeb3);
            case VtxconfigActions.VtxconfigSetStatus:
                return VtxconfigSetStatusReducer(state, action as IVtxconfigSetStatus);
            case VtxconfigActions.VtxconfigResetSectionComplete:
                return VtxconfigResetSectionCompleteReducer(state, action as IVtxconfigResetSectionComplete);
            case VtxconfigActions.VtxconfigResetComplete:
                return VtxconfigResetCompleteReducer(state, action as IVtxconfigResetComplete);
            case VtxconfigActions.VtxconfigSetInfos:
                return VtxconfigSetInfosReducer(state, action as IVtxconfigSetInfos);
            case VtxconfigActions.VtxconfigReset:
                return VtxconfigResetReducer(state, action as IVtxconfigReset);
            case VtxconfigActions.VtxconfigSetAllowedNet:
                return VtxconfigSetAllowedNetReducer(state, action as IVtxconfigSetAllowedNet);
            default:
                return state;
        }
    };
