"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("./actionTypes");
var tx_hash_checker_1 = require("../../utils/tx_hash_checker");
var format_txinfos_1 = require("../../utils/format_txinfos");
exports.TxAdd = function (tx_hash, tx_infos, tx_id, contract) { return ({
    type: actionTypes_1.TxActions.TxAdd,
    tx_hash: tx_hash_checker_1.tx_hash_checker(tx_hash),
    tx_infos: format_txinfos_1.format_txinfos(tx_infos),
    tx_id: tx_id,
    contract: contract
}); };
exports.TxRemove = function (tx_hash) { return ({
    type: actionTypes_1.TxActions.TxRemove,
    tx_hash: tx_hash_checker_1.tx_hash_checker(tx_hash)
}); };
exports.TxSet = function (tx_hash, tx_infos, status, contract_address) { return ({
    type: actionTypes_1.TxActions.TxSet,
    tx_hash: tx_hash_checker_1.tx_hash_checker(tx_hash),
    tx_infos: format_txinfos_1.format_txinfos(tx_infos),
    status: status,
    contract_address: contract_address
}); };
exports.TxError = function (tx_hash, e) { return ({
    type: actionTypes_1.TxActions.TxError,
    tx_hash: tx_hash_checker_1.tx_hash_checker(tx_hash),
    e: e
}); };
exports.TxSend = function (tx_infos, tx_id) { return ({
    type: actionTypes_1.TxActions.TxSend,
    tx_infos: format_txinfos_1.format_txinfos(tx_infos),
    tx_id: tx_id
}); };
exports.TxContractCreation = function (tx_infos, contract, tx_id) { return ({
    type: actionTypes_1.TxActions.TxContractCreation,
    tx_infos: format_txinfos_1.format_txinfos(tx_infos),
    tx_id: tx_id,
    contract: contract
}); };
exports.TxReset = function () { return ({
    type: actionTypes_1.TxActions.TxReset
}); };
exports.TxFollow = function (tx_hash, tx_id) { return ({
    type: actionTypes_1.TxActions.TxFollow,
    tx_hash: tx_hash_checker_1.tx_hash_checker(tx_hash),
    tx_id: tx_id
}); };
