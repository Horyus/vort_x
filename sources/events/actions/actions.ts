import { EventsActions, IEventsCaught, IEventsClear, IEventsFollow, IEventsSetHeight } from './actionTypes';
import { address_checker }                                                             from '../../utils/address_checker';
import { Web3Event }                                                                   from '../../state/events';

export const EventsClear = (entity: string): IEventsClear => ({
    type: EventsActions.EventsClear,
    entity
});

export const EventsFollow = (entity: string, event: string, args: any, contract: string, address: string, signature: string): IEventsFollow => ({
    type: EventsActions.EventsFollow,
    entity,
    event,
    arguments: args,
    address: address_checker(address),
    contract,
    signature
});

export const EventsCaught = (entity: string, signature: string, infos: Web3Event): IEventsCaught => ({
    type: EventsActions.EventsCaught,
    entity,
    signature,
    infos: {
        ...infos,
        address: address_checker(infos.address)
    }
});

export const EventsSetHeight = (entity: string, signature: string, new_height: number): IEventsSetHeight => ({
    type: EventsActions.EventsSetHeight,
    entity,
    signature,
    new_height
});
