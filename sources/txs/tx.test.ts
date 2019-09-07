import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import { getInitialState }                                       from '../tools/getInitialState';
import { getReducers }                                           from '../tools/getReducers';
import { getSagas }                                              from '../tools/getSagas';
import { Saga }                                                  from '@redux-saga/types';
import { State }                                                 from '../state/index';
import * as expect                                               from 'expect';
import createSagaMiddleware, { SagaMiddleware }                  from 'redux-saga';
import { TxAdd, TxError, TxRemove, TxSet }                       from './actions/actions';
import { Tx, TxStatus }                                          from '../state/txs';
import {
    getTransaction,
    getTransactionById,
    getTransactions
}                                                                from './helpers/getters';
import {
    addTransaction,
    followTransaction,
    removeTransaction,
    sendTransaction
}                                                                from './helpers/dispatchers';
import * as Ganache                                              from 'ganache-core';
import { init }                                                  from '../vtxconfig/helpers/dispatchers';
import {
    vtx_event,
    vtx_state_check,
    vtx_status,
    ganache_mine
}                                                                from '../test_tools';
import { VtxStatus }                                             from '../state/vtxconfig';
import { VtxeventsTypes }                                        from '../state/vtxevents';

const Web3 = require('web3');
import { configureVtx }                                          from '../tools/configureVtx';
import { VtxpollKill }                                           from '../vtxpoll/actions/action';

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

