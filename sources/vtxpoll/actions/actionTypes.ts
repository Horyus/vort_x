import { Action } from 'redux';

export const VtxpollActions = {
    VtxpollSetIntervalId: '[VTX][VTXPOLL] SET_INTERVAL_ID',
    VtxpollKill: '[VTX][VTXPOLL] KILL'
};

export interface IVtxpollSetIntervalId extends Action<string> {
    interval_id: NodeJS.Timeout;
}

export interface IVtxpollKill extends Action<string> {
}

export type VtxpollActionTypes =
    | IVtxpollSetIntervalId
    | IVtxpollKill;
