import { VtxeventsSection } from '../../state/vtxevents';
import { Action }           from 'redux';

export const VtxeventsActions = {
    VtxeventsAdd: '[VTX][VTXEVENTS] ADD'
};

export interface IVtxeventsAdd extends Action<string> {
    event: VtxeventsSection;
}

export type VtxeventsActionTypes = IVtxeventsAdd;
