import * as React                from 'react';
import { VtxContract }           from 'ethvtx';
import { Dispatch }              from 'redux';
import { State }                 from 'ethvtx/lib/state';
import { createStoreConsumer }   from './StoreConsumer';
import { createContractWrapper } from './ContractWrapper';

// 1. Custom Redux Context
// 2. Loading Component

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

export type ContractData = ContractParams & ContractInstance;

export interface WithContractsParams<ReceivedProps, ReduxState = any, ReduxStateProps = any, ReduxDispatchProps = any> {
    contracts: ContractParams[] | ((props: any) => ContractParams[]);
    mapStateToProps?: (state: ReduxState, ownProps: ReceivedProps) => ReduxStateProps;
    mapDispatchToProps?: (dispatch: Dispatch, ownProps: ReceivedProps) => ReduxDispatchProps;
}

export function withContracts<ReceivedProps, ReduxState extends State = State, ReduxStateProps = any, ReduxDispatchProps = any>(
    params: WithContractsParams<ReceivedProps, ReduxState, ReduxStateProps, ReduxDispatchProps>,
    component: React.ComponentType<ReceivedProps & WrappedComponentProps>
): React.ComponentType<ReceivedProps> {
    return createStoreConsumer<ReceivedProps>(
        createContractWrapper<ReceivedProps, ReduxState & State, ReduxStateProps, ReduxDispatchProps>(
            component,
            params.contracts,
            params.mapStateToProps,
            params.mapDispatchToProps
        )
    );
}
