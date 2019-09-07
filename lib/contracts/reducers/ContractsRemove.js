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
var is_alias_1 = require("../../utils/is_alias");
exports.ContractsRemoveReducer = function (state, action) {
    var address = action.address_or_alias;
    if (is_alias_1.is_alias(action.address_or_alias)) {
        address = state.alias[action.contract][action.address_or_alias].address;
        delete state.alias[action.contract][action.address_or_alias];
        if (Object.keys(state.alias[action.contract]).length === 0) {
            delete state.alias[action.contract];
        }
    }
    delete state.instances[action.contract][address];
    if (Object.keys(state.instances[action.contract]).length === 0) {
        delete state.instances[action.contract];
    }
    return __assign(__assign({}, state), { instances: __assign({}, state.instances), alias: __assign({}, state.alias), web3: state.web3 });
};
