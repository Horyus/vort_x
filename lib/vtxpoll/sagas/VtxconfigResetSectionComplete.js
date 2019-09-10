"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
var action_1 = require("../actions/action");
var ready_1 = require("../../utils/ready");
var timer = 0;
var polling = null;
var last_polling_block = null;
var finished_all_calls = function () {
    var e_1, _a;
    try {
        for (var _b = __values(Object.keys(polling)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var sec = _c.value;
            if (polling[sec] === true)
                return false;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return true;
};
function loop(dispatcher, state_getter) {
    return __awaiter(this, void 0, void 0, function () {
        var state, block_dependent, _a, _b, poll;
        var e_2, _c;
        var _this = this;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (polling !== null && !finished_all_calls())
                        return [2 /*return*/];
                    ++timer;
                    state = state_getter();
                    block_dependent = last_polling_block !== state.blocks.current_height;
                    last_polling_block = state.blocks.current_height;
                    if (polling === null) {
                        polling = {};
                        try {
                            for (_a = __values(state.vtxpoll.actions), _b = _a.next(); !_b.done; _b = _a.next()) {
                                poll = _b.value;
                                polling[poll.name] = false;
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                    if (!ready_1.ready(state)) return [3 /*break*/, 2];
                    return [4 /*yield*/, Promise.all(state.vtxpoll.actions
                            .filter(function (entity) { return (timer % entity.interval === 0 && !polling[entity.name]); })
                            .map(function (entity) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        polling[entity.name] = true;
                                        return [4 /*yield*/, entity.cb(state, dispatcher, block_dependent)];
                                    case 1:
                                        _a.sent();
                                        polling[entity.name] = false;
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _d.sent();
                    _d.label = 2;
                case 2: return [2 /*return*/];
            }
        });
    });
}
function VtxconfigResetSectionCompleteSaga(dispatch, state_getter, action) {
    var state, clear, interval_id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(action.section === 'vtxconfig')) return [3 /*break*/, 6];
                return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                clear = state.vtxconfig.web3 === null;
                if (!(state.vtxpoll.interval_id === undefined && !clear)) return [3 /*break*/, 4];
                return [4 /*yield*/, effects_1.call(setInterval, loop.bind(this, dispatch, state_getter), state.vtxconfig.poll_timer)];
            case 2:
                interval_id = _a.sent();
                return [4 /*yield*/, effects_1.put(action_1.VtxpollSetIntervalId(interval_id))];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!(state.vtxpoll.interval_id !== undefined && clear)) return [3 /*break*/, 6];
                clearInterval(state.vtxpoll.interval_id);
                return [4 /*yield*/, effects_1.put(action_1.VtxpollSetIntervalId(undefined))];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}
exports.VtxconfigResetSectionCompleteSaga = VtxconfigResetSectionCompleteSaga;
//# sourceMappingURL=VtxconfigResetSectionComplete.js.map