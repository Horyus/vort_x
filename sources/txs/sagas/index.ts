import { SagaIterator }           from 'redux-saga';
import { takeEvery }              from 'redux-saga/effects';
import { TxActions }              from '../actions/actionTypes';
import { TxSendSaga }             from './TxSend';
import { VtxconfigActions }       from '../../vtxconfig/actions/actionTypes';
import { VtxconfigReset }         from './VtxconfigReset';
import { TxFollowSaga }           from './TxFollow';
import { TxContractCreationSaga } from './TxContractCreation';

export function* TxSagas(): SagaIterator {
    yield takeEvery(TxActions.TxSend, TxSendSaga);
    yield takeEvery(TxActions.TxFollow, TxFollowSaga);
    yield takeEvery(TxActions.TxContractCreation, TxContractCreationSaga);
    yield takeEvery(VtxconfigActions.VtxconfigReset, VtxconfigReset);
}
