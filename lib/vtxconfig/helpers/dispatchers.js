"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions/actions");
exports.init = function (dispatch, web3) {
    dispatch(actions_1.VtxconfigSetWeb3(web3));
    dispatch(actions_1.VtxconfigReset());
};
exports.setWeb3 = function (dispatch, web3) {
    dispatch(actions_1.VtxconfigSetWeb3(web3));
};
exports.reset = function (dispatch) {
    dispatch(actions_1.VtxconfigReset());
};
exports.start = function (dispatch, enable) {
    dispatch(actions_1.VtxconfigReset(enable));
};
exports.setAllowedNet = function (dispatch, net_id, genesis_hash) {
    dispatch(actions_1.VtxconfigSetAllowedNet(net_id, genesis_hash));
};
