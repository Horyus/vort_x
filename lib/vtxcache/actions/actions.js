"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("./actionTypes");
exports.VtxcacheCreate = function (signature, cb) { return ({
    type: actionTypes_1.VtxcacheActions.VtxcacheCreate,
    signature: signature,
    cb: cb
}); };
exports.VtxcacheSetData = function (signature, data, block) { return ({
    type: actionTypes_1.VtxcacheActions.VtxcacheSetData,
    signature: signature,
    data: data,
    block: block
}); };
exports.VtxcacheSetRequired = function (signature) { return ({
    type: actionTypes_1.VtxcacheActions.VtxcacheSetRequired,
    signature: signature
}); };
exports.VtxcacheSetError = function (signature, error, block) { return ({
    type: actionTypes_1.VtxcacheActions.VtxcacheSetError,
    signature: signature,
    error: error,
    block: block
}); };
exports.VtxcacheReset = function () { return ({
    type: actionTypes_1.VtxcacheActions.VtxcacheReset
}); };
//# sourceMappingURL=actions.js.map