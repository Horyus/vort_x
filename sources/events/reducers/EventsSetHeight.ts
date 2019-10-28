import { Reducer }          from 'redux';
import { EventsSection }    from '../../state/events';
import { IEventsSetHeight } from '../actions/actionTypes';

export const EventsSetHeightReducer: Reducer<EventsSection, IEventsSetHeight> =
    (state: EventsSection, action: IEventsSetHeight): EventsSection => {

        if (!state[action.entity]) {
            return {
                ...state
            };
        }

        return {
            ...state,
            [action.entity]: {
                ...state[action.entity],
                followed: {
                    ...state[action.entity].followed,
                    [action.signature]: {
                        ...state[action.entity].followed[action.signature],
                        last_fetched: action.new_height
                    }
                }
            }
        };
    };
