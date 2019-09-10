"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vtxconfig_1 = require("../state/vtxconfig");
var getters_1 = require("../vtxconfig/helpers/getters");
exports.ready = function (state) {
    return !!getters_1.getWeb3(state) && getters_1.getVtxStatus(state) === vtxconfig_1.VtxStatus.Loaded;
};
//# sourceMappingURL=ready.js.map