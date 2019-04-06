import { Store }                            from 'redux';
import { VtxeventsSection, VtxeventsTypes } from '../state/vtxevents';

const contains_event = (events: VtxeventsSection[], event_type: string): boolean =>
    events.findIndex(
        (event: VtxeventsSection): boolean => event.type === event_type
    ) !== -1;

export const vtx_event = async (store: Store, start_idx: number, event_type: string, max?: number): Promise<void> =>
    new Promise<void>(
        (ok: any, ko: any): void => {
            let idx: number = 0;
            const interval_id = setInterval((): void => {
                if (
                    store.getState().vtxevents.length > start_idx &&
                    contains_event(
                        store.getState().vtxevents.slice(start_idx),
                        event_type
                    )
                ) {
                    clearInterval(interval_id);
                    ok();
                }
                if (max !== undefined && idx >= max) {
                    clearInterval(interval_id);
                    ko(new Error('Cannot find event'));
                }

                ++idx;
            }, 100);
        }
    );
