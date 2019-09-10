"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Alias = /@[a-z]+/;
exports.alias_checker = function (alias) {
    if (!alias)
        return alias;
    if (!Alias.test(alias)) {
        throw new Error("Invalid Vortex Alias " + alias + ": Should respect the following RegExp '/@[a-z]+/'");
    }
    return alias;
};
//# sourceMappingURL=alias_checker.js.map