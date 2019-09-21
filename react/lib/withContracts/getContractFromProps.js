/**
 * @description Helper function to extract needed contract from props
 *
 * @param props
 * @param contract_name
 * @param contract_address
 */
export function getContractFromProps(props, contract_name, contract_address) {
    if (!contract_name || !contract_address) {
        return null;
    }
    var contract_idx = props.contracts.findIndex(function (elem) { return elem.contract === contract_name && elem.address === contract_address; });
    if (contract_idx !== -1 && props.contracts[contract_idx].instance && props.contracts[contract_idx].instance.valid === true)
        return props.contracts[contract_idx];
    return null;
}
//# sourceMappingURL=getContractFromProps.js.map