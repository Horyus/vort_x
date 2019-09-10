"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("./actionTypes");
exports.VtxconfigSetAllowedNet = function (net_id, genesis_hash) { return ({
    type: actionTypes_1.VtxconfigActions.VtxconfigSetAllowedNet,
    net_id: net_id,
    genesis_hash: genesis_hash
}); };
exports.VtxconfigSetWeb3 = function (web3) { return ({
    type: actionTypes_1.VtxconfigActions.VtxconfigSetWeb3,
    web3: web3,
}); };
exports.VtxconfigSetStatus = function (status) { return ({
    type: actionTypes_1.VtxconfigActions.VtxconfigSetStatus,
    status: status
}); };
exports.VtxconfigReset = function () { return ({
    type: actionTypes_1.VtxconfigActions.VtxconfigReset
}); };
exports.VtxconfigResetSectionComplete = function (section) { return ({
    type: actionTypes_1.VtxconfigActions.VtxconfigResetSectionComplete,
    section: section
}); };
exports.VtxconfigResetComplete = function () { return ({
    type: actionTypes_1.VtxconfigActions.VtxconfigResetComplete
}); };
exports.VtxconfigSetInfos = function (coinbase, net) { return ({
    type: actionTypes_1.VtxconfigActions.VtxconfigSetInfos,
    coinbase: coinbase,
    net: net
}); };
exports.VtxconfigAuthorizeAndSetWeb3 = function (authorization, cb) { return ({
    type: actionTypes_1.VtxconfigActions.VtxconfigAuthorizeAndSetWeb3,
    authorization: authorization,
    cb: cb
}); };
//# sourceMappingURL=actions.js.map