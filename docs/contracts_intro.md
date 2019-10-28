---
id: contracts_intro
title: Contracts
sidebar_label: Introduction
---

## Introduction

The `contracts` section might be the most interesting one. Two main concepts to grasp, the contract `spec` and the contract `instance`. 

* The contract `spec` will be what defines a specific type of contract and is composed of the ABI and optionally the runtime and deployment bytecode
* The contract `instance` will be a live instance of a smart contract, linked to a contract spec, with which you will be able to make transaction calls, constant calls et fetch events. You need the `spec` of your contract before creating an instance.

To refresh the data, each call is given a unique signature. Calling `getData(12)` and `getData(13)` will give two different signatures. Also, calling `getData(12)` at two different parts of your program will give you the same signature twice.

Behind a call signature will be stored the result of the request, and some refreshing informations. All this can be easily accessed by the `VtxContract` class, defined in this documentation.

## `VtxContract`

### React

To get a `VtxContract` instance inside your code in react, you can use the `withContracts` HOC. It will handle its creation in the store and will give you the instance in your props whenever it is ready.

You can find more information [**here**](/ethvtx/docs/react_contract)

## Behind the scene

To refresh the data, two rules control the polling engine:

* A new block should be fetched. The store will never fetch the result of a call twice for the same block.
* The data should currently be required somewhere in the code.

The second aspect only works if you use the `VtxContract` to recover your data. It's pretty simple, let's give you an example.

```

Page 1:
    getData(12)
    getData(13)
    
Page 2:
    getData(13)

```

First, you will render the `Page 1`, and will make the two calls shown above. This will create two signatures in the store, and after some time, you will receive the result right throught the `VtxContract` instance. While you stay on `Page 1`, the two calls will be refreshed whenever a new block is received.

Then, you will move to `Page 2`. `getData(13)` has a signature that you already have in the store, so you will directly retrieve the returned value for the call. When a new block is received, only the data for `getData(13)` will be refreshed, as there is no need to refresh `getData(12)` on `Page 2`.

To summarize, data is smartly refreshed and fetched, and you don't have to do anything for it to work properly, just use the provided `VtxContract` instances !

