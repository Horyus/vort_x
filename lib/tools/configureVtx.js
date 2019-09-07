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
exports.configureVtx = function (initialState, config) {
    return (__assign(__assign({}, initialState), { vtxconfig: __assign(__assign({}, initialState.vtxconfig), { poll_timer: config.poll_timer || initialState.vtxconfig.poll_timer, confirmation_threshold: config.confirmation_threshold || initialState.vtxconfig.confirmation_threshold, allowed_nets: config.allowed_nets || initialState.vtxconfig.allowed_nets }) }));
};
