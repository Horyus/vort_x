import { Reducer }                    from 'redux';
import { ContractsSection }           from '../../state/contracts';
import {
    ContractsActions,
    ContractsActionTypes,
    IContractsAddSpec, IContractsInstanceSetValidity, IContractsNew, IContractsRemove,
    IContractsRemoveSpec, IContractsReset, IContractsSetWeb3Instance
} from '../actions/actionTypes';
import { ContractsAddSpecReducer }                                   from './ContractsAddSpec';
import { ContractsRemoveSoecReducer }                                from './ContractsRemoveSpec';
import { ContractsResetReducer }                                     from './ContractsReset';
import { ContractsNewReducer }                                       from './ContractsNew';
import { ContractsRemoveReducer }                                    from './ContractsRemove';
import { IVtxconfigSetWeb3, VtxconfigActions, VtxconfigActionTypes } from '../../vtxconfig/actions/actionTypes';
import { VtxconfigSetWeb3Reducer }                                   from './VtxconfigSetWeb3';
import { InitialState }                                              from '../../state/index';
import { ContractsInstanceSetValidity }                              from './ContractsInstanceSetValidity';
import { ContractsSetWeb3Instance }                                  from './ContractsSetWeb3Instance';

export const ContractsReducer: Reducer<ContractsSection, ContractsActionTypes> =
    (state: ContractsSection = InitialState.contracts, action: ContractsActionTypes | VtxconfigActionTypes): ContractsSection => {
        switch (action.type) {
            case ContractsActions.ContractsAddSpec:
                return ContractsAddSpecReducer(state, action as IContractsAddSpec);
            case ContractsActions.ContractsRemoveSpec:
                return ContractsRemoveSoecReducer(state, action as IContractsRemoveSpec);
            case ContractsActions.ContractsReset:
                return ContractsResetReducer(state, action as IContractsReset);
            case ContractsActions.ContractsNew:
                return ContractsNewReducer(state, action as IContractsNew);
            case ContractsActions.ContractsRemove:
                return ContractsRemoveReducer(state, action as IContractsRemove);
            case VtxconfigActions.VtxconfigSetWeb3:
                return VtxconfigSetWeb3Reducer(state, action as IVtxconfigSetWeb3);
            case ContractsActions.ContractsInstanceSetValidity:
                return ContractsInstanceSetValidity(state, action as IContractsInstanceSetValidity);
            case ContractsActions.ContractsSetWeb3Instance:
                return ContractsSetWeb3Instance(state, action as IContractsSetWeb3Instance);
            default:
                return state;
        }
    };
