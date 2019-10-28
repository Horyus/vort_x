---
id: contracts_state
title: Contracts State
sidebar_label: State
---

All these types are accessible in TS from `ethvtx/lib/state`;

The organization of the `contracts` might seem non-trivial to use, and it's normal. This is why you should prefer using the `getters` instead of trying to manually crawl through the store.


## ContractsSpec

```
{
    name: string;
    abi: any;
    bin: string;
    constructor_bin: string;
    permanent: boolean;
}
```

## ContractsSpecStore

```
{
    [key: string]: ContractsSpec;
}
```

## ContractsInstance

An contract instance is defined by a web3 `Contract` instance, the valid and the permenent flag. This flag will keep the contract from being removed when the store resets himself.

```typescript
{
    [key: string]: { 
        permanent: boolean; 
        valid: boolean; 
        web3_instance: any; 
    };
}
```

## ContractsInstanceStore

```typescript
{
    [key: string]: ContractsInstances;
}
```

## ContractTypeStore

```typescript
{
    [key: string]: ContractsInstancesStore;
}
```

## ContractAlias

Defines an alias, an easier way to identify contracts, instead of always using the address.

```
{
    address: string;
    permanent: boolean;
}
```

## ContractAliasStore

```
{
    [key: string]: ContractAlias;
}
```

## ContractTypeAliasStore

```
{
    [key: string]: ContractAliasStore;
}
```

## ContractsSection

This is what you can access at `state.accounts`.

```
{
    specs: ContractsSpecStore;
    instances: ContractsTypeStore;
    web3: Web3;
    alias: ContractTypeAliasStore;
}
```
