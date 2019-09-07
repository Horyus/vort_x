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
exports.EventsFollowReducer = function (state, action) {
    var _a;
    return (__assign(__assign({}, state), { followed: __assign(__assign({}, state.followed), (_a = {}, _a[action.signature] = {
            event: action.event,
            address: action.address,
            arguments: action.arguments,
            signature: action.signature,
            contract: action.contract,
            last_fetched: null
        }, _a)) }));
};
