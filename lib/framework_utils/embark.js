"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loadSpec = function (embark_instance, name, bin, permanent) {
    return ([name, embark_instance._jsonInterface, {
            bin: bin ? embark_instance.runtime_bytecode : undefined,
            permanent: permanent
        }]);
};
exports.embark = {
    loadSpec: loadSpec
};
//# sourceMappingURL=embark.js.map