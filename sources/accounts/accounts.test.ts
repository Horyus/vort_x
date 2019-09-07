import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import { getInitialState }                                       from '../tools/getInitialState';
import { getReducers }                                           from '../tools/getReducers';
import { getSagas }                                              from '../tools/getSagas';
import { Saga }                                                  from '@redux-saga/types';
import { State }                                                 from '../state/index';
import * as expect                                               from 'expect';
import createSagaMiddleware, { SagaMiddleware }                  from 'redux-saga';
import * as Ganache                                              from 'ganache-core';
import { configureVtx }                                          from '../tools/configureVtx';
import { VtxpollKill }                                           from '../vtxpoll/actions/action';
import * as Fs                                                   from 'fs';
import { getAccount, getAccountList }                            from './helpers/getters';
import { ganache_mine, vtx_status }                              from '../test_tools';
import { addAccount, removeAccount }                             from './helpers/dispatchers';
import { init, reset, setWeb3, start }                           from '../vtxconfig/helpers/dispatchers';
import { VtxStatus }                                             from '../state/vtxconfig';
import { vtx_account }                                           from '../test_tools/vtx_account';

const Web3 = require('web3');
const Solc = require('solc');

const FROM_ADDRESS_BOB: string = '0xb91d3009398b4619f08b6c0c272c47a430900b27';
const FROM_ADDRESS_MARC: string = '0x2d9a858f3929c132372af2b94a79ac92a54da75b';
const FROM_ADDRESS_MIKE: string = '0x5fe200f1fb031b3f5abf295ce2314a9b4dc1b552';

const TO_ADDRESS_GEORGE: string = '0x87b1598147cd55fd04c70fd8ff10493149823f7f';
const TO_ADDRESS_LISA: string = '0x979d159187166b10dac376e792e064c78f426c81';
const TO_ADDRESS_MARIE: string = '0xa4579f60ba01af0fc79223dd77d6811c35fa4753';

const TX_HASH_ONE: string =
    '0xd8138c6d640967893034aacb5430aed9446e66bc8596104d98da0057116f932d';
const TX_HASH_TWO: string =
    '0x5000851ef95f21276b56e0b16faac7c57636947c2092f960655c6919e4caa96f';
const TX_HASH_THREE: string =
    '0x3731daab117c68285aa03793f1def0db194eb9e1752c89fe57f927a4d936686a';
const TX_HASH_FOUR: string =
    '0x02f24c33863f85d7b0de1f8c2a039e4f1fc5116d8d24bedc8212025cbd1de53b';

const GANACHE_ARGS: any = (time: number): any => ({
    accounts: [
        {
            secretKey:
                '0x56d43a2846c97ce04a4334f2e86fe0fa4775e921f198e86e6e0d62721c393591',
            balance: '0x123456789101112'
        },
        {
            secretKey:
                '0x523acfb597f8537a7cd43e67d7be462b04e3c0e00eccc63c75412bdc7fdcfad5',
            balance: '0x123456789101112'
        },
        {
            secretKey:
                '0xa547f9a86eda975b05b52f9769f280ff7aeff57cbc131d68370d43640f605b98',
            balance: '0x123456789101112'
        },
        {
            secretKey:
                '0x0889ce176536c787aeb457dcdbb0c7d2c975f79f6ef72b3b308961bd3d5d2553',
            balance: '0x123456789101112'
        },
        {
            secretKey:
                '0x57d6d3b4f151a1fd769ebca96110e38afcdc42009b06aa39ca70adbf5f2064db',
            balance: '0x123456789101112'
        },
        {
            secretKey:
                '0xbb9e009be4621685ba371f3e52065a22b13f7c36d84fd4daa5ab67288b5770c0',
            balance: '0x123456789101112'
        }
    ],
    blockTime: time
});

const buildTestWeb3 = (time?: number): Web3 =>
    new Web3(Ganache.provider(GANACHE_ARGS(time)));

const contracts: any = {};

