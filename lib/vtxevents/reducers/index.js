"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actions/actionTypes");
var VtxeventsAdd_1 = require("./VtxeventsAdd");
var index_1 = require("../../state/index");
exports.VtxeventsReducer = function (state, action) {
    if (state === void 0) { state = index_1.InitialState.vtxevents; }
    switch (action.type) {
        case actionTypes_1.VtxeventsActions.VtxeventsAdd:
            return VtxeventsAdd_1.VtxeventsAddReducer(state, action);
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map