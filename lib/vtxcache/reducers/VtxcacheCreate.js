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
exports.VtxcacheCreateReducer = function (state, action) {
    var _a;
    return (__assign(__assign({}, state), { store: __assign(__assign({}, state.store), (_a = {}, _a[action.signature] = {
            signature: action.signature,
            cb: action.cb,
            block: null,
            required: true,
            data: undefined,
            error: null
        }, _a)) }));
};
