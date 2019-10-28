import { Reducer }                                  from 'redux';
import { ContractsSection }                         from '../../state/contracts';
import { IContractsNew, IContractsSetWeb3Instance } from '../actions/actionTypes';

export const ContractsSetWeb3Instance: Reducer<ContractsSection, IContractsSetWeb3Instance> =
    (state: ContractsSection, action: IContractsSetWeb3Instance): ContractsSection => {

        const spec = state.specs[action.contract_name];
        const web3 = state.web3;

        if (action.clear) {

            return {
                ...state,
                instances: {
                    ...state.instances,
                    [action.contract_name]: {
                        ...state.instances[action.contract_name],
                        [action.contract_address]: {
                            ...state.instances[action.contract_name][action.contract_address],
                            web3_instance: null
                        }
                    }
                }
            };

        }
        return {
            ...state,
            instances: {
                ...state.instances,
                [action.contract_name]: {
                    ...state.instances[action.contract_name],
                    [action.contract_address]: {
                        ...state.instances[action.contract_name][action.contract_address],
                        web3_instance: web3 ? new web3.eth.Contract(spec.abi, action.contract_address) : null
                    }
                }
            }
        };
    };
