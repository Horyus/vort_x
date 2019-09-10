"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tx_id = 1;
exports.get_tx_id = function () {
    ++tx_id;
    return tx_id - 1;
};
//# sourceMappingURL=get_tx_id.js.map