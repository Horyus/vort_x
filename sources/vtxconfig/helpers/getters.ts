import { State }     from '../../state';
import Web3 = require('web3');

export const getVtxStatus = (state: State): string =>
    state.vtxconfig.status;

export const getVtxLastError = (state: State): Error =>
    state.vtxconfig.last_error;

export const getWeb3 = (state: State): Web3 =>
    state.vtxconfig.web3;
