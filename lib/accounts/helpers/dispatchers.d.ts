import { Dispatch } from 'redux';
export declare const addAccount: (dispatch: Dispatch<import("redux").AnyAction>, address: string, config?: {
    alias?: string;
    permanent?: boolean;
}) => void;
export declare const removeAccount: (dispatch: Dispatch<import("redux").AnyAction>, address_or_alias: string) => void;
