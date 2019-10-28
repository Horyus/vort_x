"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("./actionTypes");
exports.VtxcacheClear = function (entity) { return ({
    type: actionTypes_1.VtxcacheActions.VtxcacheClear,
    entity: entity
}); };
exports.VtxcacheCreate = function (entity, signature, cb) { return ({
    type: actionTypes_1.VtxcacheActions.VtxcacheCreate,
    entity: entity,
    signature: signature,
    cb: cb
}); };
exports.VtxcacheSetData = function (entity, signature, data, block) { return ({
    type: actionTypes_1.VtxcacheActions.VtxcacheSetData,
    entity: entity,
    signature: signature,
    data: data,
    block: block
}); };
exports.VtxcacheSetRequired = function (entity, signature) { return ({
    type: actionTypes_1.VtxcacheActions.VtxcacheSetRequired,
    entity: entity,
    signature: signature
}); };
exports.VtxcacheSetError = function (entity, signature, error, block) { return ({
    type: actionTypes_1.VtxcacheActions.VtxcacheSetError,
    entity: entity,
    signature: signature,
    error: error,
    block: block
}); };
exports.VtxcacheReset = function () { return ({
    type: actionTypes_1.VtxcacheActions.VtxcacheReset
}); };
//# sourceMappingURL=actions.js.map