import { TxSection }                   from './txs';
import { VtxconfigSection, VtxStatus } from './vtxconfig';
import { VtxeventsSection }            from './vtxevents';
import { VtxpollSection }              from './vtxpoll';
import { ContractsSection }            from './contracts';
import { BlocksSection }               from './blocks';
import { VtxcacheSection }             from './vtxcache';
import { AccountsSection }             from './accounts';
import { EventsSection }               from './events';

import { getCorePolls } from '../vtxpoll/core_polls';

export interface State {
    txs: TxSection;
    contracts: ContractsSection;
    blocks: BlocksSection;
    accounts: AccountsSection;
    events: EventsSection;

    vtxconfig: VtxconfigSection;
    vtxevents: VtxeventsSection[];
    vtxpoll: VtxpollSection;
    vtxcache: VtxcacheSection;
}

export const InitialState: State = {
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
    events: {
    },

    vtxconfig: {
        web3: null,
        last_error: null,
        status: VtxStatus.Idle,
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
        actions: getCorePolls()
    },
    vtxcache: {
        store: {}
    }
};
