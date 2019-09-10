import { Reducer }          from 'redux';
import { ContractsSection } from '../../state/contracts';
import { IContractsNew }    from '../actions/actionTypes';
import { VtxContract }      from '../VtxContract';

export const ContractsNewReducer: Reducer<ContractsSection, IContractsNew> =
    (state: ContractsSection, action: IContractsNew): ContractsSection => {
        if (!action.alias) {
            return {
                ...state,
                instances: {
                    ...state.instances,
                    [action.contract]: {
                        ...state.instances[action.contract],
                        [action.address]: {
                            permanent: !!action.permanent,
                            valid: null
                        }
                    }
                }
            };
        }

        return {
            ...state,
            instances: {
                ...state.instances,
                [action.contract]: {
                    ...state.instances[action.contract],
                    [action.address]: {
                        permanent: !!action.permanent,
                        valid: null
                    }
                }
            },
            alias: {
                ...state.alias,
                [action.contract]: {
                    ...state.alias[action.contract],
                    [action.alias]: {
                        address: action.address,
                        permanent: action.permanent
                    }
                }
            },
        };
    };
