"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("./actionTypes");
var address_checker_1 = require("../../utils/address_checker");
exports.AccountsAdd = function (address, config) { return ({
    type: actionTypes_1.AccountsActions.AccountsAdd,
    address: address_checker_1.address_checker(address),
    alias: config ? config.alias : undefined,
    permanent: config ? config.permanent : undefined
}); };
exports.AccountsRemove = function (address_or_alias) { return ({
    type: actionTypes_1.AccountsActions.AccountsRemove,
    address_or_alias: address_checker_1.address_checker(address_or_alias)
}); };
exports.AccountsSetInfos = function (address, balance, transaction_count, contract) { return ({
    type: actionTypes_1.AccountsActions.AccountsSetInfos,
    address: address,
    balance: balance,
    transaction_count: transaction_count,
    contract: contract
}); };
exports.AccountsReset = function () { return ({
    type: actionTypes_1.AccountsActions.AccountsReset
}); };
//# sourceMappingURL=actions.js.map