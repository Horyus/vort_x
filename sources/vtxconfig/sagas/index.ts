import { SagaIterator }                     from 'redux-saga';
import { takeEvery }                        from 'redux-saga/effects';
import { VtxconfigActions }                 from '../actions/actionTypes';
import { VtxconfigResetSectionComplete }    from './VtxconfigResetSectionComplete';
import { VtxconfigResetSaga }               from './VtxconfigReset';
import { VtxconfigAuthorizeAndSetWeb3Saga } from './VtxconfigAuthorizeAndSetWeb3';

export function* VtxconfigSagas(): SagaIterator {
    yield takeEvery(VtxconfigActions.VtxconfigResetSectionComplete, VtxconfigResetSectionComplete);
    yield takeEvery(VtxconfigActions.VtxconfigReset, VtxconfigResetSaga);
    yield takeEvery(VtxconfigActions.VtxconfigAuthorizeAndSetWeb3, VtxconfigAuthorizeAndSetWeb3Saga);
}
