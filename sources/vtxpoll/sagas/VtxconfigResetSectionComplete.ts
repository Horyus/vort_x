import { IVtxconfigResetSectionComplete } from '../../vtxconfig/actions/actionTypes';
import { SagaIterator }                   from 'redux-saga';
import { State }                          from '../../state';
import { call, put, select }              from 'redux-saga/effects';
import { Dispatch }                       from 'redux';
import { VtxpollSetIntervalId }           from '../actions/action';
import { VtxpollEntity }                  from '../../state/vtxpoll';
import { ready }                          from '../../utils/ready';

let timer = 0;
let polling: { [key: string]: boolean } = null;
let last_polling_block = null;

const finished_all_calls = (): boolean => {

    for (const sec of Object.keys(polling)) {
        if (polling[sec] === true) return false;
    }

    return true;
};

async function loop(dispatcher: Dispatch, state_getter: () => State): Promise<void> {

    if (polling !== null && !finished_all_calls()) return;

    ++timer;

    const state: State = state_getter();
    const block_dependent: boolean = last_polling_block !== state.blocks.current_height;
    last_polling_block = state.blocks.current_height;

    if (polling === null) {
        polling = {};
        for (const poll of state.vtxpoll.actions) {
            polling[poll.name] = false;
        }
    }

    if (ready(state)) {

        await Promise.all(
            state.vtxpoll.actions
                .filter((entity: VtxpollEntity): boolean => (timer % entity.interval === 0 && !polling[entity.name]))
                .map(async (entity: VtxpollEntity): Promise<void> => {
                    polling[entity.name] = true;
                    await entity.cb(state, dispatcher, block_dependent);
                    polling[entity.name] = false;
                })
        );

    }

}

export function* VtxconfigResetSectionCompleteSaga(dispatch: Dispatch, state_getter: any, action: IVtxconfigResetSectionComplete): SagaIterator {
    if (action.section === 'vtxconfig') {

        const state: State = yield select();
        const clear = state.vtxconfig.web3 === null;

        if (state.vtxpoll.interval_id === undefined && !clear) {
            const interval_id: NodeJS.Timeout = yield call(
                setInterval,
                loop.bind(this, dispatch, state_getter),
                state.vtxconfig.poll_timer);
            yield put(VtxpollSetIntervalId(interval_id));
        }

        if (state.vtxpoll.interval_id !== undefined && clear) {
            clearInterval(state.vtxpoll.interval_id);
            yield put(VtxpollSetIntervalId(undefined));
        }

    }
}
