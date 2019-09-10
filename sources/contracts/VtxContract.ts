import { State, TxInfos }                      from '../state';
import { Dispatch, Store }                     from 'redux';
import { VtxcacheElement }                     from '../state/vtxcache';
import { VtxcacheCreate, VtxcacheSetRequired } from '../vtxcache/actions/actions';
import { VtxcacheCb }                          from '../vtxcache/actions/actionTypes';
import { get_tx_id }                           from '../utils/get_tx_id';
import { ContractsSend }                       from './actions/actions';
import { keccak256 }                           from 'js-sha3';
import { EventsFollowed }                      from '../state/events';
import { EventsFollow }                        from '../events/actions/actions';
import { address_checker }                     from '../utils/address_checker';

const hexReg = /^[a-fA-F0-9]+$/;
const methodReg = /^[a-zA-Z0-9_]+$/;

interface Methods {
    [key: string]: (...args: any[]) => any;
}

interface Events {
    [key: string]: (...args: any[]) => any;
}

export class VtxContract {

    private readonly _store: Store;
    private readonly _contract: any;
    private readonly _bin: string;
    private readonly _constructor_bin: string;
    private readonly _name: string;
    private readonly _methods: Methods = {};
    private readonly _events: Events = {};
    private readonly _address: string;
    private readonly _abi: any;

    constructor(store: Store, name: string, address: string, abi: any, bin?: string, constructor_bin?: string) {
        const web3 = (store.getState() as State).vtxconfig.web3;
        this._store = store;
        this._contract = new web3.eth.Contract(abi, address);
        this._name = name;
        this._address = address_checker(address);
        this._abi = abi;

        let hex_begin = 0;

        if (bin && (hexReg.test(bin) || hexReg.test(bin.slice((hex_begin = 2))))) {
            this._bin = bin.slice(hex_begin).toLowerCase();
        }

        hex_begin = 0;

        if (constructor_bin && (hexReg.test(constructor_bin) || hexReg.test(constructor_bin.slice((hex_begin = 2))))) {
            this._constructor_bin = constructor_bin.slice(hex_begin).toLowerCase();
        }

        this.generate_constant_calls();
        this.generate_transaction_calls();
        this.generate_event_calls();
    }

    public get address(): string {
        return this._address;
    }

    public get abi(): any {
        return this._abi;
    }

    public get web3_instance(): any {
        return this._contract;
    }

    public get bin(): string {
        return this._bin;
    }

    public get constructor_bin(): string {
        return this._constructor_bin;
    }

    public get fn(): Methods {
        return this._methods;
    }

    public get events(): Events {
        return this._events;
    }

    public get valid(): boolean {
        const state: State = this._store.getState();
        if (!state.contracts.instances[this._name][this._address]) return null;
        return state.contracts.instances[this._name][this._address].valid;
    }

    public static event_sig = (contract_name: string, contract_address: string, method_name: string, args: {[key: string]: string; }): string => {
        let payload: string = `EVENT:${contract_name}:${contract_address}:${method_name}`;
        if (args) {
            for (const arg of Object.keys(args)) {
                switch (typeof arg) {

                    case 'number':
                    case 'string':
                        payload += `:${arg}`;
                        break;

                    case 'object':
                    default:
                        payload += `:${JSON.stringify(arg)}`;
                }

                switch (typeof args[arg]) {

                    case 'number':
                    case 'string':
                        payload += `:${args[arg]}`;
                        break;

                    case 'object':
                    default:
                        payload += `:${JSON.stringify(args[arg])}`;
                }
            }
        }
        return keccak256(`0x${new Buffer(payload).toString('hex')}`);
    }

    public static sig = (contract_name: string, contract_address: string, method_name: string, ...args: any[]): string => {
        let payload: string = `${contract_name}:${contract_address}:${method_name}`;
        for (const arg of args) {
            switch (typeof arg) {

                case 'number':
                case 'string':
                    payload += `:${arg}`;
                    break;

                case 'object':
                default:
                    payload += `:${JSON.stringify(arg)}`;
            }
        }
        return keccak256(`0x${new Buffer(payload).toString('hex')}`);
    }

