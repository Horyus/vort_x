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
var VtxContract_1 = require("../../contracts/VtxContract");
var actions_1 = require("../../events/actions/actions");
exports.poll_events = function (state, emit, new_block) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, entity, events, _c, _d, event_sig, from, to, spec, caught_events, caught_events_1, caught_events_1_1, caught_event, e_1_1, e_2_1;
    var e_2, _e, e_1, _f, e_3, _g;
    return __generator(this, function (_h) {
        switch (_h.label) {
            case 0:
                if (!(state.blocks.initial_height !== null && state.blocks.current_height !== null)) return [3 /*break*/, 14];
                _h.label = 1;
            case 1:
                _h.trys.push([1, 12, 13, 14]);
                _a = __values(Object.keys(state.events)), _b = _a.next();
                _h.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 11];
                entity = _b.value;
                events = state.events[entity].followed;
                _h.label = 3;
            case 3:
                _h.trys.push([3, 8, 9, 10]);
                _c = (e_1 = void 0, __values(Object.keys(events))), _d = _c.next();
                _h.label = 4;
            case 4:
                if (!!_d.done) return [3 /*break*/, 7];
                event_sig = _d.value;
                if (!new_block && events[event_sig].last_fetched !== null)
                    return [3 /*break*/, 6];
                from = events[event_sig].last_fetched !== null ? (events[event_sig].last_fetched + 1) : state.blocks.initial_height;
                to = state.blocks.current_height;
                if (!(from <= to)) return [3 /*break*/, 6];
                spec = state.contracts.specs[events[event_sig].contract];
                if (!spec)
                    return [3 /*break*/, 6];
                return [4 /*yield*/, VtxContract_1.VtxContract.getPastEvents(state.vtxconfig.web3, spec.abi, events[event_sig].address, events[event_sig].event, {
                        fromBlock: from,
                        toBlock: to,
                        filter: events[event_sig].arguments
                    })];
            case 5:
                caught_events = _h.sent();
                try {
                    for (caught_events_1 = (e_3 = void 0, __values(caught_events)), caught_events_1_1 = caught_events_1.next(); !caught_events_1_1.done; caught_events_1_1 = caught_events_1.next()) {
                        caught_event = caught_events_1_1.value;
                        emit(actions_1.EventsCaught(entity, events[event_sig].signature, caught_event));
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (caught_events_1_1 && !caught_events_1_1.done && (_g = caught_events_1.return)) _g.call(caught_events_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                emit(actions_1.EventsSetHeight(entity, events[event_sig].signature, to));
                _h.label = 6;
            case 6:
                _d = _c.next();
                return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_1_1 = _h.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (_d && !_d.done && (_f = _c.return)) _f.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 10:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 11: return [3 /*break*/, 14];
            case 12:
                e_2_1 = _h.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 14];
            case 13:
                try {
                    if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 14: return [2 /*return*/];
        }
    });
}); };
exports.poll_events_interval = 1;
//# sourceMappingURL=poll_events.js.map