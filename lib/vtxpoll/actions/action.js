"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("./actionTypes");
exports.VtxpollSetIntervalId = function (interval_id) { return ({
    type: actionTypes_1.VtxpollActions.VtxpollSetIntervalId,
    interval_id: interval_id
}); };
exports.VtxpollKill = function () { return ({
    type: actionTypes_1.VtxpollActions.VtxpollKill
}); };
exports.VtxpollAdd = function (name, interval, cb) { return ({
    type: actionTypes_1.VtxpollActions.VtxpollAdd,
    name: name,
    interval: interval,
    cb: cb
}); };
