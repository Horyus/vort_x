import {
    VtxeventsError,
    VtxeventsSection,
    VtxeventsTypes
}                from '../../state/vtxevents';
import { State } from '../../state';

export const getVtxEvents =
    (state: State, type: string, error_type?: string): VtxeventsSection[] => {
        if (error_type && type !== VtxeventsTypes.Error) {
            throw new Error('Cannot ask for error_type when not fetching Error Events');
        }

        let ret: VtxeventsSection[] = state.vtxevents.filter(
            (event: VtxeventsSection): boolean => event.type === type
        );

        if (type === VtxeventsTypes.Error && error_type) {
            ret = ret.filter((event: VtxeventsError): boolean => event.error_type === error_type);
        }

        return ret;
    };
