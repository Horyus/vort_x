import { Dispatch }                                                 from 'redux';
import {
    VtxconfigAuthorizeAndSetWeb3,
    VtxconfigReset,
    VtxconfigSetAllowedNet,
    VtxconfigSetWeb3
} from '../actions/actions';
import { Authorization }                                            from '../actions/actionTypes';

export const init = (dispatch: Dispatch, web3: any): void => {
    dispatch(VtxconfigSetWeb3(web3));
    dispatch(VtxconfigReset());
};

export const authorizeAndSetWeb3 = async (dispatch: Dispatch, authorization: Authorization): Promise<void> => {
    let cb;

    const ret = new Promise<void>((ok: any, ko: any): void => {
        cb = ok;
    });

    dispatch(VtxconfigAuthorizeAndSetWeb3(authorization, cb));

    return ret;
};

export const setWeb3 = (dispatch: Dispatch, web3: any): void => {
    dispatch(VtxconfigSetWeb3(web3));
};

export const reset = (dispatch: Dispatch): void => {
    dispatch(VtxconfigReset());
};

export const start = (dispatch: Dispatch): void => {
    dispatch(VtxconfigReset());
};

export const setAllowedNet = (dispatch: Dispatch, net_id: number, genesis_hash: string): void => {
    dispatch(VtxconfigSetAllowedNet(net_id, genesis_hash));
};
