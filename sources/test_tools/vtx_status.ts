import { Store }     from 'redux';

export const vtx_status = async (store: Store, status: string, max?: number): Promise<void> =>
    new Promise<void>(
        (ok: any, ko: any): void => {
            let idx: number = 0;
            const interval_id = setInterval((): void => {
                if (store.getState().vtxconfig.status === status) {
                    clearInterval(interval_id);
                    ok();
                }

                if (max !== undefined && idx >= max) {
                    clearInterval(interval_id);
                    console.log(store.getState().vtxconfig.status, status);
                    ko(new Error('Cannot have required status'));
                }

                ++idx;
            }, 1000);
        }
    );
