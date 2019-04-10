import { VtxpollSection }              from '../../state/vtxpoll';
import {
    IVtxpollAdd,
    IVtxpollSetIntervalId,
    VtxpollActions,
    VtxpollActionTypes
} from '../actions/actionTypes';
import { Reducer }                     from 'redux';
import { VtxpollSetIntervalIdReducer } from './VtxpollSetIntervalId';
import { InitialState }                from '../../state/index';
import { VtxpollAddReducer }           from './VtxpollAdd';

export const VtxpollReducer: Reducer<VtxpollSection, VtxpollActionTypes> =
    (state: VtxpollSection = InitialState.vtxpoll, action: VtxpollActionTypes): VtxpollSection => {
        switch (action.type) {
            case VtxpollActions.VtxpollSetIntervalId:
                return VtxpollSetIntervalIdReducer(state, action as IVtxpollSetIntervalId);
            case VtxpollActions.VtxpollAdd:
                return VtxpollAddReducer(state, action as IVtxpollAdd);
            default:
                return state;
        }
    };
