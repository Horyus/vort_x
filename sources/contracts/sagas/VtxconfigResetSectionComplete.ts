import { IVtxconfigResetSectionComplete }                                         from '../../vtxconfig/actions/actionTypes';
import { SagaIterator }                                                           from 'redux-saga';
import { call, put, select }                                                      from 'redux-saga/effects';
import { ContractsInstanceSetValidity, ContractsReset, ContractsSetWeb3Instance } from '../actions/actions';
import { VtxconfigResetSectionComplete, VtxconfigSetStatus }                      from '../../vtxconfig/actions/actions';
import { State }                                                                  from '../../state/index';
import { check_code_at }                                                          from '../../utils/check_code_at';
import { VtxStatus }                                                              from '../../state';

function* ValidateInstances(): SagaIterator {
    const state: State = yield select();

    for (const contract of Object.keys(state.contracts.instances)) {
        for (const instance of Object.keys(state.contracts.instances[contract])) {
            const spec = state.contracts.specs[contract];
            const valid = yield call(check_code_at, state.vtxconfig.web3, instance, spec.bin);
            if (!valid) {
                yield put(VtxconfigSetStatus(VtxStatus.WrongNet));
                return ;
            }
            yield put(ContractsInstanceSetValidity(contract, instance, valid));
        }
    }

    yield put(VtxconfigResetSectionComplete('contracts'));

}

function* BuildWeb3Instances(clear: boolean): SagaIterator {
    const state: State = yield select();

    for (const contract of Object.keys(state.contracts.instances)) {
        for (const instance of Object.keys(state.contracts.instances[contract])) {
            yield put(ContractsSetWeb3Instance(contract, instance, clear));
        }
    }

}

export function* VtxconfigResetSectionCompleteSaga(action: IVtxconfigResetSectionComplete): SagaIterator {

    if (action.section === 'vtxconfig') {
        const state: State = yield select();

        const clear: boolean = state.vtxconfig.web3 === null;

        if (!clear) {
            yield put(ContractsReset());
        }

        yield call(BuildWeb3Instances, clear);
        yield call(ValidateInstances);
    }
}
