import { VtxcacheCb } from '../vtxcache/actions/actionTypes';
export interface VtxcacheElement<T = any> {
    cb: VtxcacheCb<T>;
    block: number;
    required: boolean;
    data: T;
    signature: string;
    error: Error;
}
export interface VtxcacheStore {
    [key: string]: VtxcacheElement;
}
export interface VtxcacheEntityStore {
    [key: string]: VtxcacheStore;
}
export interface VtxcacheSection {
    store: VtxcacheEntityStore;
}
