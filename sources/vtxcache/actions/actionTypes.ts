import { Action } from 'redux';

export const VtxcacheActions = {
    VtxcacheCreate: '[VTX][VTXCACHE] CREATE',
    VtxcacheSetData: '[VTX][VTXCACHE] SET_DATA',
    VtxcacheSetError: '[VTX][VTXCACHE] SET_ERROR',
    VtxcacheSetRequired: '[VTX][VTXCACHE] SET_REQUIRED',
    VtxcacheReset: '[VTX][VTXCACHE] RESET',
    VtxcacheClear: '[VTX][VTXCACHE] CLEAR'
};

export interface IVtxcacheClear extends Action<string> {
    entity: string;
}

export type VtxcacheCb<T> = (block: number) => Promise<T>;

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

export type VtxcacheActionTypes =
    IVtxcacheCreate
    | IVtxcacheSetData
    | IVtxcacheSetRequired
    | IVtxcacheSetError
    | IVtxcacheReset
    | IVtxcacheClear;
