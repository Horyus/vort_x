import { State, VtxcacheStore } from '../state';
import { Dispatch } from 'redux';
import { EventsEntitySection } from '../state/events';
interface Methods {
    [key: string]: (...args: any[]) => any;
}
interface Events {
    [key: string]: (...args: any[]) => any;
}
export interface VtxContractMaterial {
    cache: VtxcacheStore;
    events: EventsEntitySection;
    valid: boolean;
    coinbase: string;
}
export declare const getContractMaterial: (state: State, contract: string, address: string) => VtxContractMaterial;
export declare class VtxContract {
    private readonly _dispatch;
    private readonly _contract;
    private readonly _bin;
    private readonly _constructor_bin;
    private readonly _name;
    private readonly _methods;
    private readonly _events;
    private readonly _address;
    private readonly _abi;
    private readonly _entity_signature;
    private readonly material;
    static entity_sig(name: string, address: string): string;
    constructor(dispatch: Dispatch, material: VtxContractMaterial, instance: any, name: string, address: string, abi: any, bin?: string, constructor_bin?: string);
    get address(): string;
    get abi(): any;
    get web3_instance(): any;
    get bin(): string;
    get constructor_bin(): string;
    get fn(): Methods;
    get events(): Events;
    get valid(): boolean;
    static event_sig: (contract_name: string, contract_address: string, method_name: string, args: {
        [key: string]: string;
    }) => string;
    static sig: (contract_name: string, contract_address: string, method_name: string, ...args: any[]) => string;
    private static readonly tx_inspect_args;
    private static readonly const_inspect_args;
    private readonly generate_transaction_calls;
    private readonly generate_constant_calls;
    private readonly generate_event_calls;
    static getPastEvents: (web3: any, abi: any, address: any, ...args: any[]) => Promise<any>;
}
export {};
