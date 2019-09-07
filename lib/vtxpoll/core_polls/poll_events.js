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
var actions_1 = require("../../events/actions/actions");
exports.poll_events = function (state, emit, new_block) { return __awaiter(void 0, void 0, void 0, function () {
    var events, _a, _b, event_sig, from, to, contract, caught_events, caught_events_1, caught_events_1_1, caught_event, e_1_1;
    var e_1, _c, e_2, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                if (!(state.blocks.initial_height !== null && state.blocks.current_height !== null)) return [3 /*break*/, 8];
                events = state.events.followed;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 6, 7, 8]);
                _a = __values(Object.keys(events)), _b = _a.next();
                _e.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 5];
                event_sig = _b.value;
                if (!new_block && events[event_sig].last_fetched !== null)
                    return [3 /*break*/, 4];
                from = events[event_sig].last_fetched !== null ? (events[event_sig].last_fetched + 1) : state.blocks.initial_height;
                to = state.blocks.current_height;
                if (!(from <= to)) return [3 /*break*/, 4];
                contract = state.contracts.instances[events[event_sig].contract][events[event_sig].address].instance;
                if (!contract)
                    return [3 /*break*/, 4];
                return [4 /*yield*/, contract.getPastEvents(events[event_sig].event, {
                        fromBlock: from,
                        toBlock: to,
                        filter: events[event_sig].arguments
                    })];
            case 3:
                caught_events = _e.sent();
                try {
                    for (caught_events_1 = (e_2 = void 0, __values(caught_events)), caught_events_1_1 = caught_events_1.next(); !caught_events_1_1.done; caught_events_1_1 = caught_events_1.next()) {
                        caught_event = caught_events_1_1.value;
                        emit(actions_1.EventsCaught(events[event_sig].signature, caught_event));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (caught_events_1_1 && !caught_events_1_1.done && (_d = caught_events_1.return)) _d.call(caught_events_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                emit(actions_1.EventsSetHeight(events[event_sig].signature, to));
                _e.label = 4;
            case 4:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_1_1 = _e.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.poll_events_interval = 1;
