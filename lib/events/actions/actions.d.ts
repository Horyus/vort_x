import { IEventsCaught, IEventsClear, IEventsFollow, IEventsSetHeight } from './actionTypes';
import { Web3Event } from '../../state/events';
export declare const EventsClear: (entity: string) => IEventsClear;
export declare const EventsFollow: (entity: string, event: string, args: any, contract: string, address: string, signature: string) => IEventsFollow;
export declare const EventsCaught: (entity: string, signature: string, infos: Web3Event) => IEventsCaught;
export declare const EventsSetHeight: (entity: string, signature: string, new_height: number) => IEventsSetHeight;
