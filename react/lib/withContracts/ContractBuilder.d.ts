import * as React from 'react';
import { ContractParams, ContractParamsLoader, WrappedComponentProps } from './index';
import { State } from 'ethvtx/lib/state';
import { VtxContractMaterial } from 'ethvtx';
interface ContractSpecs {
    abi: any;
    bin: string;
    constructor_bin: string;
    loaded: boolean;
    instance: any;
    permanent: boolean;
}
declare type ContractPreBuildData = (ContractParams & ContractSpecs & {
    material: VtxContractMaterial;
});
export interface ContractBuilderMaterials {
    contract_data: ContractPreBuildData[];
}
export declare function ContractBuilder<ReceivedProps, ReduxState extends State = State>(contracts: ContractParams[] | ContractParamsLoader<ReceivedProps, ReduxState>, Component: React.ComponentType<ReceivedProps & WrappedComponentProps>): import("react-redux").ConnectedComponentClass<React.ComponentType<{}>, Pick<{}, never> & ReceivedProps>;
export {};
