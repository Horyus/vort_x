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
exports.ContractsAddSpecReducer = function (state, action) {
    var _a;
    return (__assign(__assign({}, state), { specs: __assign(__assign({}, state.specs), (_a = {}, _a[action.name] = {
            name: action.name,
            abi: action.abi,
            bin: action.bin,
            permanent: action.permanent,
            constructor_bin: action.constructor_bin
        }, _a)), web3: state.web3 }));
};
