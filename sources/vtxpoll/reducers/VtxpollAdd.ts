import { Reducer }        from 'redux';
import { VtxpollSection } from '../../state/vtxpoll';
import { IVtxpollAdd }    from '../actions/actionTypes';

export const VtxpollAddReducer: Reducer<VtxpollSection, IVtxpollAdd> =
    (state: VtxpollSection, action: IVtxpollAdd): VtxpollSection => ({
        ...state,
        actions: [
            ...state.actions,
            {
                name: action.name,
                interval: action.interval,
                cb: action.cb
            }
        ]
    });
