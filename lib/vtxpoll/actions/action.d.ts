/// <reference types="node" />
import { IVtxpollAdd, IVtxpollKill, IVtxpollSetIntervalId } from './actionTypes';
import { VtxPollCb } from '../../state/vtxpoll';
export declare const VtxpollSetIntervalId: (interval_id: NodeJS.Timeout) => IVtxpollSetIntervalId;
export declare const VtxpollKill: () => IVtxpollKill;
export declare const VtxpollAdd: (name: string, interval: number, cb: VtxPollCb) => IVtxpollAdd;
