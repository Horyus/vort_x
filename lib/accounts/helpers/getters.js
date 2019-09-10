"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var address_checker_1 = require("../../utils/address_checker");
var is_alias_1 = require("../../utils/is_alias");
exports.getAccount = function (state, address_or_alias) {
    address_or_alias = address_checker_1.address_checker(address_or_alias);
    if (is_alias_1.is_alias(address_or_alias)) {
        address_or_alias = state.accounts.alias[address_or_alias];
        if (address_or_alias === undefined) {
            return undefined;
        }
    }
    return state.accounts.accounts[address_or_alias];
};
exports.getAccountList = function (state) { return Object.keys(state.accounts.accounts); };
//# sourceMappingURL=getters.js.map