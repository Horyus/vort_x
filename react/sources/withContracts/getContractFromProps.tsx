import { ContractData, WrappedComponentProps } from './index';

/**
 * @description Helper function to extract needed contract from props
 *
 * @param props
 * @param contract_name
 * @param contract_address
 */
export function getContractFromProps(props: WrappedComponentProps, contract_name: string, contract_address: string): ContractData {
    if (!contract_name || !contract_address) {
        return null;
    }

    const contract_idx = props.contracts.findIndex((elem: ContractData): boolean => elem.contract === contract_name && elem.address === contract_address);

    if (contract_idx !== -1 && props.contracts[contract_idx].instance && props.contracts[contract_idx].instance.valid === true) return props.contracts[contract_idx];

    return null;
}
