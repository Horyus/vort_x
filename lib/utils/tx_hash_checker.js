"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TxHashRegex = /0x[a-fA-F0-9]{64}/;
exports.tx_hash_checker = function (tx_hash) {
    if (!TxHashRegex.test(tx_hash)) {
        throw new Error("Invalid Transaction Hash " + tx_hash);
    }
    return tx_hash.toLowerCase();
};
//# sourceMappingURL=tx_hash_checker.js.map