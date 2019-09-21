import { Dispatch, Store }                                     from 'redux';
import * as React                                              from 'react';
import { ContractData, ContractParams, WrappedComponentProps } from './index';
import { getContract }                                         from 'ethvtx/lib/getters';
import { State }                                               from 'ethvtx/lib/state';
import { isAddress }                                           from '../utils/isAddress';
import { utils }                                               from 'ethers';
import { loadContractInstance }                                from 'ethvtx/lib/dispatchers';

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
export function createContractWrapper<ReceivedProps, ReduxState extends State, ReduxStateProps, ReduxDispatchProps>(
    Component: React.ComponentType<ReceivedProps & WrappedComponentProps>,
    contracts: ContractParams[] | ((props: ReceivedProps) => ContractParams[]),
    mapStateToProps: (state: ReduxState, ownProps: ReceivedProps) => ReduxStateProps,
    mapDispatchToProps: (dispatch: Dispatch, ownProps: ReceivedProps) => ReduxDispatchProps
): React.ComponentType<ReceivedProps & ContractWrapperProps> {

    return class ContractWrapper extends React.Component<ReceivedProps & ContractWrapperProps> {

        private static buildContractInstance(store: Store, contract: ContractParams): ContractData {
            return {
                ...contract,
                instance: getContract(store, contract.contract, contract.address)
            };
        }

        private static get_contracts(contracts: ContractParams[] | ((props: ReceivedProps) => ContractParams[]), props: ReceivedProps): ContractParams[] {
            switch (typeof contracts) {
                case 'object':
                    return contracts;
                case 'function':
                    return contracts(props);
            }
        }

        private static load_contracts(props: ReceivedProps & ContractWrapperProps): void {

            // Split received props and store
            const {store, ...transmitted_props}: { store: Store } = props;

            // Extract state and dispatch for manual mapStateToProps and mapDispatchToProps calls
            const state: ReduxState = store.getState();
            const dispatch: Dispatch = store.dispatch;

            // Cast
            const received_props: ReceivedProps = transmitted_props as ReceivedProps;

            // Get requested contracts
            const contract_params = ContractWrapper.get_contracts(contracts, received_props);

            if (state.contracts.instances) {
                for (const contract of contract_params) {
                    if (contract && contract.load && isAddress(contract.address) &&
                        (
                            !state.contracts.instances[contract.contract]
                            || !state.contracts.instances[contract.contract][utils.getAddress(contract.address)]
                        )) {
                        loadContractInstance(dispatch, contract.contract, contract.address);
                    }
                }
            }
        }

        componentDidMount(): void {

            ContractWrapper.load_contracts(this.props);

        }

        shouldComponentUpdate(nextProps: Readonly<ReceivedProps & ContractWrapperProps>, nextState: Readonly<{}>, nextContext: any): boolean {

            ContractWrapper.load_contracts(nextProps);

            return true;
        }

        render(): React.ReactNode {
            // Split received props and store
            const {store, ...transmitted_props}: { store: Store } = this.props;

            // Extract state and dispatch for manual mapStateToProps and mapDispatchToProps calls
            const state = store.getState();
            const dispatch: Dispatch = store.dispatch;

            // Cast
            const received_props: ReceivedProps = transmitted_props as ReceivedProps;

            // Get requested contracts
            const contract_params = ContractWrapper.get_contracts(contracts, received_props);

            // Build instances of contracts
            const built_contracts: ContractData[] = contract_params.map(ContractWrapper.buildContractInstance.bind(null, store));

            // Merge with props
            const with_contracts_props: ReceivedProps & WrappedComponentProps = {
                ...received_props,
                contracts: built_contracts
            };

            // Call functions if provided
            const final_props = {
                ...with_contracts_props,
                ...(mapStateToProps ? mapStateToProps(state, with_contracts_props) : {}),
                ...(mapDispatchToProps ? mapDispatchToProps(dispatch, with_contracts_props) : {})
            };

            // Render final component
            return <Component {...final_props}/>;
        }
    };

}
