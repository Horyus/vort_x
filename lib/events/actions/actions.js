"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes_1 = require("./actionTypes");
var address_checker_1 = require("../../utils/address_checker");
exports.EventsClear = function (entity) { return ({
    type: actionTypes_1.EventsActions.EventsClear,
    entity: entity
}); };
exports.EventsFollow = function (entity, event, args, contract, address, signature) { return ({
    type: actionTypes_1.EventsActions.EventsFollow,
    entity: entity,
    event: event,
    arguments: args,
    address: address_checker_1.address_checker(address),
    contract: contract,
    signature: signature
}); };
exports.EventsCaught = function (entity, signature, infos) { return ({
    type: actionTypes_1.EventsActions.EventsCaught,
    entity: entity,
    signature: signature,
    infos: __assign(__assign({}, infos), { address: address_checker_1.address_checker(infos.address) })
}); };
exports.EventsSetHeight = function (entity, signature, new_height) { return ({
    type: actionTypes_1.EventsActions.EventsSetHeight,
    entity: entity,
    signature: signature,
    new_height: new_height
}); };
//# sourceMappingURL=actions.js.map