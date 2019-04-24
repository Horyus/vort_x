import { ITxContractCreation } from '../actions/actionTypes';
import { SagaIterator }                 from 'redux-saga';
import { call, put, select }            from 'redux-saga/effects';
import { State }                        from '../../state';
import { ready }                        from '../../utils/ready';
import { getWeb3 }                      from '../../vtxconfig/helpers/getters';
import { VtxeventsAdd }                 from '../../vtxevents/actions/actions';
import {
    VtxeventErrorTypes,
    VtxeventsError,
    VtxeventsTxBroadcasted,
    VtxeventsTypes
}                                       from '../../state/vtxevents';
import Web3 = require('web3');
import { TxAdd }             from '../actions/actions';

export function* TxContractCreationSaga(action: ITxContractCreation): SagaIterator {
    const state: State = yield select();

    if (ready(state)) {
        const web3: Web3 = getWeb3(state);
        try {
            const tx_hash: any = yield call(
                web3.eth.sendTransaction,
                action.tx_infos
            );

            yield put(VtxeventsAdd({
                type: VtxeventsTypes.TxBroadcasted,
                tx_hash: tx_hash.transactionHash,
            } as VtxeventsTxBroadcasted));

            yield put(TxAdd(tx_hash.transactionHash, action.tx_infos, action.tx_id, action.contract));
        } catch (e) {
            console.log(e);
            yield put(VtxeventsAdd({
                type: VtxeventsTypes.Error,
                e,
                error_type: VtxeventErrorTypes.TxBroadcastError
            } as VtxeventsError));
        }
    } else {
        console.error(`TxContractCreation was called while store was not ready`);
    }
}
