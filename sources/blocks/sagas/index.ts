import { SagaIterator }                      from 'redux-saga';
import { takeEvery }                         from 'redux-saga/effects';
import { BlocksActions }                     from '../actions/actionTypes';
import { BlocksFetchSaga }                   from './BlocksFetch';
import { VtxconfigActions }                  from '../../vtxconfig/actions/actionTypes';
import { VtxconfigResetSectionCompleteSaga } from './VtxconfigResetSectionComplete';

export function* BlocksSagas(): SagaIterator {
    yield takeEvery(BlocksActions.BlocksFetch, BlocksFetchSaga);
    yield takeEvery(VtxconfigActions.VtxconfigResetSectionComplete, VtxconfigResetSectionCompleteSaga);
}
