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
exports.ContractsRemoveSoecReducer = function (state, action) {
    var _a;
    return (__assign(__assign({}, state), { specs: __assign(__assign({}, state.specs), (_a = {}, _a[action.name] = undefined, _a)), web3: state.web3 }));
};
//# sourceMappingURL=ContractsRemoveSpec.js.map