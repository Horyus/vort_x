"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions/actions");
/**
 * @desc This methods will tell the redux store to fetch the given block height
 * @param dispatch
 * @param height
 */
exports.fetchBlock = function (dispatch, height) {
    dispatch(actions_1.BlocksFetch(height));
};
//# sourceMappingURL=dispatchers.js.map