import { Store }              from 'redux';
import { getTransactionById } from '../txs/helpers/getters';

export const vtx_tx_id = async (store: Store, id: number, max?: number): Promise<void> =>
    new Promise<void>(
        (ok: any, ko: any): void => {
            let idx: number = 0;
            const interval_id = setInterval((): void => {
                if (getTransactionById(store.getState(), id) !== undefined && getTransactionById(store.getState(), id).status === 'Confirmed')  {
                    clearInterval(interval_id);
                    ok();
                }

                if (max !== undefined && idx >= max) {
                    clearInterval(interval_id);
                    ko(new Error('Cannot find block in store'));
                }

                ++idx;
            }, 100);
        }
    );
