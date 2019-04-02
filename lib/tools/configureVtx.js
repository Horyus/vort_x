"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureVtx = function (initialState, config) {
    if (config.poll_timer)
        initialState.vtxconfig.poll_timer = config.poll_timer;
    if (config.confirmation_threshold)
        initialState.vtxconfig.confirmation_threshold = config.confirmation_threshold;
    if (config.allowed_nets)
        initialState.vtxconfig.allowed_nets = config.allowed_nets;
    return initialState;
};
