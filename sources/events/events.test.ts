import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import { getInitialState }                                       from '../tools/getInitialState';
import { getReducers }                                           from '../tools/getReducers';
import { getSagas }                                              from '../tools/getSagas';
import { Saga }                                                  from '@redux-saga/types';
import { State }                                                 from '../state/index';
import createSagaMiddleware, { SagaMiddleware }                  from 'redux-saga';
import * as expect                                               from 'expect';
import * as Ganache                               from 'ganache-core';
import { VtxeventsTypes }                         from '../state/vtxevents';
import { configureVtx }                           from '../tools/configureVtx';
import { VtxpollKill }                            from '../vtxpoll/actions/action';
import * as Fs                                    from 'fs';
import { getVtxEvents }                           from '../vtxevents/helpers/getters';
import { ganache_mine, vtx_event, vtx_status }    from '../test_tools';
import { init }                                   from '../vtxconfig/helpers/dispatchers';
import { VtxStatus }                              from '../state/vtxconfig';
import { loadContractInstance, loadContractSpec } from '../contracts/helpers/dispatchers';
import { getContract, getContractList }           from '../contracts/helpers/getters';
import { VtxContract }                            from '../contracts/VtxContract';
import { vtx_valid_instance }                                    from '../test_tools/vtx_valid_contract';
import { vtx_evm_event }                                         from '../test_tools/vtx_evm_event';
import { vtx_evm_event_height }                                  from '../test_tools/vtx_evm_event_height';

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
    blockTime: time,
    gasLimit: 0xffffffffff
});

const buildTestWeb3 = (time?: number): Web3 => {
    const web3 = new Web3(Ganache.provider(GANACHE_ARGS(time)));
    web3.currentProvider.setMaxListeners(300);
    return web3;
}

const contracts: any = {};

