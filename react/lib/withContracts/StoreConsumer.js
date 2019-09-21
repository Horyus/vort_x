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
import * as React from 'react';
import { ReactReduxContext } from 'react-redux';
export function createStoreConsumer(Component) {
    return /** @class */ (function (_super) {
        __extends(StoreConsumer, _super);
        function StoreConsumer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        StoreConsumer.prototype.render = function () {
            var _this = this;
            return React.createElement(ReactReduxContext.Consumer, null, function (ctx) {
                return React.createElement(Component, __assign({}, _this.props, { store: ctx.store }));
            });
        };
        return StoreConsumer;
    }(React.Component));
}
//# sourceMappingURL=StoreConsumer.js.map