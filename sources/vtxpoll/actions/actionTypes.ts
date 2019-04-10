import { Action }    from 'redux';
import { VtxPollCb } from '../../state/vtxpoll';

export const VtxpollActions = {
    VtxpollSetIntervalId: '[VTX][VTXPOLL] SET_INTERVAL_ID',
    VtxpollKill: '[VTX][VTXPOLL] KILL',
    VtxpollAdd: '[VTX][VTXPOLL] ADD'
};

export interface IVtxpollSetIntervalId extends Action<string> {
    interval_id: NodeJS.Timeout;
}

export interface IVtxpollKill extends Action<string> {
}

export interface IVtxpollAdd extends Action<string> {
    name: string;
    interval: number;
    cb: VtxPollCb;
}

export type VtxpollActionTypes =
    | IVtxpollSetIntervalId
    | IVtxpollKill
    | IVtxpollAdd;
