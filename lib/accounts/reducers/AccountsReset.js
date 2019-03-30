"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ResetNonPermanentAccounts = function (accounts) {
    var e_1, _a;
    var ret = {};
    try {
        for (var _b = __values(Object.keys(accounts)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (accounts[key].permanent) {
                ret[key] = accounts[key];
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
    return ret;
};
var ResetNonPermanentAliases = function (accounts, aliases) {
    var e_2, _a;
    var ret = {};
    try {
        for (var _b = __values(Object.keys(aliases)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            if (accounts[aliases[key]].permanent) {
                ret[key] = aliases[key];
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_2) throw e_2.error; }
    }
    return ret;
};
exports.AccountsResetReducer = function (state, action) { return ({
    accounts: ResetNonPermanentAccounts(state.accounts),
    alias: ResetNonPermanentAliases(state.accounts, state.alias)
}); };
