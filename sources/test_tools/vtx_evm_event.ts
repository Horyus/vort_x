import { Store } from 'redux';

export const vtx_evm_event = async (store: Store, entity: string, sig: string, required: number, max?: number): Promise<void> =>
    new Promise<void>(
        (ok: any, ko: any): void => {
            let idx: number = 0;
            const interval_id = setInterval((): void => {
                const state = store.getState();
                if (state.events[entity] && state.events[entity].data[sig] && state.events[entity].data[sig].length >= required) {
                    clearInterval(interval_id);
                    ok();
                }
                if (max !== undefined && idx >= max) {
                    clearInterval(interval_id);
                    ko(new Error('EVM event amount not fetched in limit time'));
                }

                ++idx;
            }, 100);
        }
    );
