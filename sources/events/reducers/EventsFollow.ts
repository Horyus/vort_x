import { Reducer }       from 'redux';
import { EventsSection } from '../../state/events';
import { IEventsFollow } from '../actions/actionTypes';

export const EventsFollowReducer: Reducer<EventsSection, IEventsFollow> =
    (state: EventsSection, action: IEventsFollow): EventsSection => {
        if (state[action.entity]) {
            return {
                ...state,
                [action.entity]: {
                    followed: {
                        ...state[action.entity].followed,
                        [action.signature]: {
                            event: action.event,
                            address: action.address,
                            arguments: action.arguments,
                            signature: action.signature,
                            contract: action.contract,
                            last_fetched: null
                        }
                    },
                    data: {
                        ...state[action.entity].data
                    }

                }
            };
        } else {
            return {
                ...state,
                [action.entity]: {
                    followed: {
                        [action.signature]: {
                            event: action.event,
                            address: action.address,
                            arguments: action.arguments,
                            signature: action.signature,
                            contract: action.contract,
                            last_fetched: null
                        }
                    },
                    data: {}
                }
            };
        }
    };
