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
exports.VtxconfigResetSectionCompleteReducer = function (state, action) {
    switch (action.section) {
        case 'txs':
            return __assign(__assign({}, state), { reset_status: __assign(__assign({}, state.reset_status), { txs: true }) });
        case 'blocks':
            return __assign(__assign({}, state), { reset_status: __assign(__assign({}, state.reset_status), { blocks: true }) });
        case 'vtxcache':
            return __assign(__assign({}, state), { reset_status: __assign(__assign({}, state.reset_status), { vtxcache: true }) });
        case 'contracts':
            return __assign(__assign({}, state), { reset_status: __assign(__assign({}, state.reset_status), { contracts: true }) });
        case 'vtxconfig':
            return __assign(__assign({}, state), { reset_status: __assign(__assign({}, state.reset_status), { vtxconfig: true }) });
        case 'accounts':
            return __assign(__assign({}, state), { reset_status: __assign(__assign({}, state.reset_status), { accounts: true }) });
        default:
            console.error("Attempt to reset unknown section " + action.section);
            return state;
    }
};
//# sourceMappingURL=VtxconfigResetSectionComplete.js.map