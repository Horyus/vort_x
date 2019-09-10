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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../state/index");
var VTX_SECTIONS_LIST = ['txs', 'vtxconfig', 'vtxevents', 'vtxpoll', 'contracts', 'blocks', 'vtxcache', 'accounts'];
exports.getInitialState = function (custom_state) {
    var e_1, _a;
    if (custom_state) {
        try {
            for (var _b = __values(Object.keys(custom_state)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var section = _c.value;
                if (VTX_SECTIONS_LIST.indexOf(section) !== -1) {
                    throw new Error("Invalid state section name " + section + ". This state section name is already used by ethvtx.");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return __assign(__assign({}, index_1.InitialState), custom_state);
    }
    return index_1.InitialState;
};
//# sourceMappingURL=getInitialState.js.map