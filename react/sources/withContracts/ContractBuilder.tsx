import * as React                                                                    from 'react';
import { ContractData, ContractParams, ContractParamsLoader, WrappedComponentProps } from './index';
import { State }                                                                     from 'ethvtx/lib/state';
import { connect }                                                                   from 'react-redux';
import { getContractMaterial, VtxContractMaterial, VtxContract }                     from 'ethvtx';
import { getAddress }                                                                from '../utils/getAddress';
import { Dispatch }                                                                  from 'redux';
import { AccountsRemove, ContractsNew, ContractsRemove, EventsClear, VtxcacheClear } from 'ethvtx/lib/actions';

type ContractLiveInstanceCount = { [key: string]: number };

interface ContractSpecs {
    abi: any;
    bin: string;
    constructor_bin: string;
    loaded: boolean;
    instance: any;
    permanent: boolean;
}

type ContractPreBuildData = (ContractParams & ContractSpecs & { material: VtxContractMaterial });

export interface ContractBuilderMaterials {
    contract_data: ContractPreBuildData[];
}

const contract_count: ContractLiveInstanceCount = {};

const createMapStateToProps = <ReceivedProps, ReduxState extends State = State>(contracts: ContractParams[] | ContractParamsLoader<ReceivedProps, ReduxState>): ((state: ReduxState, ownProps: ReceivedProps) => ContractBuilderMaterials) => {

    return (state: ReduxState, ownProps: ReceivedProps): ContractBuilderMaterials => {
        let contract_data: ContractParams[] = null;

        switch (typeof contracts) {

            case 'object': {
                contract_data = contracts;
                break;
            }

            case 'function': {
                contract_data = contracts(state, ownProps);
            }
        }

        const returned_contracts: ContractPreBuildData[] = contract_data.map((cd: ContractParams): ContractPreBuildData => {

            let address;

            if (cd.alias) {
                address = getAddress(state.contracts.alias[cd.contract][cd.alias].address);
            } else {
                address = getAddress(cd.address);
            }

            if (!state.contracts.specs[cd.contract]) {
                throw new Error(`Trying to load instance of ${cd.contract} but no spec found`);
            }

            if (!state.contracts.instances[cd.contract] || !state.contracts.instances[cd.contract][address]) {
                return {
                    ...cd,
                    address,
                    material: null,
                    instance: null,
                    abi: null,
                    bin: null,
                    permanent: null,
                    constructor_bin: null,
                    loaded: false
                };
            }

            return {
                ...cd,
                address,
                material: getContractMaterial(state as State, cd.contract, address),
                instance: state.contracts.instances[cd.contract][address].web3_instance,
                abi: state.contracts.specs[cd.contract].abi,
                bin: state.contracts.specs[cd.contract].bin,
                permanent: state.contracts.instances[cd.contract][address].permanent,
                constructor_bin: state.contracts.specs[cd.contract].constructor_bin,
                loaded: true
            };
        });

        return {
            contract_data: returned_contracts
        };
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ContractBuilderDispatchMaterial => ({
    dispatch
});

interface ContractBuilderDispatchMaterial {
    dispatch: Dispatch;
}

interface ContractBuilderState {
    registered: { [key: string]: boolean }
}

export function ContractBuilder<ReceivedProps,
    ReduxState extends State = State>
(
    contracts: ContractParams[] | ContractParamsLoader<ReceivedProps, ReduxState>,
    Component: React.ComponentType<ReceivedProps & WrappedComponentProps>
) {

    return connect(createMapStateToProps<ReceivedProps, ReduxState>(contracts), mapDispatchToProps)(
        class extends React.Component<ReceivedProps & ContractBuilderMaterials & ContractBuilderDispatchMaterial, ContractBuilderState> {

            state: ContractBuilderState = {
                registered: {}
            };

            loadContracts(props: ReceivedProps & ContractBuilderMaterials & ContractBuilderDispatchMaterial): void {
                for (const cd of props.contract_data) {
                    if (cd.loaded === false) {
                        props.dispatch(ContractsNew(cd.contract, cd.address, {balance: cd.balance}));
                    }
                }
            }

            unloadContracts(props: ReceivedProps & ContractBuilderMaterials & ContractBuilderDispatchMaterial, state: ContractBuilderState): void {
                for (const cd of props.contract_data) {
                    if (cd.loaded === true && cd.permanent === false) {

                        const entity = VtxContract.entity_sig(cd.contract, cd.address);
                        if (state.registered[entity]) {

                            contract_count[entity] -= 1;

                            if (contract_count[entity] === 0 && !cd.persist_contract) {
                                props.dispatch(ContractsRemove(cd.contract, cd.address));

                                if (!cd.persist_events) {
                                    props.dispatch(EventsClear(entity));
                                }

                                if (!cd.persist_cache) {
                                    props.dispatch(VtxcacheClear(entity));
                                }

                                if (cd.balance && !cd.persist_balance) {
                                    props.dispatch(AccountsRemove(cd.address));
                                }
                            }


                        }

                    }
                }
            }

            updateRegisteredContracts(props: ReceivedProps & ContractBuilderMaterials & ContractBuilderDispatchMaterial, state: ContractBuilderState): void {
                for (const cd of props.contract_data) {
                    if (cd.loaded === true && cd.permanent === false && !cd.alias) {
                        const entity = VtxContract.entity_sig(cd.contract, cd.address);
                        if (!state.registered[entity]) {

                            if (contract_count[entity] === undefined) {
                                contract_count[entity] = 1;
                            } else {
                                contract_count[entity] += 1;
                            }

                            this.setState({
                                registered: {
                                    [entity]: true
                                }
                            });

                        }
                    }
                }
            }

            componentDidMount(): void {

                this.loadContracts(this.props);
                this.updateRegisteredContracts(this.props, this.state);
            }

            shouldComponentUpdate(nextProps: Readonly<ReceivedProps & ContractBuilderMaterials & ContractBuilderDispatchMaterial>, nextState: Readonly<ContractBuilderState>, nextContext: any): boolean {

                this.loadContracts(nextProps);
                this.updateRegisteredContracts(nextProps, nextState);

                return true;
            }

            componentWillUnmount(): void {
                this.unloadContracts(this.props, this.state);
            }

            render(): React.ReactNode {

                const contracts = this.props.contract_data.map((bm: ContractPreBuildData): ContractData => {
                    if (bm.loaded === false || bm.instance === null) return null;
                    return {
                        contract: bm.contract,
                        alias: bm.alias,
                        address: bm.address,
                        instance: new VtxContract(
                            this.props.dispatch,
                            bm.material,
                            bm.instance,
                            bm.contract,
                            bm.address,
                            bm.abi,
                            bm.bin,
                            bm.constructor_bin
                        )
                    };
                }).filter((cd: ContractData): boolean => cd !== null);

                const {contract_data, dispatch, ...initial_props} = this.props;

                const props: ReceivedProps & WrappedComponentProps = {
                    ...(initial_props as ReceivedProps),
                    contracts
                };

                return <Component {...props}/>;
            }
        } as React.ComponentType
    );

}