    private static readonly tx_inspect_args = (coinbase: string, args: any[]): [any[], any[]] => {
        if (args.length === 0) return [[], [{from: coinbase}]];
        const last = args[args.length - 1];

        if (typeof last === 'object' && (
            last.from !== undefined
            || last.gasPrice !== undefined
            || last.gas !== undefined
            || last.value !== undefined
        )) {
            return [
                args.slice(0, args.length - 1),
                [args[args.length - 1]]
            ];
        } else {
            return [args, [{from: coinbase}]];
        }

    }

    private static readonly const_inspect_args = (block: number, args: any[]): [any[], any[]] => {
        if (args.length === 0) return [[], [{}, block]];
        const last = args[args.length - 1];

        if (typeof last === 'object' && (
            last.from !== undefined
            || last.gasPrice !== undefined
            || last.gas !== undefined
        )) {
            return [args.slice(0, args.length - 1), [args[args.length - 1], block]];
        } else {
            return [args, [{}, block]];
        }

    }

    private readonly generate_transaction_calls = (): void => {
        for (const method of this._abi) {
            if (method.type === 'function' && method.constant === false) {
                this._methods[method.name] = (...args: any[]): number => {
                    if (!this.valid) throw new Error(`Calling Transaction call on invalid contract: bytecode does not match the one present on chain (${this.valid})`);

                    const tx_id: number = get_tx_id();
                    this._store.dispatch(ContractsSend(
                        async (): Promise<string> => {

                            const coinbase = await this._store.getState().vtxconfig.coinbase;
                            const splitted_args = VtxContract.tx_inspect_args(coinbase, args);
                            const res = (await this._contract.methods[method.name](...splitted_args[0]).send(...splitted_args[1]));
                            return res.transactionHash;
                        },
                        tx_id,
                        method.name,
                        args,
                        this._name,
                        this._address
                    ));

                    return tx_id;
                };
            }
        }
    }

    private readonly generate_constant_calls = (): void => {

        for (const method of this._abi) {
            if (method.type === 'function' && method.constant === true) {

                // TODO Compute return value

                this._methods[method.name] = (...args: any[]): any => {
                    if (!this.valid) throw new Error(`Calling Constant call on invalid contract: bytecode does not match the one present on chain (${this.valid})`);

                    // TODO Argument check;
                    const sig: string = VtxContract.sig(this._name, this._address, method.name, ...args);

                    const state: State = this._store.getState();

                    const cache: VtxcacheElement = state.vtxcache.store[sig];

                    if (cache === undefined) {

                        // TODO compute generic argument from abi
                        // tslint:disable-next-line
                        const cb: VtxcacheCb<any> = async (block: number): Promise<any> => {
                            // TODO identify the configuration arg (if it exists) and insert blockTag

                            const splitted_args = VtxContract.const_inspect_args(block, args);
                            return this._contract.methods[method.name](...splitted_args[0]).call(...splitted_args[1]);
                        };

                        this._store.dispatch(VtxcacheCreate(sig, cb));

                    } else if (cache.required === false) {
                        this._store.dispatch(VtxcacheSetRequired(sig));
                    }

                    const cache_value = state.vtxcache.store[sig];
                    if (!cache_value) return undefined;
                    if (cache_value.error) return {error: cache_value.error, block: cache_value.block};
                    return cache_value.data;

                };
            }
        }
    }

    private readonly generate_event_calls = (): void => {

        for (const event of this._abi) {
            if (event.type === 'event') {

                this._events[event.name] = (args: {[key: string]: string; }): any => {
                    if (!this.valid) throw new Error(`Calling Event call on invalid contract: bytecode does not match the one present on chain (${this.valid})`);

                    const sig: string = VtxContract.event_sig(this._name, this._address, event.name, args);

                    const state: State = this._store.getState();

                    const followed: EventsFollowed = state.events.followed[sig];

                    if (followed === undefined) {
                        this._store.dispatch(EventsFollow(event.name, args, this._name, this._address, sig));
                        return [];
                    }

                    return state.events.data[sig] || [];
                };
            }

        }

    }

    public static getPastEvents = async (web3: any, abi: any, address: any, ...args: any[]): Promise<any> => {
        const contract = new web3.eth.Contract(abi, address);
        return contract.getPastEvents(...args);
    }

}
