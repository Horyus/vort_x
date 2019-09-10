"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Alias = /@[a-z]+/;
exports.is_alias = function (alias) {
    if (!alias) {
        return false;
    }
    return Alias.test(alias);
};
//# sourceMappingURL=is_alias.js.map