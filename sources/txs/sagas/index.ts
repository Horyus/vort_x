import { SagaIterator }           from 'redux-saga';
import { takeEvery }              from 'redux-saga/effects';
import { TxActions }              from '../actions/actionTypes';
import { TxSendSaga }             from './TxSend';
import { VtxconfigActions }       from '../../vtxconfig/actions/actionTypes';
import { VtxconfigResetSectionCompleteSaga }         from './VtxconfigResetSectionComplete';
import { TxFollowSaga }           from './TxFollow';
import { TxContractCreationSaga } from './TxContractCreation';

export function* TxSagas(): SagaIterator {
    yield takeEvery(TxActions.TxSend, TxSendSaga);
    yield takeEvery(TxActions.TxFollow, TxFollowSaga);
    yield takeEvery(TxActions.TxContractCreation, TxContractCreationSaga);
    yield takeEvery(VtxconfigActions.VtxconfigResetSectionComplete, VtxconfigResetSectionCompleteSaga);
}
