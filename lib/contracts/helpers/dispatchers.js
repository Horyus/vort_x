"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions/actions");
/**
 * @description This method loads a contract specification. Required before creating instances.
 * @param dispatch
 * @param name
 * @param abi
 * @param options If bin is provided, will be checked against network value. If permanent is true, will remain in store even after reset
 */
exports.loadContractSpec = function (dispatch, name, abi, options) {
    dispatch(actions_1.ContractsAddSpec(name, abi, options));
};
/**
 * @description Removes the specified contract specification
 * @param dispatch
 * @param name
 */
exports.removeContractSpec = function (dispatch, name) {
    dispatch(actions_1.ContractsRemoveSpec(name));
};
/**
 * @description Loads a contract instance by using the appropriate specification
 * @param dispatch
 * @param name Name of the specification to use
 * @param address
 * @param options If alias is provided, creates a new alias for this specific contract/address. If permanent is true, will remain in store event after reset. If balance is true, will add address to accounts
 */
exports.loadContractInstance = function (dispatch, name, address, options) {
    dispatch(actions_1.ContractsNew(name, address, options));
};
/**
 * @description Remove specified contract instance
 * @param dispatch
 * @param name
 * @param address_or_alias
 */
exports.removeContractInstance = function (dispatch, name, address_or_alias) {
    dispatch(actions_1.ContractsRemove(name, address_or_alias));
};
