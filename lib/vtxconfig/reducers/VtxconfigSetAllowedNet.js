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
exports.VtxconfigSetAllowedNetReducer = function (state, action) {
    var _a, _b;
    return (__assign(__assign({}, state), { allowed_nets: state.allowed_nets !== null
            ? __assign(__assign({}, state.allowed_nets), (_a = {}, _a[action.net_id] = action.genesis_hash, _a)) : (_b = {},
            _b[action.net_id] = action.genesis_hash,
            _b) }));
};
