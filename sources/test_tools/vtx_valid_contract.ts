import { Store } from 'redux';

export const vtx_valid_instance = async (store: Store, name: string, address: string, max?: number): Promise<void> =>
    new Promise<void>(
        (ok: any, ko: any): void => {
            let idx: number = 0;
            const interval_id = setInterval((): void => {
                if (store.getState().contracts.instances[name][address].valid === true) {
                    clearInterval(interval_id);
                    ok();
                }
                if (max !== undefined && idx >= max) {
                    clearInterval(interval_id);
                    ko(new Error('Invalid Instance'));
                }

                ++idx;
            }, 100);
        }
    );
