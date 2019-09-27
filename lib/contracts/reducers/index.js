"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actions/actionTypes");
var ContractsAddSpec_1 = require("./ContractsAddSpec");
var ContractsRemoveSpec_1 = require("./ContractsRemoveSpec");
var ContractsReset_1 = require("./ContractsReset");
var ContractsNew_1 = require("./ContractsNew");
var ContractsRemove_1 = require("./ContractsRemove");
var actionTypes_2 = require("../../vtxconfig/actions/actionTypes");
var VtxconfigSetWeb3_1 = require("./VtxconfigSetWeb3");
var index_1 = require("../../state/index");
var ContractsInstanceSetValidity_1 = require("./ContractsInstanceSetValidity");
var ContractsSetWeb3Instance_1 = require("./ContractsSetWeb3Instance");
exports.ContractsReducer = function (state, action) {
    if (state === void 0) { state = index_1.InitialState.contracts; }
    switch (action.type) {
        case actionTypes_1.ContractsActions.ContractsAddSpec:
            return ContractsAddSpec_1.ContractsAddSpecReducer(state, action);
        case actionTypes_1.ContractsActions.ContractsRemoveSpec:
            return ContractsRemoveSpec_1.ContractsRemoveSoecReducer(state, action);
        case actionTypes_1.ContractsActions.ContractsReset:
            return ContractsReset_1.ContractsResetReducer(state, action);
        case actionTypes_1.ContractsActions.ContractsNew:
            return ContractsNew_1.ContractsNewReducer(state, action);
        case actionTypes_1.ContractsActions.ContractsRemove:
            return ContractsRemove_1.ContractsRemoveReducer(state, action);
        case actionTypes_2.VtxconfigActions.VtxconfigSetWeb3:
            return VtxconfigSetWeb3_1.VtxconfigSetWeb3Reducer(state, action);
        case actionTypes_1.ContractsActions.ContractsInstanceSetValidity:
            return ContractsInstanceSetValidity_1.ContractsInstanceSetValidity(state, action);
        case actionTypes_1.ContractsActions.ContractsSetWeb3Instance:
            return ContractsSetWeb3Instance_1.ContractsSetWeb3Instance(state, action);
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map