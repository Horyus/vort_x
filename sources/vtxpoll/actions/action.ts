import {
    IVtxpollAdd,
    IVtxpollKill,
    IVtxpollSetIntervalId,
    VtxpollActions
} from './actionTypes';
import { VtxPollCb } from '../../state/vtxpoll';

export const VtxpollSetIntervalId = (interval_id: NodeJS.Timeout): IVtxpollSetIntervalId => ({
    type: VtxpollActions.VtxpollSetIntervalId,
    interval_id
});

export const VtxpollKill = (): IVtxpollKill => ({
    type: VtxpollActions.VtxpollKill
});

export const VtxpollAdd = (name: string, interval: number, cb: VtxPollCb): IVtxpollAdd => ({
    type: VtxpollActions.VtxpollAdd,
    name,
    interval,
    cb
});
