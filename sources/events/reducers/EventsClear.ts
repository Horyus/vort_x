import { Reducer }       from 'redux';
import { EventsSection } from '../../state/events';
import { IEventsClear }  from '../actions/actionTypes';

export const EventsClear: Reducer<EventsSection, IEventsClear> =
    (state: EventsSection, action: IEventsClear): EventsSection => {

        if (state[action.entity]) {
            delete state[action.entity];
        }

        return {
            ...state,
        };

    };
