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
exports.EventsSetHeightReducer = function (state, action) {
    var _a, _b;
    if (!state[action.entity]) {
        return __assign({}, state);
    }
    return __assign(__assign({}, state), (_a = {}, _a[action.entity] = __assign(__assign({}, state[action.entity]), { followed: __assign(__assign({}, state[action.entity].followed), (_b = {}, _b[action.signature] = __assign(__assign({}, state[action.entity].followed[action.signature]), { last_fetched: action.new_height }), _b)) }), _a));
};
//# sourceMappingURL=EventsSetHeight.js.map