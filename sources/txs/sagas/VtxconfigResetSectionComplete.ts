import { IVtxconfigResetSectionComplete } from '../../vtxconfig/actions/actionTypes';
import { SagaIterator }                   from 'redux-saga';
import { put }                            from 'redux-saga/effects';
import { TxReset }                        from '../actions/actions';
import { VtxconfigResetSectionComplete }  from '../../vtxconfig/actions/actions';

export function* VtxconfigResetSectionCompleteSaga(action: IVtxconfigResetSectionComplete): SagaIterator {

    if (action.section === 'vtxconfig') {
        yield put(TxReset());
        yield put(VtxconfigResetSectionComplete('txs'));
    }

}
