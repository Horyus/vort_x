import { State } from '../state';
import { VtxconfigAllowedNetworks } from '../state/vtxconfig';
export interface VtxConfigArguments {
    poll_timer?: number;
    confirmation_threshold?: number;
    allowed_nets?: VtxconfigAllowedNetworks;
}
export declare const configureVtx: <T extends State = State>(initialState: T, config: VtxConfigArguments) => T;
