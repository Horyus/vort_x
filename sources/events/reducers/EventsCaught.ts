import { Reducer }                      from 'redux';
import { EventsSection }                from '../../state/events';
import { IEventsCaught } from '../actions/actionTypes';

export const EventsCaughtReducer: Reducer<EventsSection, IEventsCaught> =
    (state: EventsSection, action: IEventsCaught): EventsSection => {

        if (!state[action.entity]) {
            return {
                ...state
            };
        }

        if (state[action.entity].data[action.signature]) {
            return {
                ...state,
                [action.entity]: {
                    ...state[action.entity],
                    data: {
                        ...state[action.entity].data,
                        [action.signature]: [
                            ...state[action.entity].data[action.signature],
                            action.infos
                        ]
                    }
                }
            };
        } else {
            return {
                ...state,
                [action.entity]: {
                    ...state[action.entity],
                    data: {
                        ...state[action.entity].data,
                        [action.signature]: [
                            action.infos
                        ]
                    }
                }
            };
        }

    };
