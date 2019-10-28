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
exports.ContractsSetWeb3Instance = function (state, action) {
    var _a, _b, _c, _d;
    var spec = state.specs[action.contract_name];
    var web3 = state.web3;
    if (action.clear) {
        return __assign(__assign({}, state), { instances: __assign(__assign({}, state.instances), (_a = {}, _a[action.contract_name] = __assign(__assign({}, state.instances[action.contract_name]), (_b = {}, _b[action.contract_address] = __assign(__assign({}, state.instances[action.contract_name][action.contract_address]), { web3_instance: null }), _b)), _a)) });
    }
    return __assign(__assign({}, state), { instances: __assign(__assign({}, state.instances), (_c = {}, _c[action.contract_name] = __assign(__assign({}, state.instances[action.contract_name]), (_d = {}, _d[action.contract_address] = __assign(__assign({}, state.instances[action.contract_name][action.contract_address]), { web3_instance: web3 ? new web3.eth.Contract(spec.abi, action.contract_address) : null }), _d)), _c)) });
};
//# sourceMappingURL=ContractsSetWeb3Instance.js.map