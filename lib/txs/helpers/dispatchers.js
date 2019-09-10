"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions/actions");
var get_tx_id_1 = require("../../utils/get_tx_id");
exports.addTransaction = function (dispatch, tx_hash, tx_infos) {
    dispatch(actions_1.TxAdd(tx_hash, tx_infos || {}));
};
exports.removeTransaction = function (dispatch, tx_hash) {
    dispatch(actions_1.TxRemove(tx_hash));
};
exports.sendTransaction = function (dispatch, tx_infos) {
    var tx_id = get_tx_id_1.get_tx_id();
    dispatch(actions_1.TxSend(tx_infos, tx_id));
    return tx_id;
};
exports.followTransaction = function (dispatch, tx_hash) {
    var tx_id = get_tx_id_1.get_tx_id();
    dispatch(actions_1.TxFollow(tx_hash, tx_id));
    return tx_id;
};
//# sourceMappingURL=dispatchers.js.map