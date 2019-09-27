import { Action } from 'redux';
export declare const VtxcacheActions: {
    VtxcacheCreate: string;
    VtxcacheSetData: string;
    VtxcacheSetError: string;
    VtxcacheSetRequired: string;
    VtxcacheReset: string;
    VtxcacheClear: string;
};
export interface IVtxcacheClear extends Action<string> {
    entity: string;
}
export declare type VtxcacheCb<T> = (block: number) => Promise<T>;
export interface IVtxcacheCreate<T = any> extends Action<string> {
    entity: string;
    signature: string;
    cb: VtxcacheCb<T>;
}
export interface IVtxcacheSetData<T = any> extends Action<string> {
    entity: string;
    signature: string;
    data: T;
    block: number;
}
export interface IVtxcacheSetRequired extends Action<string> {
    entity: string;
    signature: string;
}
export interface IVtxcacheSetError extends Action<string> {
    entity: string;
    signature: string;
    error: Error;
    block: number;
}
export interface IVtxcacheReset extends Action<string> {
}
export declare type VtxcacheActionTypes = IVtxcacheCreate | IVtxcacheSetData | IVtxcacheSetRequired | IVtxcacheSetError | IVtxcacheReset | IVtxcacheClear;
