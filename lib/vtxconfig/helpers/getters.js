"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVtxStatus = function (state) {
    return state.vtxconfig.status;
};
exports.getVtxLastError = function (state) {
    return state.vtxconfig.last_error;
};
exports.getWeb3 = function (state) {
    return state.vtxconfig.web3;
};
//# sourceMappingURL=getters.js.map