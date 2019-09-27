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
    var _a, _b, _c, _d;
    if (state[action.entity]) {
        return __assign(__assign({}, state), (_a = {}, _a[action.entity] = {
            followed: __assign(__assign({}, state[action.entity].followed), (_b = {}, _b[action.signature] = {
                event: action.event,
                address: action.address,
                arguments: action.arguments,
                signature: action.signature,
                contract: action.contract,
                last_fetched: null
            }, _b)),
            data: __assign({}, state[action.entity].data)
        }, _a));
    }
    else {
        return __assign(__assign({}, state), (_c = {}, _c[action.entity] = {
            followed: (_d = {},
                _d[action.signature] = {
                    event: action.event,
                    address: action.address,
                    arguments: action.arguments,
                    signature: action.signature,
                    contract: action.contract,
                    last_fetched: null
                },
                _d),
            data: {}
        }, _c));
    }
};
//# sourceMappingURL=EventsFollow.js.map