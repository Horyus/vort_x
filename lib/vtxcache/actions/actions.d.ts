import { IVtxcacheClear, IVtxcacheCreate, IVtxcacheReset, IVtxcacheSetData, IVtxcacheSetError, IVtxcacheSetRequired, VtxcacheCb } from './actionTypes';
export declare const VtxcacheClear: (entity: string) => IVtxcacheClear;
export declare const VtxcacheCreate: <T = any>(entity: string, signature: string, cb: VtxcacheCb<T>) => IVtxcacheCreate<any>;
export declare const VtxcacheSetData: <T = any>(entity: string, signature: string, data: T, block: number) => IVtxcacheSetData<any>;
export declare const VtxcacheSetRequired: (entity: string, signature: string) => IVtxcacheSetRequired;
export declare const VtxcacheSetError: (entity: string, signature: string, error: Error, block: number) => IVtxcacheSetError;
export declare const VtxcacheReset: () => IVtxcacheReset;
