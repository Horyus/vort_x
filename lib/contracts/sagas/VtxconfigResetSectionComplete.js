"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var effects_1 = require("redux-saga/effects");
var actions_1 = require("../actions/actions");
var actions_2 = require("../../vtxconfig/actions/actions");
var check_code_at_1 = require("../../utils/check_code_at");
var state_1 = require("../../state");
function ValidateInstances() {
    var state, _a, _b, contract, _c, _d, instance, spec, valid, e_1_1, e_2_1;
    var e_2, _e, e_1, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _g.sent();
                _g.label = 2;
            case 2:
                _g.trys.push([2, 16, 17, 18]);
                _a = __values(Object.keys(state.contracts.instances)), _b = _a.next();
                _g.label = 3;
            case 3:
                if (!!_b.done) return [3 /*break*/, 15];
                contract = _b.value;
                _g.label = 4;
            case 4:
                _g.trys.push([4, 12, 13, 14]);
                _c = (e_1 = void 0, __values(Object.keys(state.contracts.instances[contract]))), _d = _c.next();
                _g.label = 5;
            case 5:
                if (!!_d.done) return [3 /*break*/, 11];
                instance = _d.value;
                spec = state.contracts.specs[contract];
                return [4 /*yield*/, effects_1.call(check_code_at_1.check_code_at, state.vtxconfig.web3, instance, spec.bin)];
            case 6:
                valid = _g.sent();
                if (!!valid) return [3 /*break*/, 8];
                return [4 /*yield*/, effects_1.put(actions_2.VtxconfigSetStatus(state_1.VtxStatus.WrongNet))];
            case 7:
                _g.sent();
                return [2 /*return*/];
            case 8: return [4 /*yield*/, effects_1.put(actions_1.ContractsInstanceSetValidity(contract, instance, valid))];
            case 9:
                _g.sent();
                _g.label = 10;
            case 10:
                _d = _c.next();
                return [3 /*break*/, 5];
            case 11: return [3 /*break*/, 14];
            case 12:
                e_1_1 = _g.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 14];
            case 13:
                try {
                    if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 14:
                _b = _a.next();
                return [3 /*break*/, 3];
            case 15: return [3 /*break*/, 18];
            case 16:
                e_2_1 = _g.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 18];
            case 17:
                try {
                    if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 18: return [4 /*yield*/, effects_1.put(actions_2.VtxconfigResetSectionComplete('contracts'))];
            case 19:
                _g.sent();
                return [2 /*return*/];
        }
    });
}
function VtxconfigResetSectionCompleteSaga(action) {
    var state, clear;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(action.section === 'vtxconfig')) return [3 /*break*/, 5];
                return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                clear = state.vtxconfig.web3 === null;
                if (!!clear) return [3 /*break*/, 3];
                return [4 /*yield*/, effects_1.put(actions_1.ContractsReset())];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, effects_1.call(ValidateInstances)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}
exports.VtxconfigResetSectionCompleteSaga = VtxconfigResetSectionCompleteSaga;
//# sourceMappingURL=VtxconfigResetSectionComplete.js.map