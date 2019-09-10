import { SagaIterator }                 from 'redux-saga';
import { call, put, select }            from 'redux-saga/effects';
import { VtxeventsAdd }                 from '../../vtxevents/actions/actions';
import {
    VtxeventErrorTypes,
    VtxeventsContractsInstanceAdded,
    VtxeventsError,
    VtxeventsTypes
}                                       from '../../state/vtxevents';
import { IContractsNew }                from '../actions/actionTypes';
import { State }                        from '../../state';
import { check_code_at }                from '../../utils/check_code_at';
import { ContractsInstanceSetValidity } from '../actions/actions';

export function* ContractsNewSaga(action: IContractsNew): SagaIterator {

    const state: State = yield select();

    if (!state.vtxconfig.web3) return ;

    const spec = state.contracts.specs[action.contract];

    if (spec.bin) {
        const valid = yield call(check_code_at, state.vtxconfig.web3, action.address, spec.bin);
        yield put(ContractsInstanceSetValidity(action.contract, action.address, valid));

        if (valid) {

            yield put(VtxeventsAdd({
                type: VtxeventsTypes.ContractsInstanceAdded,
                contract: action.contract,
                address: action.address
            } as VtxeventsContractsInstanceAdded));

        } else {

            yield put(VtxeventsAdd({
                type: VtxeventsTypes.Error,
                e: (new Error('Invalid Contract')),
                error_type: VtxeventErrorTypes.ContractInvalid
            } as VtxeventsError));

        }

    } else {

        yield put(VtxeventsAdd({
            type: VtxeventsTypes.ContractsInstanceAdded,
            contract: action.contract,
            address: action.address
        } as VtxeventsContractsInstanceAdded));

    }

}
