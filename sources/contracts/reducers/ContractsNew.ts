import { Reducer }          from 'redux';
import { ContractsSection } from '../../state/contracts';
import { IContractsNew }    from '../actions/actionTypes';

export const ContractsNewReducer: Reducer<ContractsSection, IContractsNew> =
    (state: ContractsSection, action: IContractsNew): ContractsSection => {

        const spec = state.specs[action.contract];
        const web3 = state.web3;

        if (!action.alias) {
            return {
                ...state,
                instances: {
                    ...state.instances,
                    [action.contract]: {
                        ...state.instances[action.contract],
                        [action.address]: {
                            permanent: !!action.permanent,
                            valid: null,
                            web3_instance: web3 ? new web3.eth.Contract(spec.abi, action.address) : null
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
                        valid: null,
                        web3_instance: web3 ? new web3.eth.Contract(spec.abi, action.address) : null
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
