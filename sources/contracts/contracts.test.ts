import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import { getInitialState }                                       from '../tools/getInitialState';
import { getReducers }                                           from '../tools/getReducers';
import { getSagas }                                              from '../tools/getSagas';
import { Saga }                                                  from '@redux-saga/types';
import { State }                                                 from '../state/index';
import createSagaMiddleware, { SagaMiddleware }                  from 'redux-saga';
import * as Ganache                                              from 'ganache-core';
import { VtxeventsTypes }                                        from '../state/vtxevents';
import { configureVtx }                                          from '../tools/configureVtx';
import { VtxpollKill }                                           from '../vtxpoll/actions/action';
import * as Fs                                                   from 'fs';
import {
    loadContractInstance,
    loadContractSpec,
    removeContractInstance,
    removeContractSpec
}                                                                from './helpers/dispatchers';
import { getContract, getContractList, getContractsSpecList }    from './helpers/getters';
import { getVtxEvents }                                          from '../vtxevents/helpers/getters';
import { VtxContract }                         from './VtxContract';
import { ganache_mine, vtx_event, vtx_status } from '../test_tools';
import {
    init,
    setWeb3,
    start
}                                              from '../vtxconfig/helpers/dispatchers';
import { vtx_valid_instance }                  from '../test_tools/vtx_valid_contract';
import { getTransactionById }                  from '../txs/helpers/getters';
import { VtxStatus }                           from '../state/vtxconfig';
import { getAccount }                          from '../accounts/helpers/getters';

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

