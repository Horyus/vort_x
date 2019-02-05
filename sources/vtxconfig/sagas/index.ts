import { SagaIterator }                  from 'redux-saga';
import { takeEvery }                     from 'redux-saga/effects';
import { VtxconfigActions }              from '../actions/actionTypes';
import { VtxconfigSetWeb3Saga }          from './VtxconfigSetWeb3';
import { VtxconfigResetSectionComplete } from './VtxconfigResetSectionComplete';

export function* VtxconfigSagas(): SagaIterator {
    yield takeEvery(VtxconfigActions.VtxconfigSetWeb3, VtxconfigSetWeb3Saga);
    yield takeEvery(VtxconfigActions.VtxconfigResetSectionComplete, VtxconfigResetSectionComplete);
}
