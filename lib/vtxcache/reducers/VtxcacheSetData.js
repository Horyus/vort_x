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
exports.VtxcacheSetDataReducer = function (state, action) {
    var _a, _b;
    if (!state.store[action.entity]) {
        return __assign({}, state);
    }
    return __assign(__assign({}, state), { store: __assign(__assign({}, state.store), (_a = {}, _a[action.entity] = (_b = {},
            _b[action.signature] = __assign(__assign({}, state.store[action.entity][action.signature]), { data: action.data, block: action.block, required: false }),
            _b), _a)) });
};
//# sourceMappingURL=VtxcacheSetData.js.map