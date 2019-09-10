"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountsAdd_1 = require("./AccountsAdd");
var actions_1 = require("../actions/actions");
exports.ContractsNewReducer = function (state, action) {
    if (action.balance) {
        return AccountsAdd_1.AccountsAddReducer(state, actions_1.AccountsAdd(action.address, {
            alias: action.alias,
            permanent: action.permanent
        }));
    }
    else {
        return state;
    }
};
//# sourceMappingURL=ContractNew.js.map