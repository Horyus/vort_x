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
var VtxContract_1 = require("../VtxContract");
exports.ContractsNewReducer = function (state, action) {
    var _a, _b, _c, _d, _e, _f;
    if (!action.alias) {
        return __assign({}, state, { instances: __assign({}, state.instances, (_a = {}, _a[action.contract] = __assign({}, state.instances[action.contract], (_b = {}, _b[action.address] = {
                permament: action.permanent,
                instance: new VtxContract_1.VtxContract(state.web3, action.contract, action.address, state.specs[action.contract].abi, state.specs[action.contract].bin, state.specs[action.contract].constructor_bin)
            }, _b)), _a)), web3: state.web3 });
    }
    return __assign({}, state, { instances: __assign({}, state.instances, (_c = {}, _c[action.contract] = __assign({}, state.instances[action.contract], (_d = {}, _d[action.address] = {
            permament: action.permanent,
            instance: new VtxContract_1.VtxContract(state.web3, action.contract, action.address, state.specs[action.contract].abi, state.specs[action.contract].bin, state.specs[action.contract].constructor_bin)
        }, _d)), _c)), alias: __assign({}, state.alias, (_e = {}, _e[action.contract] = __assign({}, state.alias[action.contract], (_f = {}, _f[action.alias] = {
            address: action.address,
            permanent: action.permanent
        }, _f)), _e)), web3: state.web3 });
};
