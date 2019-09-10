"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vtxevents_1 = require("../../state/vtxevents");
exports.getVtxEvents = function (state, type, error_type) {
    if (error_type && type !== vtxevents_1.VtxeventsTypes.Error) {
        throw new Error('Cannot ask for error_type when not fetching Error Events');
    }
    var ret = state.vtxevents.filter(function (event) { return event.type === type; });
    if (type === vtxevents_1.VtxeventsTypes.Error && error_type) {
        ret = ret.filter(function (event) { return event.error_type === error_type; });
    }
    return ret;
};
//# sourceMappingURL=getters.js.map