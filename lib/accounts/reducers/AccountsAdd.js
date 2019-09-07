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
exports.AccountsAddReducer = function (state, action) {
    var _a, _b, _c;
    if (action.alias) {
        return {
            accounts: __assign(__assign({}, state.accounts), (_a = {}, _a[action.address] = {
                address: action.address,
                balance: null,
                transaction_count: null,
                contract: null,
                permanent: !!action.permanent
            }, _a)),
            alias: __assign(__assign({}, state.alias), (_b = {}, _b[action.alias] = action.address, _b))
        };
    }
    else {
        return __assign(__assign({}, state), { accounts: __assign(__assign({}, state.accounts), (_c = {}, _c[action.address] = {
                address: action.address,
                balance: null,
                transaction_count: null,
                contract: null,
                permanent: !!action.permanent
            }, _c)) });
    }
};