const compile_contract = (): void => {
    const input = {
        language: 'Solidity',
        sources: {
            'ValueStore.sol': {
                content: Fs.readFileSync('./sources/events/test_material/ValueStore.sol').toString()
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

describe('[events]', (): void => {

    before(function (): void {
        compile_contract();
    });

    beforeEach(function (): void {
        this.store = buildStore();
    });

    afterEach(function (): void {
        killStore(this.store);
    });

    it('Loads a spec, deploys instance, loads instance, get evm events', async function (): Promise<void> {

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object,
            permanent: true
        });

        const web3 = buildTestWeb3();
        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        const contract = new web3.eth.Contract(contracts.ValueStore.abi);

        const accounts = await web3.eth.getAccounts();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: accounts[0],
            gas: 0xffffff
        });

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {
            alias: '@default',
            permanent: true
        });

        await vtx_event(this.store, 0, VtxeventsTypes.ContractsInstanceAdded, 10);
        const add_events = getVtxEvents(this.store.getState(), VtxeventsTypes.ContractsInstanceAdded);

        expect(add_events).toHaveLength(1);
        expect((<any> add_events[0]).contract).toEqual('ValueStore');
        expect((<any> add_events[0]).address).toEqual(deployed.options.address);

        expect(getContract(this.store, 'ValueStore', deployed.options.address)).toBeDefined();
        expect(getContract(this.store, 'ValueStore', '@default')).toBeDefined();
        expect(getContractList(this.store.getState())['ValueStore'][0]).toEqual(deployed.options.address);

        await vtx_valid_instance(this.store, 'ValueStore', deployed.options.address);

        let vtxContract = getContract(this.store, 'ValueStore', '@default');

        vtxContract.events.ValueChanged();

        const entity = VtxContract.entity_sig('ValueStore', deployed.options.address);

        await vtx_evm_event(this.store, entity, VtxContract.event_sig('ValueStore', (<any> vtxContract)._address, 'ValueChanged', undefined), 1, 50);

        vtxContract = getContract(this.store, 'ValueStore', '@default');

        const end = vtxContract.events.ValueChanged();
        expect(end).toHaveLength(1);
    });

    it('Loads a spec, deploys instance, loads instance, get evm events with filter', async function (): Promise<void> {

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object,
            permanent: true
        });

        const web3 = buildTestWeb3();
        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        const contract = new web3.eth.Contract(contracts.ValueStore.abi);

        const accounts = await web3.eth.getAccounts();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: accounts[0],
            gas: 0xffffff
        });

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {
            alias: '@default',
            permanent: true
        });

        await vtx_event(this.store, 0, VtxeventsTypes.ContractsInstanceAdded, 10);
        const add_events = getVtxEvents(this.store.getState(), VtxeventsTypes.ContractsInstanceAdded);

        expect(add_events).toHaveLength(1);
        expect((<any> add_events[0]).contract).toEqual('ValueStore');
        expect((<any> add_events[0]).address).toEqual(deployed.options.address);

        expect(getContract(this.store, 'ValueStore', deployed.options.address)).toBeDefined();
        expect(getContract(this.store, 'ValueStore', '@default')).toBeDefined();
        expect(getContractList(this.store.getState())['ValueStore'][0]).toEqual(deployed.options.address);

        await vtx_valid_instance(this.store, 'ValueStore', deployed.options.address);

        let vtxContract = getContract(this.store, 'ValueStore', '@default');

        const args = {
            _who: accounts[0]
        };

        vtxContract.events.ValueChanged(args);

        const entity = VtxContract.entity_sig('ValueStore', deployed.options.address);

        await vtx_evm_event(this.store, entity, VtxContract.event_sig('ValueStore', (<any> vtxContract)._address, 'ValueChanged', args), 1, 50);

        vtxContract = getContract(this.store, 'ValueStore', '@default');

        const end = vtxContract.events.ValueChanged(args);
        expect(end).toHaveLength(1);
    });

    it('Loads a spec, deploys instance, loads instance, get evm events with invalid filter', async function (): Promise<void> {

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object,
            permanent: true
        });

        const web3 = buildTestWeb3();
        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        const contract = new web3.eth.Contract(contracts.ValueStore.abi);

        const accounts = await web3.eth.getAccounts();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: accounts[0],
            gas: 0xffffff
        });

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {
            alias: '@default',
            permanent: true
        });

        await vtx_event(this.store, 0, VtxeventsTypes.ContractsInstanceAdded, 10);
        const add_events = getVtxEvents(this.store.getState(), VtxeventsTypes.ContractsInstanceAdded);

        expect(add_events).toHaveLength(1);
        expect((<any> add_events[0]).contract).toEqual('ValueStore');
        expect((<any> add_events[0]).address).toEqual(deployed.options.address);

        expect(getContract(this.store, 'ValueStore', deployed.options.address)).toBeDefined();
        expect(getContract(this.store, 'ValueStore', '@default')).toBeDefined();
        expect(getContractList(this.store.getState())['ValueStore'][0]).toEqual(deployed.options.address);

        await vtx_valid_instance(this.store, 'ValueStore', deployed.options.address);

        let vtxContract = getContract(this.store, 'ValueStore', '@default');

        const args = {
            _who: accounts[1]
        };

        vtxContract.events.ValueChanged(args);

        const entity = VtxContract.entity_sig('ValueStore', deployed.options.address);

        await vtx_evm_event_height(this.store, entity, VtxContract.event_sig('ValueStore', (<any> vtxContract)._address, 'ValueChanged', args), 1, 50);

        vtxContract = getContract(this.store, 'ValueStore', '@default');

        const end = vtxContract.events.ValueChanged(args);
        expect(end).toHaveLength(0);
    });

    it('Loads a spec, deploys instance, loads instance, get evm events with filters, do transactions', async function (): Promise<void> {

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object,
            permanent: true
        });

        const web3 = buildTestWeb3();
        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        const contract = new web3.eth.Contract(contracts.ValueStore.abi);

        const accounts = await web3.eth.getAccounts();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: accounts[0],
            gas: 0xffffff
        });

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {
            alias: '@default',
            permanent: true
        });

        await vtx_event(this.store, 0, VtxeventsTypes.ContractsInstanceAdded, 10);
        const add_events = getVtxEvents(this.store.getState(), VtxeventsTypes.ContractsInstanceAdded);

        expect(add_events).toHaveLength(1);
        expect((<any> add_events[0]).contract).toEqual('ValueStore');
        expect((<any> add_events[0]).address).toEqual(deployed.options.address);

        expect(getContract(this.store, 'ValueStore', deployed.options.address)).toBeDefined();
        expect(getContract(this.store, 'ValueStore', '@default')).toBeDefined();
        expect(getContractList(this.store.getState())['ValueStore'][0]).toEqual(deployed.options.address);

        await vtx_valid_instance(this.store, 'ValueStore', deployed.options.address);

        let vtxContract = getContract(this.store, 'ValueStore', '@default');

        const args_zero = {
            _who: accounts[0]
        };

        vtxContract.events.ValueChanged(args_zero);

        const args_one = {
            _who: accounts[1]
        };

        vtxContract.events.ValueChanged(args_one);

        vtxContract.fn.setValue(3, {
            from: accounts[1]
        });

        vtxContract.fn.setValue(4, {
            from: accounts[0]
        });

        const entity = VtxContract.entity_sig('ValueStore', deployed.options.address);

        await vtx_evm_event_height(this.store, entity, VtxContract.event_sig('ValueStore', (<any> vtxContract)._address, 'ValueChanged', args_zero), 3, 50);
        await vtx_evm_event_height(this.store, entity, VtxContract.event_sig('ValueStore', (<any> vtxContract)._address, 'ValueChanged', args_one), 3, 50);

        vtxContract = getContract(this.store, 'ValueStore', '@default');

        const end_zero = vtxContract.events.ValueChanged(args_zero);
        const end_one = vtxContract.events.ValueChanged(args_one);

        expect(end_zero).toHaveLength(2);
        expect(end_one).toHaveLength(1);
    }).timeout(20000);
});
