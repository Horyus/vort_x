"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actions/actionTypes");
var VtxcacheSetRequired_1 = require("./VtxcacheSetRequired");
var VtxcacheSetData_1 = require("./VtxcacheSetData");
var VtxcacheCreate_1 = require("./VtxcacheCreate");
var VtxcacheSetError_1 = require("./VtxcacheSetError");
var VtxcacheReset_1 = require("./VtxcacheReset");
var VtxcacheClear_1 = require("./VtxcacheClear");
var index_1 = require("../../state/index");
exports.VtxcacheReducer = function (state, action) {
    if (state === void 0) { state = index_1.InitialState.vtxcache; }
    switch (action.type) {
        case actionTypes_1.VtxcacheActions.VtxcacheSetRequired:
            return VtxcacheSetRequired_1.VtxcacheSetRequiredReducer(state, action);
        case actionTypes_1.VtxcacheActions.VtxcacheSetData:
            return VtxcacheSetData_1.VtxcacheSetDataReducer(state, action);
        case actionTypes_1.VtxcacheActions.VtxcacheSetError:
            return VtxcacheSetError_1.VtxcacheSetErrorReducer(state, action);
        case actionTypes_1.VtxcacheActions.VtxcacheCreate:
            return VtxcacheCreate_1.VtxcacheCreateReducer(state, action);
        case actionTypes_1.VtxcacheActions.VtxcacheReset:
            return VtxcacheReset_1.VtxcacheResetReducer(state, action);
        case actionTypes_1.VtxcacheActions.VtxcacheClear:
            return VtxcacheClear_1.VtxcacheClearReducer(state, action);
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map