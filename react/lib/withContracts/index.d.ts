import * as React from 'react';
import { VtxContract } from 'ethvtx';
import { State } from 'ethvtx/lib/state';
export interface ContractParams {
    contract: string;
    address?: string;
    alias?: string;
    balance?: boolean;
    persist_cache?: boolean;
    persist_balance?: boolean;
    persist_events?: boolean;
    persist_contract?: boolean;
}
interface ContractInstance {
    instance: VtxContract;
}
export interface WrappedComponentProps {
    contracts: ContractData[];
}
export declare type ContractParamsLoader<InitialProps, ReduxState extends State = State> = (state: ReduxState, props: InitialProps) => ContractParams[];
export declare type ContractData = ContractParams & ContractInstance;
export declare function withContracts<ReceivedProps, ReduxState extends State = State, ReduxStateProps = any, ReduxDispatchProps = any>(contracts: ContractParams[] | ContractParamsLoader<ReceivedProps, ReduxState>, component: React.ComponentType<ReceivedProps & WrappedComponentProps>): React.ComponentType<ReceivedProps>;
export {};
