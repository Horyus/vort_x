import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import { getInitialState }                                       from '../tools/getInitialState';
import { getReducers }                                           from '../tools/getReducers';
import { getSagas }                                              from '../tools/getSagas';
import { Saga }                                                  from '@redux-saga/types';
import { State }                                                 from '../state/index';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';
import * as Ganache                             from 'ganache-core';
import { configureVtx }                         from '../tools/configureVtx';
import { VtxpollKill }                          from '../vtxpoll/actions/action';
import * as Fs                                  from 'fs';
import { vtx_status }                           from '../test_tools';
import { VtxStatus }                            from '../state/vtxconfig';
import { VtxconfigReset, VtxconfigSetWeb3 }     from './actions/actions';

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
}

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

describe('[vtxconfig]', (): void => {

    beforeAll(() => {
    });

    beforeEach(async () => {
        this.web3 = buildTestWeb3();
        await fetch_net_infos(this.web3, this);
        this.store = buildStore(this.net_id, this.genesis_hash);
    });

    afterEach(() => {
        killStore(this.store);
    });

    test('Resetting store', async () => {

        this.store.dispatch(VtxconfigSetWeb3(this.web3));
        this.store.dispatch(VtxconfigReset());
        await vtx_status(this.store, VtxStatus.Loaded, 20);

        this.store.dispatch(VtxconfigSetWeb3(null));
        this.store.dispatch(VtxconfigReset());
        await vtx_status(this.store, VtxStatus.Idle, 20);
    });

});
