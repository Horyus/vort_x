import { Dispatch, Store } from 'redux';
import * as React from 'react';
import { ContractParams, WrappedComponentProps } from './index';
import { State } from 'ethvtx/lib/state';
export interface ContractWrapperProps {
    store: Store;
}
/**
 * @description Contract Wrapper builder
 *
 * @param Component Component to render
 * @param contracts Provided contract params
 * @param mapStateToProps Provided mapStateToProps function
 * @param mapDispatchToProps Provided mapDispatchToProps function
 */
export declare function createContractWrapper<ReceivedProps, ReduxState extends State, ReduxStateProps, ReduxDispatchProps>(Component: React.ComponentType<ReceivedProps & WrappedComponentProps>, contracts: ContractParams[] | ((props: ReceivedProps) => ContractParams[]), mapStateToProps: (state: ReduxState, ownProps: ReceivedProps) => ReduxStateProps, mapDispatchToProps: (dispatch: Dispatch, ownProps: ReceivedProps) => ReduxDispatchProps): React.ComponentType<ReceivedProps & ContractWrapperProps>;
