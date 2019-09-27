import { VtxPollCb }                         from '../../state/vtxpoll';
import { State }                             from '../../state';
import { Dispatch }                          from 'redux';
import { VtxcacheSetData, VtxcacheSetError } from '../../vtxcache/actions/actions';

export const poll_contracts_constant_calls: VtxPollCb = async (state: State, emit: Dispatch, new_block: boolean): Promise<void> => {

        const current_block: number = state.blocks.current_height;

        for (const entity of Object.keys(state.vtxcache.store)) {

            for (const sig of Object.keys(state.vtxcache.store[entity])) {

                if (!new_block && state.vtxcache.store[entity][sig].block !== null) continue ;

                if (state.vtxcache.store[entity][sig].required && state.vtxcache.store[entity][sig].block !== current_block) {
                    try {
                        const new_data: any = await state.vtxcache.store[entity][sig].cb(current_block);
                        emit(VtxcacheSetData(entity, sig, new_data, current_block));
                    } catch (e) {
                        emit(VtxcacheSetError(entity, sig, e, current_block));
                    }
                }
            }

        }

};

export const poll_contracts_constant_calls_interval: number = 1;
