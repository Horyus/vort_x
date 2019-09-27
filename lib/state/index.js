"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vtxconfig_1 = require("./vtxconfig");
var core_polls_1 = require("../vtxpoll/core_polls");
exports.InitialState = {
    txs: {},
    contracts: {
        specs: {},
        instances: {},
        web3: null,
        alias: {}
    },
    blocks: {
        initial_height: null,
        current_height: null,
        blocks: {}
    },
    accounts: {
        accounts: {},
        alias: {}
    },
    events: {},
    vtxconfig: {
        web3: null,
        last_error: null,
        status: vtxconfig_1.VtxStatus.Idle,
        reset_status: {
            txs: false,
            blocks: false,
            vtxcache: false,
            contracts: false,
            vtxconfig: false,
            accounts: false
        },
        poll_timer: 100,
        confirmation_threshold: 12,
        coinbase: null,
        net_id: null,
        allowed_nets: null
    },
    vtxevents: [],
    vtxpoll: {
        timer: 0,
        actions: core_polls_1.getCorePolls()
    },
    vtxcache: {
        store: {}
    }
};
//# sourceMappingURL=index.js.map