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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../../blocks/actions/actions");
var fetch_blocks = function (dispatch, state, blocks) { return __awaiter(void 0, void 0, void 0, function () {
    var blocks_1, blocks_1_1, num, data, e_1_1, e_2;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 9, , 10]);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 8]);
                blocks_1 = __values(blocks), blocks_1_1 = blocks_1.next();
                _b.label = 2;
            case 2:
                if (!!blocks_1_1.done) return [3 /*break*/, 5];
                num = blocks_1_1.value;
                return [4 /*yield*/, state.vtxconfig.web3.eth.getBlock(num)];
            case 3:
                data = _b.sent();
                dispatch(actions_1.BlocksNew(num, data));
                _b.label = 4;
            case 4:
                blocks_1_1 = blocks_1.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (blocks_1_1 && !blocks_1_1.done && (_a = blocks_1.return)) _a.call(blocks_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 8: return [3 /*break*/, 10];
            case 9:
                e_2 = _b.sent();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.poll_blocks = function (state, emit, _) { return __awaiter(void 0, void 0, void 0, function () {
    var current_height, e_3, block_nums;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, state.vtxconfig.web3.eth.getBlockNumber()];
            case 1:
                current_height = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                return [2 /*return*/];
            case 3:
                if (current_height === state.blocks.current_height) {
                    return [2 /*return*/];
                }
                if (state.blocks.current_height === null) {
                    block_nums = __spread(Array(current_height - state.blocks.initial_height + 1).keys()).map(function (num) { return state.blocks.initial_height + num; });
                }
                else {
                    block_nums = __spread(Array(current_height - state.blocks.current_height).keys()).map(function (num) { return state.blocks.current_height + num + 1; });
                }
                return [4 /*yield*/, fetch_blocks(emit, state, block_nums)];
            case 4:
                _a.sent();
                emit(actions_1.BlocksFetchedHeight(current_height));
                return [2 /*return*/];
        }
    });
}); };
exports.poll_blocks_interval = 10;
