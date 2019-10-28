import { VtxPollCb }                     from '../../state/vtxpoll';
import { State }                         from '../../state';
import { Dispatch }                      from 'redux';
import { EventsFollowed, Web3Event }     from '../../state/events';
import { VtxContract }                   from '../../contracts/VtxContract';
import { EventsCaught, EventsSetHeight } from '../../events/actions/actions';

export const poll_events: VtxPollCb = async (state: State, emit: Dispatch, new_block: boolean): Promise<void> => {
    if (state.blocks.initial_height !== null && state.blocks.current_height !== null) {

        for (const entity of Object.keys(state.events)) {

            const events: {[key: string]: EventsFollowed} = state.events[entity].followed;

            for (const event_sig of Object.keys(events)) {

                if (!new_block && events[event_sig].last_fetched !== null) continue ;

                const from: number = events[event_sig].last_fetched !== null ? (events[event_sig].last_fetched + 1) : state.blocks.initial_height;
                const to: number = state.blocks.current_height;

                if (from <= to) {
                    const spec = state.contracts.specs[events[event_sig].contract];
                    if (!spec) continue ;

                    const caught_events: Web3Event[] = await VtxContract.getPastEvents(state.vtxconfig.web3, spec.abi, events[event_sig].address, events[event_sig].event, {
                        fromBlock: from,
                        toBlock: to,
                        filter: events[event_sig].arguments
                    });

                    for (const caught_event of caught_events) {
                        emit(EventsCaught(entity, events[event_sig].signature, caught_event));
                    }

                    emit(EventsSetHeight(entity, events[event_sig].signature, to));
                }

            }
        }

    }
};

export const poll_events_interval: number = 1;
