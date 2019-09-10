"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actions/actionTypes");
var BlocksInitialHeight_1 = require("./BlocksInitialHeight");
var BlocksNew_1 = require("./BlocksNew");
var BlocksFetched_1 = require("./BlocksFetched");
var BlocksFetchedHeight_1 = require("./BlocksFetchedHeight");
var index_1 = require("../../state/index");
exports.BlocksReducer = function (state, action) {
    if (state === void 0) { state = index_1.InitialState.blocks; }
    switch (action.type) {
        case actionTypes_1.BlocksActions.BlocksFetchedHeight:
            return BlocksFetchedHeight_1.BlocksFetchedHeightReducer(state, action);
        case actionTypes_1.BlocksActions.BlocksInitialHeight:
            return BlocksInitialHeight_1.BlocksInitialHeightReducer(state, action);
        case actionTypes_1.BlocksActions.BlocksFetched:
            return BlocksFetched_1.BlocksFetchedReducer(state, action);
        case actionTypes_1.BlocksActions.BlocksNew:
            return BlocksNew_1.BlocksNewReducer(state, action);
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map