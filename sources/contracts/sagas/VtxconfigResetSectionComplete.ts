import { IVtxconfigResetSectionComplete }                    from '../../vtxconfig/actions/actionTypes';
import { SagaIterator }                                      from 'redux-saga';
import { call, put, select }                                 from 'redux-saga/effects';
import { ContractsReset }                                    from '../actions/actions';
import { VtxconfigResetSectionComplete, VtxconfigSetStatus } from '../../vtxconfig/actions/actions';
import { State }                                             from '../../state/index';
import { VtxStatus }                                         from '../../state/vtxconfig';

function* ValidateInstances(): SagaIterator {
    const state: State = yield select();

    for (const contract of Object.keys(state.contracts.instances)) {
        for (const instance of Object.keys(state.contracts.instances[contract])) {
            try {
                yield call(state.contracts.instances[contract][instance].instance.valid);
            } catch (e) {
                yield put(VtxconfigSetStatus(VtxStatus.WrongNet));
                return;
            }
        }
    }

    yield put(VtxconfigResetSectionComplete('contracts'));

}

export function* VtxconfigResetSectionCompleteSaga(action: IVtxconfigResetSectionComplete): SagaIterator {

    if (action.section === 'vtxconfig') {
        const state: State = yield select();

        const clear: boolean = state.vtxconfig.web3 === null;

        if (!clear) {
            yield put(ContractsReset());
        }

        yield call(ValidateInstances);
    }
}
