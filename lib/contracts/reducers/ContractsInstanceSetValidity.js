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
exports.ContractsInstanceSetValidity = function (state, action) {
    var _a, _b;
    if (state.instances[action.contract_name] && state.instances[action.contract_name][action.contract_address]) {
        return __assign(__assign({}, state), { instances: __assign(__assign({}, state.instances), (_a = {}, _a[action.contract_name] = __assign(__assign({}, state.instances[action.contract_name]), (_b = {}, _b[action.contract_address] = __assign(__assign({}, state.instances[action.contract_name][action.contract_address]), { valid: action.validity }), _b)), _a)) });
    }
    else {
        return state;
    }
};
//# sourceMappingURL=ContractsInstanceSetValidity.js.map