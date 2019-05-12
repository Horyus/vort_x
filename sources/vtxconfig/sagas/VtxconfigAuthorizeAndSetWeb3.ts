import { SagaIterator }                                   from 'redux-saga';
import { call, put, select }                              from 'redux-saga/effects';
import { IVtxconfigAuthorizeAndSetWeb3, IVtxconfigReset } from '../actions/actionTypes';
import {
    VtxconfigResetSectionComplete,
    VtxconfigSetInfos,
    VtxconfigSetStatus,
    VtxconfigSetWeb3
}                                                         from '../actions/actions';
import { VtxStatus }                                      from '../../state/vtxconfig';

export function* VtxconfigAuthorizeAndSetWeb3Saga(action: IVtxconfigAuthorizeAndSetWeb3): SagaIterator {

    yield put(VtxconfigSetStatus(VtxStatus.Authorizing));
    try {
        yield call(action.authorization.enable);
    } catch (e) {
        yield put(VtxconfigSetStatus(VtxStatus.Unauthorized));
        yield call(action.cb);
        return ;
    }
    const web3: Web3 = yield call(action.authorization.web3);
    if (web3 === null || web3 === undefined) {
        yield put(VtxconfigSetStatus(VtxStatus.Error));
        return ;
    }

    yield put(VtxconfigSetWeb3(web3));
    yield call(action.cb);
}
