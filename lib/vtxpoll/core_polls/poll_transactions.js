"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var txs_1 = require("../../state/txs");
var actions_1 = require("../../txs/actions/actions");
var actions_2 = require("../../vtxevents/actions/actions");
var vtxevents_1 = require("../../state/vtxevents");
var actions_3 = require("../../contracts/actions/actions");
exports.poll_transaction = function (state, emit, new_block) { return __awaiter(_this, void 0, void 0, function () {
    var e_1, _a, current_block, _b, threshold, _c, _d, tx, _e, infos, receipt, e_1_1, e_2;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 14, , 15]);
                _b = state.blocks.current_height;
                if (_b) return [3 /*break*/, 2];
                return [4 /*yield*/, state.vtxconfig.web3.eth.getBlockNumber()];
            case 1:
                _b = (_f.sent());
                _f.label = 2;
            case 2:
                current_block = _b;
                threshold = state.vtxconfig.confirmation_threshold;
                _f.label = 3;
            case 3:
                _f.trys.push([3, 11, 12, 13]);
                _c = __values(Object.keys(state.txs)), _d = _c.next();
                _f.label = 4;
            case 4:
                if (!!_d.done) return [3 /*break*/, 10];
                tx = _d.value;
                if (!new_block && state.txs[tx].status !== txs_1.TxStatus.Unknown)
                    return [3 /*break*/, 9];
                _e = state.txs[tx].status;
                switch (_e) {
                    case txs_1.TxStatus.Unknown: return [3 /*break*/, 5];
                    case txs_1.TxStatus.Confirming: return [3 /*break*/, 7];
                }
                return [3 /*break*/, 9];
            case 5: return [4 /*yield*/, state.vtxconfig.web3.eth.getTransaction(tx)];
            case 6:
                infos = _f.sent();
                emit(actions_1.TxSet(tx, infos, txs_1.TxStatus.Confirming));
                _f.label = 7;
            case 7: return [4 /*yield*/, state.vtxconfig.web3.eth.getTransactionReceipt(tx)];
            case 8:
                receipt = _f.sent();
                if (receipt.contractAddress && !state.txs[tx].contract_address) {
                    emit(actions_1.TxSet(tx, {}, txs_1.TxStatus.Confirming, receipt.contractAddress));
                    if (state.txs[tx].new_contract) {
                        emit(actions_3.ContractsNew(state.txs[tx].new_contract.name, receipt.contractAddress, {
                            permanent: state.txs[tx].new_contract.permanent,
                            alias: state.txs[tx].new_contract.alias,
                            balance: state.txs[tx].new_contract.balance
                        }));
                    }
                }
                if (receipt.status === 1) {
                    emit(actions_1.TxSet(tx, {}, txs_1.TxStatus.Error));
                    emit(actions_2.VtxeventsAdd({
                        type: vtxevents_1.VtxeventsTypes.TxError,
                        tx_hash: tx
                    }));
                }
                else if (current_block - receipt.blockNumber >= threshold) {
                    emit(actions_1.TxSet(tx, {}, txs_1.TxStatus.Confirmed));
                    emit(actions_2.VtxeventsAdd({
                        type: vtxevents_1.VtxeventsTypes.TxConfirmed,
                        tx_hash: tx
                    }));
                }
                _f.label = 9;
            case 9:
                _d = _c.next();
                return [3 /*break*/, 4];
            case 10: return [3 /*break*/, 13];
            case 11:
                e_1_1 = _f.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 13];
            case 12:
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 13: return [3 /*break*/, 15];
            case 14:
                e_2 = _f.sent();
                emit(actions_2.VtxeventsAdd({
                    type: vtxevents_1.VtxeventsTypes.Error,
                    e: e_2,
                    error_type: vtxevents_1.VtxeventErrorTypes.TxFetchError
                }));
                return [3 /*break*/, 15];
            case 15: return [2 /*return*/];
        }
    });
}); };
exports.poll_transaction_interval = 1;
