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
import { connect } from 'react-redux';
import { getContractMaterial, VtxContract } from 'ethvtx';
import { getAddress } from '../utils/getAddress';
import { AccountsRemove, ContractsNew, ContractsRemove, EventsClear, VtxcacheClear } from 'ethvtx/lib/actions';
var contract_count = {};
var createMapStateToProps = function (contracts) {
    return function (state, ownProps) {
        var contract_data = null;
        switch (typeof contracts) {
            case 'object': {
                contract_data = contracts;
                break;
            }
            case 'function': {
                contract_data = contracts(state, ownProps);
            }
        }
        var returned_contracts = contract_data.map(function (cd) {
            var address;
            if (cd.alias) {
                address = getAddress(state.contracts.alias[cd.contract][cd.alias].address);
            }
            else {
                address = getAddress(cd.address);
            }
            if (!state.contracts.specs[cd.contract]) {
                throw new Error("Trying to load instance of " + cd.contract + " but no spec found");
            }
            if (!state.contracts.instances[cd.contract] || !state.contracts.instances[cd.contract][address]) {
                return __assign(__assign({}, cd), { address: address, material: null, instance: null, abi: null, bin: null, permanent: null, constructor_bin: null, loaded: false });
            }
            return __assign(__assign({}, cd), { address: address, material: getContractMaterial(state, cd.contract, address), instance: state.contracts.instances[cd.contract][address].web3_instance, abi: state.contracts.specs[cd.contract].abi, bin: state.contracts.specs[cd.contract].bin, permanent: state.contracts.instances[cd.contract][address].permanent, constructor_bin: state.contracts.specs[cd.contract].constructor_bin, loaded: true });
        });
        return {
            contract_data: returned_contracts
        };
    };
};
var mapDispatchToProps = function (dispatch) { return ({
    dispatch: dispatch
}); };
export function ContractBuilder(contracts, Component) {
    return connect(createMapStateToProps(contracts), mapDispatchToProps)(/** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.state = {
                registered: {}
            };
            return _this;
        }
        class_1.prototype.loadContracts = function (props) {
            for (var _i = 0, _a = props.contract_data; _i < _a.length; _i++) {
                var cd = _a[_i];
                if (cd.loaded === false) {
                    props.dispatch(ContractsNew(cd.contract, cd.address, { balance: cd.balance }));
                }
            }
        };
        class_1.prototype.unloadContracts = function (props, state) {
            for (var _i = 0, _a = props.contract_data; _i < _a.length; _i++) {
                var cd = _a[_i];
                if (cd.loaded === true && cd.permanent === false) {
                    var entity = VtxContract.entity_sig(cd.contract, cd.address);
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
        };
        class_1.prototype.updateRegisteredContracts = function (props, state) {
            var _a;
            for (var _i = 0, _b = props.contract_data; _i < _b.length; _i++) {
                var cd = _b[_i];
                if (cd.loaded === true && cd.permanent === false && !cd.alias) {
                    var entity = VtxContract.entity_sig(cd.contract, cd.address);
                    if (!state.registered[entity]) {
                        if (contract_count[entity] === undefined) {
                            contract_count[entity] = 1;
                        }
                        else {
                            contract_count[entity] += 1;
                        }
                        this.setState({
                            registered: (_a = {},
                                _a[entity] = true,
                                _a)
                        });
                    }
                }
            }
        };
        class_1.prototype.componentDidMount = function () {
            this.loadContracts(this.props);
            this.updateRegisteredContracts(this.props, this.state);
        };
        class_1.prototype.shouldComponentUpdate = function (nextProps, nextState, nextContext) {
            this.loadContracts(nextProps);
            this.updateRegisteredContracts(nextProps, nextState);
            return true;
        };
        class_1.prototype.componentWillUnmount = function () {
            this.unloadContracts(this.props, this.state);
        };
        class_1.prototype.render = function () {
            var _this = this;
            var contracts = this.props.contract_data.map(function (bm) {
                if (bm.loaded === false || bm.instance === null)
                    return null;
                return {
                    contract: bm.contract,
                    alias: bm.alias,
                    address: bm.address,
                    instance: new VtxContract(_this.props.dispatch, bm.material, bm.instance, bm.contract, bm.address, bm.abi, bm.bin, bm.constructor_bin)
                };
            }).filter(function (cd) { return cd !== null; });
            var _a = this.props, contract_data = _a.contract_data, dispatch = _a.dispatch, initial_props = __rest(_a, ["contract_data", "dispatch"]);
            var props = __assign(__assign({}, initial_props), { contracts: contracts });
            return React.createElement(Component, __assign({}, props));
        };
        return class_1;
    }(React.Component)));
}
//# sourceMappingURL=ContractBuilder.js.map