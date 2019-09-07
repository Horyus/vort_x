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
var vtxconfig_1 = require("../../state/vtxconfig");
exports.VtxconfigResetReducer = function (state, action) {
    return (__assign(__assign({}, state), { status: vtxconfig_1.VtxStatus.Loading }));
};
