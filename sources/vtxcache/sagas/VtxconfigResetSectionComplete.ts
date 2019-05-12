import { IVtxconfigResetSectionComplete } from '../../vtxconfig/actions/actionTypes';
import { SagaIterator }                   from 'redux-saga';
import { VtxcacheReset }                  from '../actions/actions';
import { put }                            from 'redux-saga/effects';
import { VtxconfigResetSectionComplete }  from '../../vtxconfig/actions/actions';

export function* VtxconfigResetSectionCompleteSaga(action: IVtxconfigResetSectionComplete): SagaIterator {
    if (action.section === 'vtxconfig') {
        yield put(VtxcacheReset());
        yield put(VtxconfigResetSectionComplete('vtxcache'));
    }
}
