import { Reducer }                                                        from 'redux';
import { EventsSection }                                                  from '../../state/events';
import {
    EventsActions,
    EventsActionTypes,
    IEventsCaught, IEventsClear,
    IEventsFollow,
    IEventsSetHeight
} from '../actions/actionTypes';
import { InitialState }           from '../../state/index';
import { EventsFollowReducer }    from './EventsFollow';
import { EventsCaughtReducer }    from './EventsCaught';
import { EventsSetHeightReducer } from './EventsSetHeight';
import { EventsClear }            from './EventsClear';

export const EventsReducer: Reducer<EventsSection, EventsActionTypes> =
    (state: EventsSection = InitialState.events, action: EventsActionTypes): EventsSection => {
        switch (action.type) {
            case EventsActions.EventsFollow:
                return EventsFollowReducer(state, action as IEventsFollow);
            case EventsActions.EventsCaught:
                return EventsCaughtReducer(state, action as IEventsCaught);
            case EventsActions.EventsSetHeight:
                return EventsSetHeightReducer(state, action as IEventsSetHeight);
            case EventsActions.EventsClear:
                return EventsClear(state, action as IEventsClear);
            default:
                return state;
        }
    };
