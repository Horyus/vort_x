import { SagaIterator }                      from 'redux-saga';
import { takeEvery }                         from 'redux-saga/effects';
import { VtxconfigActions }                  from '../../vtxconfig/actions/actionTypes';
import { VtxconfigResetSectionCompleteSaga } from './VtxconfigResetSectionComplete';

export function* VtxcacheSagas(): SagaIterator {
    yield takeEvery(VtxconfigActions.VtxconfigResetSectionComplete, VtxconfigResetSectionCompleteSaga);
}
