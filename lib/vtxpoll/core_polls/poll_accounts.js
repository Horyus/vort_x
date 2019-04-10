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
var bignumber_js_1 = require("bignumber.js");
var actions_1 = require("../../accounts/actions/actions");
exports.poll_accounts = function (state, emit, new_block) { return __awaiter(_this, void 0, void 0, function () {
    var e_1, _a, e_2, _b, web3, _c, _d, account, balance, _e, transaction_count, contract, code, e_1_1, _f, _g, account, balance, _h, transaction_count, contract, code, e_2_1;
    return __generator(this, function (_j) {
        switch (_j.label) {
            case 0:
                web3 = state.vtxconfig.web3;
                _j.label = 1;
            case 1:
                _j.trys.push([1, 9, 10, 11]);
                _c = __values(Object.keys(state.accounts.accounts)), _d = _c.next();
                _j.label = 2;
            case 2:
                if (!!_d.done) return [3 /*break*/, 8];
                account = _d.value;
                if (!new_block && state.accounts.accounts[account].balance !== null)
                    return [3 /*break*/, 7];
                _e = bignumber_js_1.BigNumber.bind;
                return [4 /*yield*/, web3.eth.getBalance(account)];
            case 3:
                balance = new (_e.apply(bignumber_js_1.BigNumber, [void 0, _j.sent()]))();
                return [4 /*yield*/, web3.eth.getTransactionCount(account)];
            case 4:
                transaction_count = _j.sent();
                contract = undefined;
                if (!(state.accounts.accounts[account].contract === null)) return [3 /*break*/, 6];
                return [4 /*yield*/, web3.eth.getCode(account)];
            case 5:
                code = (_j.sent());
                contract = code !== '0x' && code !== '0x0';
                _j.label = 6;
            case 6:
                if (state.accounts.accounts[account].balance !== balance || state.accounts.accounts[account].transaction_count !== transaction_count) {
                    emit(actions_1.AccountsSetInfos(account, balance, transaction_count, contract));
                }
                _j.label = 7;
            case 7:
                _d = _c.next();
                return [3 /*break*/, 2];
            case 8: return [3 /*break*/, 11];
            case 9:
                e_1_1 = _j.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 11];
            case 10:
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 11:
                if (!!new_block) return [3 /*break*/, 12];
                return [3 /*break*/, 22];
            case 12:
                _j.trys.push([12, 20, 21, 22]);
                _f = __values(Object.keys(state.accounts.accounts)), _g = _f.next();
                _j.label = 13;
            case 13:
                if (!!_g.done) return [3 /*break*/, 19];
                account = _g.value;
                _h = bignumber_js_1.BigNumber.bind;
                return [4 /*yield*/, web3.eth.getBalance(account)];
            case 14:
                balance = new (_h.apply(bignumber_js_1.BigNumber, [void 0, _j.sent()]))();
                return [4 /*yield*/, web3.eth.getTransactionCount(account)];
            case 15:
                transaction_count = _j.sent();
                contract = undefined;
                if (!(state.accounts.accounts[account].contract === null)) return [3 /*break*/, 17];
                return [4 /*yield*/, web3.eth.getCode(account)];
            case 16:
                code = (_j.sent());
                contract = code !== '0x' && code !== '0x0';
                _j.label = 17;
            case 17:
                if (state.accounts.accounts[account].balance !== balance || state.accounts.accounts[account].transaction_count !== transaction_count) {
                    emit(actions_1.AccountsSetInfos(account, balance, transaction_count, contract));
                }
                _j.label = 18;
            case 18:
                _g = _f.next();
                return [3 /*break*/, 13];
            case 19: return [3 /*break*/, 22];
            case 20:
                e_2_1 = _j.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 22];
            case 21:
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 22: return [2 /*return*/];
        }
    });
}); };
exports.poll_accounts_interval = 1;
