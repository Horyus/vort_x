"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("../actions/actionTypes");
var index_1 = require("../../state/index");
var EventsFollow_1 = require("./EventsFollow");
var EventsCaught_1 = require("./EventsCaught");
var EventsSetHeight_1 = require("./EventsSetHeight");
exports.EventsReducer = function (state, action) {
    if (state === void 0) { state = index_1.InitialState.events; }
    switch (action.type) {
        case actionTypes_1.EventsActions.EventsFollow:
            return EventsFollow_1.EventsFollowReducer(state, action);
        case actionTypes_1.EventsActions.EventsCaught:
            return EventsCaught_1.EventsCaughtReducer(state, action);
        case actionTypes_1.EventsActions.EventsSetHeight:
            return EventsSetHeight_1.EventsSetHeightReducer(state, action);
        default:
            return state;
    }
};
//# sourceMappingURL=index.js.map