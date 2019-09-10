"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eip55_1 = require("eip55");
exports.format_txinfos = function (tx_infos) {
    if (tx_infos.from)
        tx_infos.from = eip55_1.encode(tx_infos.from);
    if (tx_infos.to)
        tx_infos.to = eip55_1.encode(tx_infos.to);
    return tx_infos;
};
//# sourceMappingURL=format_txinfos.js.map