import * as React from 'react';
import { VtxContract } from 'ethvtx';
import { Dispatch } from 'redux';
import { State } from 'ethvtx/lib/state';
export interface ContractParams {
    contract: string;
    address: string;
    load?: boolean;
}
interface ContractInstance {
    instance: VtxContract;
}
export interface WrappedComponentProps {
    contracts: ContractData[];
}
export declare type ContractData = ContractParams & ContractInstance;
export interface WithContractsParams<ReceivedProps, ReduxState = any, ReduxStateProps = any, ReduxDispatchProps = any> {
    contracts: ContractParams[] | ((props: any) => ContractParams[]);
    mapStateToProps?: (state: ReduxState, ownProps: ReceivedProps) => ReduxStateProps;
    mapDispatchToProps?: (dispatch: Dispatch, ownProps: ReceivedProps) => ReduxDispatchProps;
}
export declare function withContracts<ReceivedProps, ReduxState extends State = State, ReduxStateProps = any, ReduxDispatchProps = any>(params: WithContractsParams<ReceivedProps, ReduxState, ReduxStateProps, ReduxDispatchProps>, component: React.ComponentType<ReceivedProps & WrappedComponentProps>): React.ComponentType<ReceivedProps>;
export {};
