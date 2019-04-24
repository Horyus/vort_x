export declare const TxStatus: {
    [key: string]: string;
};
export interface TxInfos {
    hash: string;
    nonce: number;
    blockHash: string;
    blockNumber: number;
    transactionIndex: number;
    from: string;
    to: string;
    value: string;
    gasPrice: string;
    gas: number;
    input: string;
    v?: string;
    r?: string;
    s?: string;
}
export interface NewContractInfos {
    name: string;
    permanent?: boolean;
    alias?: string;
    balance?: boolean;
}
export interface Tx {
    infos: Partial<TxInfos>;
    status: string;
    e: Error;
    hash: string;
    new_contract?: NewContractInfos;
    contract_address?: string;
    id?: number;
}
export interface TxSection {
    [key: string]: Tx;
}
