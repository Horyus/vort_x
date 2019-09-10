"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("./actionTypes");
exports.BlocksInitialHeight = function (height) { return ({
    type: actionTypes_1.BlocksActions.BlocksInitialHeight,
    height: height
}); };
exports.BlocksFetch = function (height) { return ({
    type: actionTypes_1.BlocksActions.BlocksFetch,
    height: height
}); };
exports.BlocksFetchedHeight = function (height) { return ({
    type: actionTypes_1.BlocksActions.BlocksFetchedHeight,
    height: height
}); };
exports.BlocksFetched = function (number, block_infos) { return ({
    type: actionTypes_1.BlocksActions.BlocksFetched,
    number: number,
    block_infos: block_infos
}); };
exports.BlocksNew = function (number, block_infos) { return ({
    type: actionTypes_1.BlocksActions.BlocksNew,
    number: number,
    block_infos: block_infos
}); };
//# sourceMappingURL=actions.js.map