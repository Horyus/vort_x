var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { getContract } from 'ethvtx/lib/getters';
import { isAddress } from '../utils/isAddress';
import { utils } from 'ethers';
import { loadContractInstance } from 'ethvtx/lib/dispatchers';
/**
 * @description Contract Wrapper builder
 *
 * @param Component Component to render
 * @param contracts Provided contract params
 * @param mapStateToProps Provided mapStateToProps function
 * @param mapDispatchToProps Provided mapDispatchToProps function
 */
export function createContractWrapper(Component, contracts, mapStateToProps, mapDispatchToProps) {
    return /** @class */ (function (_super) {
        __extends(ContractWrapper, _super);
        function ContractWrapper() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ContractWrapper.buildContractInstance = function (store, contract) {
            return __assign(__assign({}, contract), { instance: getContract(store, contract.contract, contract.address) });
        };
        ContractWrapper.get_contracts = function (contracts, props) {
            switch (typeof contracts) {
                case 'object':
                    return contracts;
                case 'function':
                    return contracts(props);
            }
        };
        ContractWrapper.load_contracts = function (props) {
            // Split received props and store
            var store = props.store, transmitted_props = __rest(props, ["store"]);
            // Extract state and dispatch for manual mapStateToProps and mapDispatchToProps calls
            var state = store.getState();
            var dispatch = store.dispatch;
            // Cast
            var received_props = transmitted_props;
            // Get requested contracts
            var contract_params = ContractWrapper.get_contracts(contracts, received_props);
            if (state.contracts.instances) {
                for (var _i = 0, contract_params_1 = contract_params; _i < contract_params_1.length; _i++) {
                    var contract = contract_params_1[_i];
                    if (contract && contract.load && isAddress(contract.address) &&
                        (!state.contracts.instances[contract.contract]
                            || !state.contracts.instances[contract.contract][utils.getAddress(contract.address)])) {
                        loadContractInstance(dispatch, contract.contract, contract.address);
                    }
                }
            }
        };
        ContractWrapper.prototype.componentDidMount = function () {
            ContractWrapper.load_contracts(this.props);
        };
        ContractWrapper.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
            ContractWrapper.load_contracts(nextProps);
            return true;
        };
        ContractWrapper.prototype.render = function () {
            // Split received props and store
            var _a = this.props, store = _a.store, transmitted_props = __rest(_a, ["store"]);
            // Extract state and dispatch for manual mapStateToProps and mapDispatchToProps calls
            var state = store.getState();
            var dispatch = store.dispatch;
            // Cast
            var received_props = transmitted_props;
            // Get requested contracts
            var contract_params = ContractWrapper.get_contracts(contracts, received_props);
            // Build instances of contracts
            var built_contracts = contract_params.map(ContractWrapper.buildContractInstance.bind(null, store));
            // Merge with props
            var with_contracts_props = __assign(__assign({}, received_props), { contracts: built_contracts });
            // Call functions if provided
            var final_props = __assign(__assign(__assign({}, with_contracts_props), (mapStateToProps ? mapStateToProps(state, with_contracts_props) : {})), (mapDispatchToProps ? mapDispatchToProps(dispatch, with_contracts_props) : {}));
            // Render final component
            return React.createElement(Component, __assign({}, final_props));
        };
        return ContractWrapper;
    }(React.Component));
}
//# sourceMappingURL=ContractWrapper.js.map