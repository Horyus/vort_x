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
Object.defineProperty(exports, "__esModule", { value: true });
var effects_1 = require("redux-saga/effects");
var ready_1 = require("../../utils/ready");
var getters_1 = require("../../vtxconfig/helpers/getters");
var actions_1 = require("../../vtxevents/actions/actions");
var vtxevents_1 = require("../../state/vtxevents");
var actions_2 = require("../actions/actions");
function TxFollowSaga(action) {
    var state, web3, tx_infos, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                if (!ready_1.ready(state)) return [3 /*break*/, 11];
                web3 = getters_1.getWeb3(state);
                _a.label = 2;
            case 2:
                _a.trys.push([2, 8, , 10]);
                return [4 /*yield*/, effects_1.call(web3.eth.getTransaction, action.tx_hash)];
            case 3:
                tx_infos = _a.sent();
                if (!(tx_infos === null)) return [3 /*break*/, 5];
                return [4 /*yield*/, effects_1.put(actions_1.VtxeventsAdd({
                        type: vtxevents_1.VtxeventsTypes.TxInvalid,
                        tx_hash: action.tx_hash
                    }))];
            case 4:
                _a.sent();
                return [2 /*return*/];
            case 5: return [4 /*yield*/, effects_1.put(actions_1.VtxeventsAdd({
                    type: vtxevents_1.VtxeventsTypes.TxFollowed,
                    tx_hash: action.tx_hash
                }))];
            case 6:
                _a.sent();
                return [4 /*yield*/, effects_1.put(actions_2.TxAdd(action.tx_hash, tx_infos, action.tx_id))];
            case 7:
                _a.sent();
                return [3 /*break*/, 10];
            case 8:
                e_1 = _a.sent();
                return [4 /*yield*/, effects_1.put(actions_1.VtxeventsAdd({
                        type: vtxevents_1.VtxeventsTypes.Error,
                        e: e_1,
                        error_type: vtxevents_1.VtxeventErrorTypes.TxFollowError
                    }))];
            case 9:
                _a.sent();
                return [3 /*break*/, 10];
            case 10: return [3 /*break*/, 12];
            case 11:
                console.error("TxFollow was called while store was not ready");
                _a.label = 12;
            case 12: return [2 /*return*/];
        }
    });
}
exports.TxFollowSaga = TxFollowSaga;
//# sourceMappingURL=TxFollow.js.map