describe('[contracts]', (): void => {

    beforeAll(() => {
        compile_contract();
    });

    beforeEach(() => {
        this.store = buildStore();
        VtxContract.init(this.store);
    });

    afterEach(() => {
        killStore(this.store);
    });

    test('Loads a contract spec', async () => {

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi);

        const events = getVtxEvents(this.store.getState(), VtxeventsTypes.ContractsSpecAdded);

        expect(events).toHaveLength(1);

        const spec_list: string[] = getContractsSpecList(this.store.getState());

        expect(spec_list).toHaveLength(1);
        expect(spec_list[0]).toEqual('ValueStore');

    });

    test('Loads a contract spec then remove it', async () => {

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object,
            permanent: true
        });

        const add_events = getVtxEvents(this.store.getState(), VtxeventsTypes.ContractsSpecAdded);

        expect(add_events).toHaveLength(1);

        removeContractSpec(this.store.dispatch, 'ValueStore');

        const remove_events = getVtxEvents(this.store.getState(), VtxeventsTypes.ContractsSpecRemoved);

        expect(remove_events).toHaveLength(1);

        const spec_list: string[] = getContractsSpecList(this.store.getState());

        expect(spec_list).toHaveLength(0);

    });

    test('Loads a spec, deploys instance, loads instance', async () => {

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object,
            permanent: true
        });

        const web3 = buildTestWeb3();
        const contract = new  web3.eth.Contract(contracts.ValueStore.abi);

        const coinbase = await web3.eth.getCoinbase();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: coinbase,
            gas: 0xffffff
        });

        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {alias: '@default', permanent: true});
        expect(getContract(this.store.getState(), 'ValueStore', '@default').fn).toBeDefined();

        await vtx_event(this.store, 0, VtxeventsTypes.ContractsInstanceAdded, 10);
        const add_events = getVtxEvents(this.store.getState(), VtxeventsTypes.ContractsInstanceAdded);

        expect(add_events).toHaveLength(1);
        expect((<any> add_events[0]).contract).toEqual('ValueStore');
        expect((<any> add_events[0]).address).toEqual(deployed.options.address);

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeDefined();
        expect(getContract(this.store.getState(), 'ValueStore', '@default')).toBeDefined();
        expect(getContractList(this.store.getState())['ValueStore'][0]).toEqual(deployed.options.address);

    });

    test('Loads a spec, deploys instance, loads instance with permanent, alias and balance, check accounts', async () => {

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object,
            permanent: true
        });

        const web3 = buildTestWeb3();
        const contract = new  web3.eth.Contract(contracts.ValueStore.abi);

        const coinbase = await web3.eth.getCoinbase();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: coinbase,
            gas: 0xffffff
        });

        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {alias: '@default', permanent: true, balance: true});

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeDefined();
        expect(getContract(this.store.getState(), 'ValueStore', '@default')).toBeDefined();
        expect(getContractList(this.store.getState())['ValueStore'][0]).toEqual(deployed.options.address);
        expect(this.store.getState().contracts.alias.ValueStore['@default']).toBeDefined();
        expect(getAccount(this.store.getState(), '@default')).toBeDefined();
        expect(getAccount(this.store.getState(), deployed.options.address)).toBeDefined();

    });

    test('Loads a spec, deploys instance, loads instance with alias, remove instance with alias', async () => {

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object,
            permanent: true
        });

        const web3 = buildTestWeb3();
        const contract = new  web3.eth.Contract(contracts.ValueStore.abi);

        const coinbase = await web3.eth.getCoinbase();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: coinbase,
            gas: 0xffffff
        });

        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {alias: '@default', permanent: true});

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeDefined();
        expect(getContract(this.store.getState(), 'ValueStore', '@default')).toBeDefined();
        expect(getContractList(this.store.getState())['ValueStore'][0]).toEqual(deployed.options.address);
        expect(this.store.getState().contracts.alias.ValueStore['@default']).toBeDefined();

        removeContractInstance(this.store.dispatch, 'ValueStore', '@default');

        const remove_events = getVtxEvents(this.store.getState(), VtxeventsTypes.ContractsInstanceRemoved);

        expect(remove_events).toHaveLength(1);
        expect((<any> remove_events[0]).contract).toEqual('ValueStore');
        expect((<any> remove_events[0]).address).toEqual('@default');

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeUndefined();
        expect(getContract(this.store.getState(), 'ValueStore', '@default')).toBeUndefined();
        expect(Object.keys(getContractList(this.store.getState()))).toHaveLength(0);
        expect(this.store.getState().contracts.alias.ValueStore).toBeUndefined();

    });

    test('Loads a spec, deploys instance, loads instance, reset, nothing should be there', async () => {

        const web3 = buildTestWeb3();
        const contract = new  web3.eth.Contract(contracts.ValueStore.abi);

        const coinbase = await web3.eth.getCoinbase();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: coinbase,
            gas: 0xffffff
        });

        init(this.store.dispatch, web3);

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object
        });

        await vtx_status(this.store, VtxStatus.Loaded, 10);

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address);

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeDefined();

        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeUndefined();

    });

    test('Loads a spec, deploys instance, loads instance, reset, only instance remains', async () => {

        const web3 = buildTestWeb3();

        const contract = new  web3.eth.Contract(contracts.ValueStore.abi);

        const coinbase = await web3.eth.getCoinbase();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: coinbase,
            gas: 0xffffff
        });

        init(this.store.dispatch, web3);

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object
        });

        await vtx_status(this.store, VtxStatus.Loaded, 10);
        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {permanent: true});

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeDefined();

        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeDefined();

    });

    test('set web3, Loads a spec with invalid bin, deploys instance, loads instance, init, Wrong Net status', async () => {

        const web3 = buildTestWeb3();
        const contract = new  web3.eth.Contract(contracts.ValueStore.abi);

        const coinbase = await web3.eth.getCoinbase();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: coinbase,
            gas: 0xffffff
        });

        setWeb3(this.store.dispatch, web3);

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: '00ee',
            permanent: true
        });

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {permanent: true});

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeDefined();

        start(this.store.dispatch);
        await vtx_status(this.store, VtxStatus.WrongNet, 10);

    });

    test('set web3, Loads a spec with invalid bin, deploys instance, loads instance, init, Loaded Status', async () => {

        const web3 = buildTestWeb3();
        const contract = new  web3.eth.Contract(contracts.ValueStore.abi);

        const coinbase = await web3.eth.getCoinbase();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: coinbase,
            gas: 0xffffff
        });

        setWeb3(this.store.dispatch, web3);

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object,
            permanent: true
        });

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {permanent: true});

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeDefined();

        start(this.store.dispatch);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

    });

    test('set web3, Loads a spec with invalid bin, deploys instance, loads instance, init, Loaded Status, switch to empty net, WrongNet, switch back, Loaded', async () => {

        const web3 = buildTestWeb3();
        const contract = new  web3.eth.Contract(contracts.ValueStore.abi);

        const coinbase = await web3.eth.getCoinbase();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: coinbase,
            gas: 0xffffff
        });

        setWeb3(this.store.dispatch, web3);

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object,
            permanent: true
        });

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {permanent: true});

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeDefined();

        start(this.store.dispatch);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        const empty_new_web3 = new Web3(Ganache.provider(GANACHE_ARGS(0)));

        // By switching to this empty net, vortex will check for bin stored at instances addresses, none will be found and inalid net will throw
        init(this.store.dispatch, empty_new_web3);
        await vtx_status(this.store, VtxStatus.WrongNet, 10);

        // By coming back, the status is now ok
        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        expect(getContract(this.store.getState(), 'ValueStore', deployed.options.address)).toBeDefined();

        const spec_list: string[] = getContractsSpecList(this.store.getState());

        expect(spec_list).toHaveLength(1);
        expect(spec_list[0]).toEqual('ValueStore');
    });

    test('Loads a spec, deploys instance, loads instance, make tx call', async () => {

        loadContractSpec(this.store.dispatch, 'ValueStore', contracts.ValueStore.abi, {
            bin: contracts.ValueStore.evm.deployedBytecode.object,
            permanent: true
        });

        const web3 = buildTestWeb3();
        const contract = new  web3.eth.Contract(contracts.ValueStore.abi);

        const coinbase = await web3.eth.getCoinbase();
        const deployed = await contract.deploy({
            arguments: [5],
            data: contracts.ValueStore.evm.bytecode.object
        }).send({
            from: coinbase,
            gas: 0xffffff
        });

        init(this.store.dispatch, web3);
        await vtx_status(this.store, VtxStatus.Loaded, 10);

        loadContractInstance(this.store.dispatch, 'ValueStore', deployed.options.address, {alias: '@default', permanent: true});

        const vtxc = getContract(this.store.getState(), 'ValueStore', '@default');

        const initial_length: number = this.store.getState().vtxevents.length;
        await vtx_valid_instance(this.store, 'ValueStore', deployed.options.address);

        const id = vtxc.fn.setValue(3);

        await vtx_event(this.store, initial_length, VtxeventsTypes.ContractsTxBroadcasted, 10);
        await ganache_mine(web3, 10);
        await vtx_event(this.store, initial_length, VtxeventsTypes.TxConfirmed, 10);

        const send_event = getVtxEvents(this.store.getState(), VtxeventsTypes.ContractsTxBroadcasted);

        expect(send_event).toHaveLength(1);

        const broad: any = send_event[0];

        expect(broad.contract).toEqual('ValueStore');
        expect(broad.method).toEqual('setValue');
        expect(broad.args).toEqual([3]);

        const conf_event = getVtxEvents(this.store.getState(), VtxeventsTypes.TxConfirmed);

        expect(conf_event).toHaveLength(1);

        const conf: any = conf_event[0];

        expect(conf.tx_hash).toEqual(broad.tx_hash);

        const tx = getTransactionById(this.store.getState(), id);

        expect(tx.hash).toEqual(broad.tx_hash);
    });
});
