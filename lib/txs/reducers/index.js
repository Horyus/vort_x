"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actions/actionTypes");
var TxAdd_1 = require("./TxAdd");
var TxRemove_1 = require("./TxRemove");
var TxSet_1 = require("./TxSet");
var TxError_1 = require("./TxError");
var TxReset_1 = require("./TxReset");
var index_1 = require("../../state/index");
exports.TxReducer = function (state, action) {
    if (state === void 0) { state = index_1.InitialState.txs; }
    switch (action.type) {
        case actionTypes_1.TxActions.TxAdd:
            return TxAdd_1.TxAddReducer(state, action);
        case actionTypes_1.TxActions.TxRemove:
            return TxRemove_1.TxRemoveReducer(state, action);
        case actionTypes_1.TxActions.TxSet:
            return TxSet_1.TxSetReducer(state, action);
        case actionTypes_1.TxActions.TxError:
            return TxError_1.TxErrorReducer(state, action);
        case actionTypes_1.TxActions.TxReset:
            return TxReset_1.TxResetReducer(state, action);
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map