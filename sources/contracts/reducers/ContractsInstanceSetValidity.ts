import { Reducer }                       from 'redux';
import { ContractsSection }              from '../../state/contracts';
import { IContractsInstanceSetValidity } from '../actions/actionTypes';

export const ContractsInstanceSetValidity: Reducer<ContractsSection, IContractsInstanceSetValidity> =
    (state: ContractsSection, action: IContractsInstanceSetValidity): ContractsSection => {
        if (state.instances[action.contract_name] && state.instances[action.contract_name][action.contract_address]) {
            return {
                ...state,
                instances: {
                    ...state.instances,
                    [action.contract_name]: {
                        ...state.instances[action.contract_name],
                        [action.contract_address]: {
                            ...state.instances[action.contract_name][action.contract_address],
                            valid: action.validity
                        }
                    }
                },
            };
        } else {
            return state;
        }
    };
