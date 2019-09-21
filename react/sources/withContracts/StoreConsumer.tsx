import * as React                                    from 'react';
import { ReactReduxContext, ReactReduxContextValue } from 'react-redux';
import { ContractWrapperProps }                      from './ContractWrapper';

export function createStoreConsumer<ReceivedProps>(Component: React.ComponentType<ReceivedProps & ContractWrapperProps>): React.ComponentType<ReceivedProps> {
    return class StoreConsumer extends React.Component<ReceivedProps> {
        render(): React.ReactNode {
            return <ReactReduxContext.Consumer>

                {
                    (ctx: ReactReduxContextValue): React.ReactNode =>
                        <Component {...this.props} store={ctx.store}/>
                }

            </ReactReduxContext.Consumer>;
        }
    };
}
