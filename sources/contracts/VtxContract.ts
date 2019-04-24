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

const hexReg = /^[a-fA-F0-9]+$/;
const methodReg = /^[a-zA-Z0-9_]+$/;

interface Methods {
    [key: string]: (...args: any[]) => any;
}

interface Events {
    [key: string]: (...args: any[]) => any;
}

export class VtxContract {

    private static store: Store;
    private _contract: any;
    private readonly _bin: string;
    private readonly _constructor_bin: string;
    private _valid: boolean = false;
    private readonly _name: string;
    private readonly _methods: Methods = {};
    private readonly _events: Events = {};
    private readonly _address: string;
    private readonly _abi: any;

    constructor(web3: Web3, name: string, address: string, abi: any, bin?: string, constructor_bin?: string) {
        this._contract = new web3.eth.Contract(abi, address);
        this._name = name;
        this._address = address;
        this._abi = abi;

        let hex_begin = 0;

        if (bin && (hexReg.test(bin) || hexReg.test(bin.slice((hex_begin = 2))))) {
            this._bin = bin.slice(hex_begin).toLowerCase();
        }

        hex_begin = 0;

        if (constructor_bin && (hexReg.test(constructor_bin) || hexReg.test(constructor_bin.slice((hex_begin = 2))))) {
            this._constructor_bin = constructor_bin.slice(hex_begin).toLowerCase();
        }

        if (!VtxContract.store) {
            throw new Error('Call VtxContract.init(store) to properly init all the contracts');
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

    private static get dispatch(): Dispatch {
        if (!VtxContract.store) {
            throw new Error('Call VtxContract.init(store) to properly init all the contracts');
        }

        return VtxContract.store.dispatch;
    }

    public get fn(): Methods {
        return this._methods;
    }

    public get events(): Events {
        return this._events;
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

    public static init = (store: Store): void => {
        VtxContract.store = store;
    }

    private static readonly getState = (): State => {
        if (!VtxContract.store) {
            throw new Error('Call VtxContract.init(store) to properly init all the contracts');
        }

        return VtxContract.store.getState();
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

    public reset = (web3: Web3): void => {
        this._valid = false;
        this._contract = new web3.eth.Contract(this._abi, this._address);
    }

    public readonly valid = async (): Promise<void> => {
        if (this._valid) return;
        if (!this._bin) {
            this._valid = true;
            return;
        }

        const code = (await VtxContract.store.getState().vtxconfig.web3.eth.getCode(this._address)).slice(2);

        if (code.toLowerCase() !== this._bin) {
            throw new Error(`Invalid Contract Instance at address ${this._contract.address}: no matching bin`);
        }
        this._valid = true;
    }

    public readonly isValid = (): boolean => this._valid;

    private readonly generate_transaction_calls = (): void => {
        for (const method of this._abi) {
            if (method.type === 'function' && method.constant === false) {
                this._methods[method.name] = (...args: any[]): number => {
                    if (!this._valid) throw new Error('VtxContract instance has not been validated');

                    const tx_id: number = get_tx_id();
                    VtxContract.store.dispatch(ContractsSend(
                        async (): Promise<string> => {

                            const coinbase = await VtxContract.store.getState().vtxconfig.coinbase;
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
                    if (!this._valid) return undefined;

                    // TODO Argument check;
                    const sig: string = VtxContract.sig(this._name, this._address, method.name, ...args);

                    const state: State = VtxContract.getState();

                    const cache: VtxcacheElement = state.vtxcache.store[sig];

                    if (cache === undefined) {

                        // TODO compute generic argument from abi
                        // tslint:disable-next-line
                        const cb: VtxcacheCb<any> = async (block: number): Promise<any> => {
                            // TODO identify the configuration arg (if it exists) and insert blockTag

                            const splitted_args = VtxContract.const_inspect_args(block, args);
                            return this._contract.methods[method.name](...splitted_args[0]).call(...splitted_args[1]);
                        };

                        VtxContract.dispatch(VtxcacheCreate(sig, cb));

                    } else if (cache.required === false) {
                        VtxContract.dispatch(VtxcacheSetRequired(sig));
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
                    if (!this._valid) return [];

                    const sig: string = VtxContract.event_sig(this._name, this._address, event.name, args);

                    const state: State = VtxContract.getState();

                    const followed: EventsFollowed = state.events.followed[sig];

                    if (followed === undefined) {
                        VtxContract.store.dispatch(EventsFollow(event.name, args, this._name, this._address, sig));
                        return [];
                    }

                    return state.events.data[sig] || [];
                };
            }

        }

    }

    public getPastEvents = async (...args: any[]): Promise<any> =>
        this._contract.getPastEvents(...args)

}
