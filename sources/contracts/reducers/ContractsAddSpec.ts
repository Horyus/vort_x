import { Reducer }           from 'redux';
import { ContractsSection }  from '../../state/contracts';
import { IContractsAddSpec } from '../actions/actionTypes';

export const ContractsAddSpecReducer: Reducer<ContractsSection, IContractsAddSpec> =
    (state: ContractsSection, action: IContractsAddSpec): ContractsSection => ({
        ...state,
        specs: {
            ...state.specs,
            [action.name]: {
                name: action.name,
                abi: action.abi,
                bin: action.bin,
                permanent: action.permanent,
                constructor_bin: action.constructor_bin
            }
        },
        web3: state.web3
    });
