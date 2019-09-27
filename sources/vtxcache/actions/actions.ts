import {
    IVtxcacheClear,
    IVtxcacheCreate, IVtxcacheReset,
    IVtxcacheSetData,
    IVtxcacheSetError,
    IVtxcacheSetRequired,
    VtxcacheActions,
    VtxcacheCb
} from './actionTypes';

export const VtxcacheClear = (entity: string): IVtxcacheClear => ({
    type: VtxcacheActions.VtxcacheClear,
    entity
});

export const VtxcacheCreate = <T = any>(entity: string, signature: string, cb: VtxcacheCb<T>): IVtxcacheCreate => ({
    type: VtxcacheActions.VtxcacheCreate,
    entity,
    signature,
    cb
});

export const VtxcacheSetData = <T = any>(entity: string, signature: string, data: T, block: number): IVtxcacheSetData => ({
    type: VtxcacheActions.VtxcacheSetData,
    entity,
    signature,
    data,
    block
});

export const VtxcacheSetRequired = (entity: string, signature: string): IVtxcacheSetRequired => ({
    type: VtxcacheActions.VtxcacheSetRequired,
    entity,
    signature
});

export const VtxcacheSetError = (entity: string, signature: string, error: Error, block: number): IVtxcacheSetError => ({
    type: VtxcacheActions.VtxcacheSetError,
    entity,
    signature,
    error,
    block
});

export const VtxcacheReset = (): IVtxcacheReset => ({
    type: VtxcacheActions.VtxcacheReset
});
