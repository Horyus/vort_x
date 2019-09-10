"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var format_txinfos_1 = require("../../utils/format_txinfos");
exports.getTransaction = function (state, tx_hash) {
    if (tx_hash) {
        return state.txs[tx_hash];
    }
};
exports.getTransactionById = function (state, tx_id) {
    return Object.keys(state.txs)
        .map(function (key) { return state.txs[key]; })
        .filter(function (elem) { return elem.id === tx_id; })[0];
};
exports.getTransactions = function (state, tx_infos) {
    if (!tx_infos) {
        return Object.keys(state.txs).map(function (key) { return state.txs[key]; });
    }
    else {
        tx_infos = format_txinfos_1.format_txinfos(tx_infos);
        return Object.keys(state.txs)
            .map(function (key) { return state.txs[key]; })
            .filter(function (elem) { return !tx_infos.from || tx_infos.from === elem.infos.from; })
            .filter(function (elem) { return !tx_infos.to || tx_infos.to === elem.infos.to; })
            .filter(function (elem) { return !tx_infos.input || tx_infos.input === elem.infos.input; })
            .filter(function (elem) { return !tx_infos.hash || tx_infos.hash === elem.infos.hash; })
            .filter(function (elem) { return !tx_infos.nonce || tx_infos.nonce === elem.infos.nonce; })
            .filter(function (elem) { return !tx_infos.blockHash || tx_infos.blockHash === elem.infos.blockHash; })
            .filter(function (elem) { return !tx_infos.blockNumber || tx_infos.blockNumber === elem.infos.blockNumber; })
            .filter(function (elem) { return !tx_infos.transactionIndex || tx_infos.transactionIndex === elem.infos.transactionIndex; })
            .filter(function (elem) { return !tx_infos.value || tx_infos.value === elem.infos.value; })
            .filter(function (elem) { return !tx_infos.gasPrice || tx_infos.gasPrice === elem.infos.gasPrice; })
            .filter(function (elem) { return !tx_infos.gas || tx_infos.gas === elem.infos.gas; })
            .filter(function (elem) { return !tx_infos.input || tx_infos.input === elem.infos.input; })
            .filter(function (elem) { return !tx_infos.r || tx_infos.r === elem.infos.r; })
            .filter(function (elem) { return !tx_infos.v || tx_infos.v === elem.infos.v; })
            .filter(function (elem) { return !tx_infos.s || tx_infos.s === elem.infos.s; });
    }
};
//# sourceMappingURL=getters.js.map