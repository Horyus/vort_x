import { Store } from 'redux';

export const vtx_cache = async (store: Store, entity: string, signature: string, block: number, max?: number): Promise<void> =>
    new Promise<void>(
        (ok: any, ko: any): void => {
            let idx: number = 0;
            const interval_id = setInterval((): void => {
                if (store.getState().vtxcache.store[entity] && store.getState().vtxcache.store[entity][signature] && store.getState().vtxcache.store[entity][signature].block !== null && store.getState().vtxcache.store[entity][signature].block >= block) {
                    clearInterval(interval_id);
                    ok();
                }

                if (max !== undefined && idx >= max) {
                    clearInterval(interval_id);
                    ko(new Error('Cannot find cache state update'));
                }

                ++idx;
            }, 100);
        }
    );
