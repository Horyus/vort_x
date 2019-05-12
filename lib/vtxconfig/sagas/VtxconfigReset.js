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
var actions_1 = require("../actions/actions");
var vtxconfig_1 = require("../../state/vtxconfig");
var address_checker_1 = require("../../utils/address_checker");
function VtxconfigResetSaga(action) {
    var state, clear, web3, e_1, coinbase, _a, net, genesis_hash;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, effects_1.select()];
            case 1:
                state = (_b.sent());
                clear = state.vtxconfig.web3 === null;
                if (!(!clear || action.enable)) return [3 /*break*/, 22];
                web3 = null;
                if (!action.enable) return [3 /*break*/, 12];
                return [4 /*yield*/, effects_1.put(actions_1.VtxconfigSetStatus(vtxconfig_1.VtxStatus.Authorizing))];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                _b.trys.push([3, 5, , 7]);
                return [4 /*yield*/, effects_1.call(action.enable.enable)];
            case 4:
                _b.sent();
                return [3 /*break*/, 7];
            case 5:
                e_1 = _b.sent();
                return [4 /*yield*/, effects_1.put(actions_1.VtxconfigSetStatus(vtxconfig_1.VtxStatus.Unauthorized))];
            case 6:
                _b.sent();
                return [2 /*return*/];
            case 7: return [4 /*yield*/, effects_1.call(action.enable.web3)];
            case 8:
                web3 = _b.sent();
                if (!(web3 === null || web3 === undefined)) return [3 /*break*/, 10];
                return [4 /*yield*/, effects_1.put(actions_1.VtxconfigSetStatus(vtxconfig_1.VtxStatus.Error))];
            case 9:
                _b.sent();
                return [2 /*return*/];
            case 10: return [4 /*yield*/, effects_1.put(actions_1.VtxconfigSetWeb3(web3))];
            case 11:
                _b.sent();
                return [3 /*break*/, 13];
            case 12:
                web3 = state.vtxconfig.web3;
                _b.label = 13;
            case 13:
                _a = address_checker_1.address_checker;
                return [4 /*yield*/, effects_1.call(web3.eth.getCoinbase)];
            case 14:
                coinbase = _a.apply(void 0, [_b.sent()]);
                return [4 /*yield*/, effects_1.call(web3.eth.net.getId)];
            case 15:
                net = _b.sent();
                if (!(state.vtxconfig.allowed_nets !== null)) return [3 /*break*/, 20];
                if (!(state.vtxconfig.allowed_nets[net] === undefined)) return [3 /*break*/, 17];
                return [4 /*yield*/, effects_1.put(actions_1.VtxconfigSetStatus(vtxconfig_1.VtxStatus.WrongNet))];
            case 16:
                _b.sent();
                return [2 /*return*/];
            case 17: return [4 /*yield*/, effects_1.call(web3.eth.getBlock, 0)];
            case 18:
                genesis_hash = (_b.sent()).hash.toLowerCase();
                if (!(state.vtxconfig.allowed_nets[net].toLowerCase() !== genesis_hash)) return [3 /*break*/, 20];
                return [4 /*yield*/, effects_1.put(actions_1.VtxconfigSetStatus(vtxconfig_1.VtxStatus.WrongNet))];
            case 19:
                _b.sent();
                return [2 /*return*/];
            case 20: return [4 /*yield*/, effects_1.put(actions_1.VtxconfigSetInfos(coinbase, net))];
            case 21:
                _b.sent();
                _b.label = 22;
            case 22: return [4 /*yield*/, effects_1.put(actions_1.VtxconfigResetSectionComplete('vtxconfig'))];
            case 23:
                _b.sent();
                return [2 /*return*/];
        }
    });
}
exports.VtxconfigResetSaga = VtxconfigResetSaga;
