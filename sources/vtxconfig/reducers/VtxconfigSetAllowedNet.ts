import { Reducer }                 from 'redux';
import { VtxconfigSection }        from '../../state/vtxconfig';
import { IVtxconfigSetAllowedNet } from '../actions/actionTypes';

export const VtxconfigSetAllowedNetReducer: Reducer<VtxconfigSection, IVtxconfigSetAllowedNet> =
    (state: VtxconfigSection, action: IVtxconfigSetAllowedNet): VtxconfigSection =>
        ({
            ...state,
            allowed_nets: state.allowed_nets !== null
                ?
                {
                    ...state.allowed_nets,
                    [action.net_id]: action.genesis_hash
                }
                :
                {
                    [action.net_id]: action.genesis_hash
                }
        });
