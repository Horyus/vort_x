"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actions/actionTypes");
var VtxpollSetIntervalId_1 = require("./VtxpollSetIntervalId");
var index_1 = require("../../state/index");
var VtxpollAdd_1 = require("./VtxpollAdd");
exports.VtxpollReducer = function (state, action) {
    if (state === void 0) { state = index_1.InitialState.vtxpoll; }
    switch (action.type) {
        case actionTypes_1.VtxpollActions.VtxpollSetIntervalId:
            return VtxpollSetIntervalId_1.VtxpollSetIntervalIdReducer(state, action);
        case actionTypes_1.VtxpollActions.VtxpollAdd:
            return VtxpollAdd_1.VtxpollAddReducer(state, action);
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map