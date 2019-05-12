import { SagaIterator }                      from 'redux-saga';
import { takeEvery }                         from 'redux-saga/effects';
import { VtxconfigActions }                  from '../../vtxconfig/actions/actionTypes';
import { VtxconfigResetSectionCompleteSaga } from './VtxconfigResetSectionComplete';
import { Dispatch }                          from 'redux';
import { State }                             from '../../state';
import { VtxpollActions }                    from '../actions/actionTypes';
import { VtxpollKill }                       from './VtxpollKill';

export function* VtxpollSagas(dispatch: Dispatch, state_getter: () => State): SagaIterator {
    yield takeEvery(VtxconfigActions.VtxconfigResetSectionComplete, VtxconfigResetSectionCompleteSaga, dispatch, state_getter);
    yield takeEvery(VtxpollActions.VtxpollKill, VtxpollKill);
}