const compile_contract = (): void => {
    const input = {
        language: 'Solidity',
        sources: {
            'ValueStore.sol': {
                content: Fs.readFileSync('./sources/contracts/test_material/ValueStore.sol').toString()
            }
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };

    const output = JSON.parse(Solc.compile(JSON.stringify(input)));

    contracts.ValueStore = output.contracts['ValueStore.sol'].ValueStore;

};

const fetch_net_infos = async (web3: Web3, val: any): Promise<void> => {
    val.net_id = await web3.eth.net.getId();
    val.genesis_hash = (await web3.eth.getBlock(0)).hash.toLowerCase();
};

const buildStore = (net_id: number, genesis_hash: string): Store => {
    const composer = compose;

    const initial_state: State = configureVtx(getInitialState(), {
        poll_timer: 10,
        confirmation_threshold: 3,
        allowed_nets: {
            [net_id]: genesis_hash
        }
    });
    const reducers: Reducer = getReducers();

    const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware<any>();

    const store: Store = createStore<State, any, any, { test: string }>(
        reducers,
        initial_state,
        composer(applyMiddleware(sagaMiddleware))
    );

    const sagas: Saga = getSagas(store);

    sagaMiddleware.run(sagas);

    return store;
};

const killStore = (store: Store): void => {
    store.dispatch(VtxpollKill());
};

describe('[accounts]', (): void => {

    beforeEach(async function (): Promise<void> {
        this.web3 = buildTestWeb3();
        await fetch_net_infos(this.web3, this);
        this.store = buildStore(this.net_id, this.genesis_hash);
    });

    afterEach(function (): void {
        killStore(this.store);
    });

    it('Invalid net id', async function (): Promise<void> {

        killStore(this.store);
        --this.net_id;
        this.store = buildStore(this.net_id, this.genesis_hash);

        init(this.store.dispatch, this.web3);
        await vtx_status(this.store, VtxStatus.WrongNet, 10);
    });

    it('Invalid genesis hash', async function (): Promise<void> {

        killStore(this.store);
        this.genesis_hash += 'x';
        this.store = buildStore(this.net_id, this.genesis_hash);

        init(this.store.dispatch, this.web3);
        await vtx_status(this.store, VtxStatus.WrongNet, 10);
    });

    it('Fetch accounts, check balances', async function (): Promise<void> {

        init(this.store.dispatch, this.web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        addAccount(this.store.dispatch, FROM_ADDRESS_MARC, {alias: '@marc'});
        addAccount(this.store.dispatch, TO_ADDRESS_LISA, {alias: '@lisa'});

        await vtx_account(this.store, FROM_ADDRESS_MARC, 0, 50);
        await vtx_account(this.store, TO_ADDRESS_LISA, 0, 50);

        const acc_marc = getAccount(this.store.getState(), '@marc');
        const acc_lisa = getAccount(this.store.getState(), '@lisa');

        expect(acc_marc.balance.toString()).toEqual('81985529206280466');
        expect(acc_marc.transaction_count).toEqual(0);
        expect(acc_lisa.balance.toString()).toEqual('81985529206280466');
        expect(acc_lisa.transaction_count).toEqual(0);
    });

    it('Add permanent accounts before starting store, Fetch accounts, check balances', async function (): Promise<void> {

        setWeb3(this.store.dispatch, this.web3);

        addAccount(this.store.dispatch, FROM_ADDRESS_MARC, {alias: '@marc', permanent: true});
        addAccount(this.store.dispatch, TO_ADDRESS_LISA, {alias: '@lisa', permanent: true});

        start(this.store.dispatch);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        await vtx_account(this.store, FROM_ADDRESS_MARC, 0, 50);
        await vtx_account(this.store, TO_ADDRESS_LISA, 0, 50);

        const acc_marc = getAccount(this.store.getState(), '@marc');
        const acc_lisa = getAccount(this.store.getState(), '@lisa');

        expect(acc_marc.balance.toString()).toEqual('81985529206280466');
        expect(acc_marc.transaction_count).toEqual(0);
        expect(acc_lisa.balance.toString()).toEqual('81985529206280466');
        expect(acc_lisa.transaction_count).toEqual(0);
    });

    it('Fetch accounts, reset store, check accounts count', async function (): Promise<void> {

        init(this.store.dispatch, this.web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        addAccount(this.store.dispatch, FROM_ADDRESS_MARC, {alias: '@marc'});
        addAccount(this.store.dispatch, TO_ADDRESS_GEORGE, {alias: '@george'});

        let accounts = getAccountList(this.store.getState());

        expect(accounts).toHaveLength(3);

        reset(this.store.dispatch);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        accounts = getAccountList(this.store.getState());

        expect(accounts).toHaveLength(1);
    });

    it('Fetch accounts, transact, check balances, rm account', async function (): Promise<void> {

        init(this.store.dispatch, this.web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        addAccount(this.store.dispatch, FROM_ADDRESS_MARC, {alias: '@marc'});
        addAccount(this.store.dispatch, TO_ADDRESS_LISA, {alias: '@lisa'});

        await vtx_account(this.store, FROM_ADDRESS_MARC, 0, 50);
        await vtx_account(this.store, TO_ADDRESS_LISA, 0, 50);

        let acc_marc = getAccount(this.store.getState(), '@marc');
        let acc_lisa = getAccount(this.store.getState(), '@lisa');

        expect(acc_marc.balance.toString()).toEqual('81985529206280466');
        expect(acc_marc.transaction_count).toEqual(0);
        expect(acc_lisa.balance.toString()).toEqual('81985529206280466');
        expect(acc_lisa.transaction_count).toEqual(0);

        await this.web3.eth.sendTransaction({
            from: FROM_ADDRESS_MARC,
            to: TO_ADDRESS_LISA,
            value: '0x1112',
            gas: '0xffff',
            gasPrice: '0xffffff'
        });

        await ganache_mine(this.web3, 10);

        await vtx_account(this.store, FROM_ADDRESS_MARC, 2, 50);
        await vtx_account(this.store, TO_ADDRESS_LISA, 2, 50);

        acc_marc = getAccount(this.store.getState(), '@marc');
        acc_lisa = getAccount(this.store.getState(), '@lisa');

        expect(acc_marc.balance.toString()).toEqual('81985176884761096');
        expect(acc_marc.transaction_count).toEqual(1);
        expect(acc_lisa.balance.toString()).toEqual('81985529206284836');
        expect(acc_lisa.transaction_count).toEqual(0);

        removeAccount(this.store.dispatch, '@marc');

        acc_marc = getAccount(this.store.getState(), '@marc');

        expect(acc_marc).toBeUndefined();
    });

});
