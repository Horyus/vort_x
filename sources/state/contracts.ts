export interface ContractsSpec {
    name: string;
    abi: any;
    bin: string;
    constructor_bin: string;
    permanent: boolean;
}

export interface ContractsSpecStore {
    [key: string]: ContractsSpec;
}

export interface ContractsInstances {
    [key: string]: { permanent: boolean; valid: boolean; };
}

export interface ContractsTypeStore {
    [key: string]: ContractsInstances;
}

export interface ContractAlias {
    address: string;
    permanent: boolean;
}

export interface ContractAliasStore {
    [key: string]: ContractAlias;
}

export interface ContractTypeAliasStore {
    [key: string]: ContractAliasStore;
}

export interface ContractsSection {
    specs: ContractsSpecStore;
    instances: ContractsTypeStore;
    web3: any;
    alias: ContractTypeAliasStore;
}
