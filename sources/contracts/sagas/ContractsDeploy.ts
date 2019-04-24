import { SagaIterator }                                       from 'redux-saga';
import { put, select }                                        from 'redux-saga/effects';
import { VtxeventsAdd }                                       from '../../vtxevents/actions/actions';
import { IContractsDeploy }                                   from '../actions/actionTypes';
import { TxContractCreation }                                 from '../../txs/actions/actions';
import { VtxeventErrorTypes, VtxeventsError, VtxeventsTypes } from '../../state/vtxevents';
import { State }                                              from '../../state';

export function* ContractsDeploySaga(action: IContractsDeploy): SagaIterator {

    try {
        const state: State = yield select();

        const spec = state.contracts.specs[action.contract.name];

        if (!spec.constructor_bin) {
            throw new Error(`Cannot deploy: spec ${action.contract.name} has no constructor_bin`);
        }

        const web3_instance = new state.vtxconfig.web3.eth.Contract(spec.abi, {
            data: spec.constructor_bin
        });

        action.tx_infos.input = web3_instance.deploy({
            arguments: action.args
        }).encodeABI();

        yield put(TxContractCreation(action.tx_infos, action.contract, action.id));

    } catch (e) {

        yield put(VtxeventsAdd({
            type: VtxeventsTypes.Error,
            error_type: VtxeventErrorTypes.ContractDeployError,
            e
        } as VtxeventsError));

    }

}
