import { createStoreConsumer } from './StoreConsumer';
import { createContractWrapper } from './ContractWrapper';
export function withContracts(params, component) {
    return createStoreConsumer(createContractWrapper(component, params.contracts, params.mapStateToProps, params.mapDispatchToProps));
}
//# sourceMappingURL=index.js.map