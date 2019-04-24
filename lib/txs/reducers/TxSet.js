"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TxSetReducer = function (state, action) {
    var _a, _b;
    return action.status
        ? __assign({}, state, (_a = {}, _a[action.tx_hash] = __assign({}, state[action.tx_hash], { infos: __assign({}, state[action.tx_hash].infos, action.tx_infos), status: action.status, contract_address: action.contract_address ? action.contract_address : state[action.tx_hash].contract_address }), _a)) : __assign({}, state, (_b = {}, _b[action.tx_hash] = __assign({}, state[action.tx_hash], { infos: __assign({}, state[action.tx_hash].infos, action.tx_infos), contract_address: action.contract_address ? action.contract_address : state[action.tx_hash].contract_address }), _b));
};
