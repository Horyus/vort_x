import { applyMiddleware, compose, createStore, Reducer, Store } from 'redux';
import { getSagas, getReducers, getInitialState, configureVtx }  from 'ethvtx';
import { Saga }                                                  from '@redux-saga/types';
import { State }                                                 from 'ethvtx/lib/state';
import createSagaMiddleware, { SagaMiddleware }                                        from 'redux-saga';

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; }
}

export const createVtxStore = (): Store => {

    const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const initial_state: State = configureVtx(getInitialState(), {
        poll_timer: 200,
        confirmation_threshold: 5
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
