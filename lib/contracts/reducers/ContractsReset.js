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
var reset_instances = function (instances, web3) {
    var e_1, _a, e_2, _b;
    try {
        for (var _c = __values(Object.keys(instances)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var contract = _d.value;
            try {
                for (var _e = (e_2 = void 0, __values(Object.keys(instances[contract]))), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var instance = _f.value;
                    if (!instances[contract][instance].permanent)
                        delete instances[contract][instance];
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (!Object.keys(instances[contract]).length)
                delete instances[contract];
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return instances;
};
var reset_specs = function (specs) {
    var e_3, _a;
    try {
        for (var _b = __values(Object.keys(specs)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var contract = _c.value;
            if (!specs[contract].permanent)
                delete specs[contract];
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return specs;
};
var reset_alias = function (aliases) {
    var e_4, _a, e_5, _b;
    try {
        for (var _c = __values(Object.keys(aliases)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var contract = _d.value;
            try {
                for (var _e = (e_5 = void 0, __values(Object.keys(aliases[contract]))), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var alias = _f.value;
                    if (!aliases[contract][alias].permanent)
                        delete aliases[contract][alias];
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_5) throw e_5.error; }
            }
            if (!Object.keys(aliases[contract]).length)
                delete aliases[contract];
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return aliases;
};
exports.ContractsResetReducer = function (state, action) { return ({
    instances: __assign({}, reset_instances(state.instances, state.web3)),
    specs: __assign({}, reset_specs(state.specs)),
    alias: __assign({}, reset_alias(state.alias)),
    web3: state.web3
}); };
//# sourceMappingURL=ContractsReset.js.map