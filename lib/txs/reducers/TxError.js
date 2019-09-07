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
var txs_1 = require("../../state/txs");
exports.TxErrorReducer = function (state, action) {
    var _a;
    return (__assign(__assign({}, state), (_a = {}, _a[action.tx_hash] = __assign(__assign({}, state[action.tx_hash]), { status: txs_1.TxStatus.Error, e: action.e }), _a)));
};
