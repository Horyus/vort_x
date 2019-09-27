import { Action }    from 'redux';
import { Web3Event } from '../../state/events';

export const EventsActions = {
    EventsFollow: '[VTX][EVM EVENTS] FOLLOW',
    EventsCaught: '[VTX][EVM EVENTS] CAUGHT',
    EventsSetHeight: '[VTX][EVM EVENTS] SET_HEIGHT',
    EventsClear: '[VTX][EVM EVENTS] CLEAR'
};

export interface IEventsClear extends Action<string> {
    entity: string;
}

export interface IEventsFollow extends Action<string> {
    entity: string;
    event: string;
    arguments: {
        [key: string]: string;
    };
    address: string;
    signature: string;
    contract: string;
}

export interface IEventsCaught extends Action<string> {
    entity: string;
    signature: string;
    infos: Web3Event;
}

export interface IEventsSetHeight extends Action<string> {
    entity: string;
    signature: string;
    new_height: number;
}

export type EventsActionTypes = IEventsFollow | IEventsCaught | IEventsSetHeight | IEventsClear;
