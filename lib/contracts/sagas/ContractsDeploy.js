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
var actions_1 = require("../../vtxevents/actions/actions");
var actions_2 = require("../../txs/actions/actions");
var vtxevents_1 = require("../../state/vtxevents");
function ContractsDeploySaga(action) {
    var state, spec, web3_instance, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                return [4 /*yield*/, effects_1.select()];
            case 1:
                state = _a.sent();
                spec = state.contracts.specs[action.contract.name];
                if (!spec.constructor_bin) {
                    throw new Error("Cannot deploy: spec " + action.contract.name + " has no constructor_bin");
                }
                web3_instance = new state.vtxconfig.web3.eth.Contract(spec.abi, {
                    data: spec.constructor_bin
                });
                action.tx_infos.input = web3_instance.deploy({
                    arguments: action.args
                }).encodeABI();
                return [4 /*yield*/, effects_1.put(actions_2.TxContractCreation(action.tx_infos, action.contract, action.id))];
            case 2:
                _a.sent();
                return [3 /*break*/, 5];
            case 3:
                e_1 = _a.sent();
                return [4 /*yield*/, effects_1.put(actions_1.VtxeventsAdd({
                        type: vtxevents_1.VtxeventsTypes.Error,
                        error_type: vtxevents_1.VtxeventErrorTypes.ContractDeployError,
                        e: e_1
                    }))];
            case 4:
                _a.sent();
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}
exports.ContractsDeploySaga = ContractsDeploySaga;
//# sourceMappingURL=ContractsDeploy.js.map