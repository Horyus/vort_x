"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eip55_1 = require("eip55");
var AddressRegex = /0x[a-fA-F0-9]{40}/;
var Alias = /@[a-z]+/;
exports.address_checker = function (address) {
    if (!AddressRegex.test(address)) {
        if (!Alias.test(address)) {
            throw new Error("Invalid Ethereum Address " + address);
        }
        else {
            return address;
        }
    }
    return eip55_1.encode(address);
};
//# sourceMappingURL=address_checker.js.map