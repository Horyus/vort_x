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
var is_alias_1 = require("../../utils/is_alias");
exports.AccountsRemoveReducer = function (state, action) {
    var e_1, _a;
    if (is_alias_1.is_alias(action.address_or_alias)) {
        var address = state.alias[action.address_or_alias];
        delete state.accounts[address];
        delete state.alias[action.address_or_alias];
        return __assign({}, state);
    }
    else {
        try {
            for (var _b = __values(Object.keys(state.alias)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var alias = _c.value;
                if (state.alias[alias] === action.address_or_alias) {
                    delete state.alias[alias];
                    break;
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
        delete state.accounts[action.address_or_alias];
        return __assign({}, state);
    }
};