const buildStore = (): Store => {
    const composer = compose;
    const initial_state: State = configureVtx(getInitialState(), {
        poll_timer: 10,
        confirmation_threshold: 3
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

describe('[txs]', function (): void {

    beforeEach(function (): void {
        this.store = buildStore();
    });

    afterEach(function (): void {
        killStore(this.store);
    });

    it('Add basic transaction', function (): void {

        this.store.dispatch(
            TxAdd(TX_HASH_ONE, {
                from: FROM_ADDRESS_BOB,
                to: TO_ADDRESS_GEORGE
            })
        );

        expect(getTransaction(this.store.getState(), TX_HASH_ONE).infos.from.toLowerCase())
            .toEqual(FROM_ADDRESS_BOB.toLowerCase());

    });

    it('Add basic transaction + Set transaction', function (): void {

        this.store.dispatch(
            TxAdd(TX_HASH_ONE, {
                from: FROM_ADDRESS_BOB,
                to: TO_ADDRESS_GEORGE
            })
        );

        this.store.dispatch(TxSet(TX_HASH_ONE, {}, TxStatus.Error));

        expect(getTransaction(this.store.getState(), TX_HASH_ONE).infos.from.toLowerCase())
            .toEqual(FROM_ADDRESS_BOB.toLowerCase());
        expect(getTransaction(this.store.getState(), TX_HASH_ONE).status).toEqual(
            TxStatus.Error
        );

    });

    it('Add basic transaction + Error transaction', function (): void {

        this.store.dispatch(
            TxAdd(TX_HASH_ONE, {
                from: FROM_ADDRESS_BOB,
                to: TO_ADDRESS_GEORGE
            })
        );

        this.store.dispatch(TxError(TX_HASH_ONE, new Error('test')));

        expect(getTransaction(this.store.getState(), TX_HASH_ONE).infos.from.toLowerCase())
            .toEqual(FROM_ADDRESS_BOB.toLowerCase());
        expect(getTransaction(this.store.getState(), TX_HASH_ONE).status).toEqual(TxStatus.Error);
        expect(getTransaction(this.store.getState(), TX_HASH_ONE).e.message).toEqual('test');

    });

    it('Add basic transaction + Remove transaction', function (): void {

        this.store.dispatch(
            TxAdd(TX_HASH_ONE, {
                from: FROM_ADDRESS_BOB,
                to: TO_ADDRESS_GEORGE
            })
        );

        this.store.dispatch(TxRemove(TX_HASH_ONE));

        expect(getTransaction(this.store.getState(), TX_HASH_ONE)).toEqual(undefined);

    });

    it('Add 4 basic transactions + get two', function (): void {

        this.store.dispatch(
            TxAdd(TX_HASH_ONE, {
                from: FROM_ADDRESS_BOB,
                to: TO_ADDRESS_GEORGE
            })
        );

        this.store.dispatch(
            TxAdd(TX_HASH_TWO, {
                from: FROM_ADDRESS_BOB,
                to: TO_ADDRESS_LISA
            })
        );

        this.store.dispatch(
            TxAdd(TX_HASH_THREE, {
                from: FROM_ADDRESS_MIKE,
                to: TO_ADDRESS_LISA
            })
        );

        this.store.dispatch(
            TxAdd(TX_HASH_FOUR, {
                from: FROM_ADDRESS_MARC,
                to: TO_ADDRESS_MARIE
            })
        );

        expect(getTransactions(this.store.getState(), {from: FROM_ADDRESS_BOB}))
            .toHaveLength(2);

    });

    it('Use addTransaction helper', function (): void {

        addTransaction(this.store.dispatch, TX_HASH_ONE);

        expect(getTransaction(this.store.getState(), TX_HASH_ONE)).toBeDefined();

    });

    it('Use removeTransaction helper', function (): void {

        addTransaction(this.store.dispatch, TX_HASH_ONE);
        removeTransaction(this.store.dispatch, TX_HASH_ONE);

        expect(getTransaction(this.store.getState(), TX_HASH_ONE)).not.toBeDefined();

    });

    it('Use sendTransaction helper', async function (): Promise<void> {

        const web3: Web3 = buildTestWeb3(1);
        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);
        const initial_length: number = this.store.getState().vtxevents.length;
        const id: number = sendTransaction(this.store.dispatch, {
            from: FROM_ADDRESS_MIKE,
            to: TO_ADDRESS_GEORGE,
            value: '123',
            gasPrice: '123456'
        });

        await vtx_event(this.store, initial_length, VtxeventsTypes.TxBroadcasted, 10);
        await ganache_mine(web3, 10);
        await vtx_event(this.store, initial_length, VtxeventsTypes.TxConfirmed, 10);
        const tx: Tx = getTransactionById(this.store.getState(), id);

        if (tx === undefined) {
            throw new Error('Should not return undefined when requesting tx by its id')
        }

    }).timeout(60000);

    it('Use sendTransaction helper, reset and check transaction', async function (): Promise<void> {

        const web3: Web3 = buildTestWeb3();
        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);
        const initial_length: number = this.store.getState().vtxevents.length;
        sendTransaction(this.store.dispatch, {
            from: FROM_ADDRESS_MIKE,
            to: TO_ADDRESS_GEORGE,
            value: '123',
            gasPrice: '123456'
        });

        await vtx_event(this.store, initial_length, VtxeventsTypes.TxBroadcasted, 10);
        init(this.store.dispatch, web3);
        await vtx_state_check(this.store, 'txs', {}, 50);

    });

    it('Use followTransaction helper', async function (): Promise<void> {

        const web3: Web3 = buildTestWeb3();
        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);
        const initial_length: number = this.store.getState().vtxevents.length;
        const out_tx = await web3.eth.sendTransaction({
            from: FROM_ADDRESS_MIKE,
            to: TO_ADDRESS_GEORGE,
            value: '123',
            gasPrice: '123456'
        });
        const id: number = followTransaction(
            this.store.dispatch,
            out_tx.transactionHash
        );

        await vtx_event(this.store, initial_length, VtxeventsTypes.TxFollowed, 10);
        await ganache_mine(web3, 10);
        await vtx_event(this.store, initial_length, VtxeventsTypes.TxConfirmed, 10);
        const tx: Tx = getTransactionById(this.store.getState(), id);

        if (tx === undefined) {
            throw new Error('Should not return undefined when requesting tx by its id');
        }

    });
});
