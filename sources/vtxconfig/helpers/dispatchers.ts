import { Dispatch }                                                 from 'redux';
import { VtxconfigReset, VtxconfigSetAllowedNet, VtxconfigSetWeb3 } from '../actions/actions';
import { Authorization }                                            from '../actions/actionTypes';

export const init = (dispatch: Dispatch, web3: any): void => {
    dispatch(VtxconfigSetWeb3(web3));
    dispatch(VtxconfigReset());
};

export const setWeb3 = (dispatch: Dispatch, web3: any): void => {
    dispatch(VtxconfigSetWeb3(web3));
};

export const reset = (dispatch: Dispatch): void => {
    dispatch(VtxconfigReset());
};

export const start = (dispatch: Dispatch, enable?: Authorization): void => {
    dispatch(VtxconfigReset(enable));
};

export const setAllowedNet = (dispatch: Dispatch, net_id: number, genesis_hash: string): void => {
    dispatch(VtxconfigSetAllowedNet(net_id, genesis_hash));
};
