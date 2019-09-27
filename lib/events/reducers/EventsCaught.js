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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsCaughtReducer = function (state, action) {
    var _a, _b, _c, _d;
    if (!state[action.entity]) {
        return __assign({}, state);
    }
    if (state[action.entity].data[action.signature]) {
        return __assign(__assign({}, state), (_a = {}, _a[action.entity] = __assign(__assign({}, state[action.entity]), { data: __assign(__assign({}, state[action.entity].data), (_b = {}, _b[action.signature] = __spread(state[action.entity].data[action.signature], [
                action.infos
            ]), _b)) }), _a));
    }
    else {
        return __assign(__assign({}, state), (_c = {}, _c[action.entity] = __assign(__assign({}, state[action.entity]), { data: __assign(__assign({}, state[action.entity].data), (_d = {}, _d[action.signature] = [
                action.infos
            ], _d)) }), _c));
    }
};
//# sourceMappingURL=EventsCaught.js.map