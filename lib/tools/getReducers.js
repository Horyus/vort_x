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
var redux_1 = require("redux");
var reducers_1 = require("../txs/reducers");
var reducers_2 = require("../vtxconfig/reducers");
var reducers_3 = require("../vtxevents/reducers");
var reducers_4 = require("../vtxpoll/reducers");
var reducers_5 = require("../contracts/reducers");
var reducers_6 = require("../blocks/reducers");
var reducers_7 = require("../vtxcache/reducers");
var reducers_8 = require("../accounts/reducers");
var reducers_9 = require("../events/reducers");
var VTX_REDUCERS_LIST = ['txs', 'vtxconfig', 'vtxevents', 'vtxpoll', 'contracts', 'blocks', 'vtxcache', 'accounts'];
exports.getReducers = function (custom_reducers) {
    var e_1, _a;
    var final_reducers = {
        txs: reducers_1.TxReducer,
        contracts: reducers_5.ContractsReducer,
        blocks: reducers_6.BlocksReducer,
        accounts: reducers_8.AccountsReducer,
        events: reducers_9.EventsReducer,
        vtxconfig: reducers_2.VtxconfigReducer,
        vtxevents: reducers_3.VtxeventsReducer,
        vtxpoll: reducers_4.VtxpollReducer,
        vtxcache: reducers_7.VtxcacheReducer
    };
    if (!custom_reducers) {
        custom_reducers = {};
    }
    try {
        for (var _b = __values(Object.keys(custom_reducers)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var reducer = _c.value;
            if (VTX_REDUCERS_LIST.indexOf(reducer) !== -1) {
                throw new Error("Invalid reducer " + reducer + ". This reducer name is already used by ethvtx.");
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
    final_reducers = __assign(__assign({}, final_reducers), custom_reducers);
    return redux_1.combineReducers(final_reducers);
};
//# sourceMappingURL=getReducers.js.map