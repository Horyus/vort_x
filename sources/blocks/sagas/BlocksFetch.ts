import { IBlocksFetch }                                       from '../actions/actionTypes';
import { SagaIterator }                                       from 'redux-saga';
import { call, put, select }                                  from 'redux-saga/effects';
import { ready }                                              from '../../utils/ready';
import { Block }                                              from '../../state/blocks';
import { VtxeventErrorTypes, VtxeventsError, VtxeventsTypes } from '../../state/vtxevents';
import { VtxeventsAdd }                                       from '../../vtxevents/actions/actions';
import { BlocksFetched }                                      from '../actions/actions';
import { State }                                              from '../../state';

export function* BlocksFetchSaga(action: IBlocksFetch): SagaIterator {

    const state: State = yield select();

    if (ready(state)) {
        const web3 = state.vtxconfig.web3;

        try {

            const block: Block = yield call(
                web3.eth.getBlock,
                action.height
            );

            yield put(BlocksFetched(block.number, block));

        } catch (e) {

            yield put(VtxeventsAdd({
                type: VtxeventsTypes.Error,
                e,
                error_type: VtxeventErrorTypes.BlockFetchError
            } as VtxeventsError));

        }

    } else {
        console.error(`BlockFetch was called while store was not ready`);
    }

}
