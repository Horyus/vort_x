/// <reference types="node" />
import { Action } from 'redux';
import { VtxPollCb } from '../../state/vtxpoll';
export declare const VtxpollActions: {
    VtxpollSetIntervalId: string;
    VtxpollKill: string;
    VtxpollAdd: string;
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
export declare type VtxpollActionTypes = IVtxpollSetIntervalId | IVtxpollKill | IVtxpollAdd;
