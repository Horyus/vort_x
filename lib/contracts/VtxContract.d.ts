import { Store } from 'redux';
interface Methods {
    [key: string]: (...args: any[]) => any;
}
interface Events {
    [key: string]: (...args: any[]) => any;
}
export declare class VtxContract {
    private readonly _store;
    private readonly _contract;
    private readonly _bin;
    private readonly _constructor_bin;
    private readonly _name;
    private readonly _methods;
    private readonly _events;
    private readonly _address;
    private readonly _abi;
    constructor(store: Store, name: string, address: string, abi: any, bin?: string, constructor_bin?: string);
    readonly address: string;
    readonly abi: any;
    readonly web3_instance: any;
    readonly bin: string;
    readonly constructor_bin: string;
    readonly fn: Methods;
    readonly events: Events;
    readonly valid: boolean;
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
