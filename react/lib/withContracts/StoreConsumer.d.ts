import * as React from 'react';
import { ContractWrapperProps } from './ContractWrapper';
export declare function createStoreConsumer<ReceivedProps>(Component: React.ComponentType<ReceivedProps & ContractWrapperProps>): React.ComponentType<ReceivedProps>;
