---
id: starting_ethvtx
title: Starting ethvtx
sidebar_label: Starting ethvtx
---

Once the store is created, `ethvtx` is ready to be started, it just needs your signal !

## Setting Web3

The first thing you should do is set the `web3` instance of your choice inside the store. In most of the cases, you want to recover it from your browser. These are the steps to properly load `web3` inside `ethvtx`.

First you will need to install `web3@1.0.0-beta.32`. This is currently the most stable version tested with `ethvtx`. We will try to update this version as soon as `web3` releases new versions that work consistently with our mechanisms.

```jsx

// Import your web3@1.0.0-beta.32
import * as Web3 from 'web3';
import { setWeb3 } from 'ethvtx/lib/dispatchers';

// You should of course check if it exists to detect if the user has a wallet provider.
const window_web3 = window.web3;

// Build an instance of web3@1.0.0-beta.32 by using the provider from the window instance
// Very useful when you want to use a different version of web3 than the one exposed by the wallet provider (Metamask)
const web3 = new Web3(window_web3.currentProvider);

setWeb3(store.dispatch, web3);

```

## Setting Initial Smart Contracts & Accounts

Setting up initial smart contracts and accounts should happen between setting the web3 instance and calling the start method.

### Manual

Let's pretend you have a `SimpleStorage' contract, and you deployed two instances of it. If you wanted to load it you would do this. Also you have your friend Geroge's address that you want to keep in the store even between resets.

Also, let's say that your contracts only exist on a network with network id of 1337.

```jsx

import { loadContractSpec, loadContractInstance } from 'ethvtx/lib/dispatchers';

const contract_name = 'SimpleStorage';
const contract_one_address = '0x6C90AeCe04198DA2d5CA9B956b8F95aF8041DE37';
const contract_two_address = '0x09A38F24D34fa76CFe79725AE62ABb0906571634';
const contract_abi = // Load your contract abi.
const contract_runtime_bytecode = // Load your contract runtime bytecode
const network_id = 1337;
const network_genesis_hash = // hash of block 0 on the network where your contracts exist

// ######
//   ##   
//   ##   
//   ##   
// ######    Load your contract specifications

loadContractSpec(store.dispatch, contract_name, contract_abi, {
    bin: contract_runtime_bytecode, // This is optional.
    permanent: true // By default false.
});

// If bin is provided, the store will check on the network if it 
// finds the same bytecode at the specified address. 
// Useful to find out if a user is not of the good network

// If permanent is true, the store will keep the spec 
// even after a reset of the store. The store resets itself 
// when the user changes its coinbase or its network, 
// or can be manually triggered

// #########
//   ## ##   
//   ## ##   
//   ## ##   
// #########    Load your contract instances

loadContractInstance(store.dispatch, contract_name, contract_one_address, {
    permanent: true // By default false
});

loadContractInstance(store.dispatch, contract_name, contract_two_address, {
    permanent: true // By default false,
    alias: '@defaultsimplestorage' // This is optional
});

// If alias is provided, you will be able to reference this contract with it
// on most of the other helper functions and tools.

// If permanent is true, same as the specs, the store will keep it even after a reset.

// ############
//   ## ## ##   
//   ## ## ##   
//   ## ## ##   
// ############    Load your accounts

addAccount(store.dispatch, '0xa087a6Ddc4BDB1028fe4431C8616F8E15Cf5F522', {
    permanent: true // By default false,
    alias: '@myfriendgeorge' // This is optional
});

// You might need accounts that stay in the store even if the store resets.

// ##############
//   ## ##   ##   
//   ##  ## ##   
//   ##   ##     
// ##############  Set network check informations

setAllowedNet(store.dispatch, network_id, network_genesis_hash);

// This is completely optional, but is useful if you want to quickly detect if you are on the good network.
// You can also provide several networks by calling this method for each network
// If not provided, network check will only happen on smart contraccts (comparing the bytecode stored on the chain vs the bytecode you provided to tell if it's the good network or not)
// This will update the status of the store so you can easily display a message to your user


```

### Embark

You can use our utilities to convert `embark` artifacts to `ethvtx` specs.

You can have a look at the [**Embark Template**](https://github.com/horyus/ethvtx_embark) for a complete usage example.

```jsx

import { loadContractSpec, loadContractInstance } from 'ethvtx/lib/dispatchers';
import { embark } from 'ethvtx/lib/utils';
import SimpleStorage from 'Embark/contracts/SimpleStorage';

const contract_name = 'SimpleStorage';

// ######
//   ##   
//   ##   
//   ##   
// ######    Load your contract specifications

//                                                     artifact       name         bin  permanent
loadContractSpec(store.dispatch, ...embark.loadSpec(SimpleStorage, contract_name, true, true));

// If bin is set to true, the store will check on the network if it 
// finds the same bytecode at the specified address. 
// Useful to find out if a user is not of the good network

// If permanent is true, the store will keep the spec 
// even after a reset of the store. The store resets itself 
// when the user changes its coinbase or its network, 
// or can be manually triggered

// #########
//   ## ##   
//   ## ##   
//   ## ##   
// #########    Load your contract instance

loadContractInstance(store.dispatch, contract_name, SimpleStorage.address, {
    alias: '@defaultsimplestorage', // This is optional
    permanent: true // By default false
});

// If alias is provided, you will be able to reference this contract with it
// on most of the other helper functions and tools.

// If permanent is true, same as the specs, the store will keep it even after a reset.

// ############
//   ## ## ##   
//   ## ## ##   
//   ## ## ##   
// ############    Load your accounts

addAccount(store.dispatch, '0xa087a6Ddc4BDB1028fe4431C8616F8E15Cf5F522', {
    permanent: true // By default false,
    alias: '@myfriendgeorge' // This is optional
});

// You might need accounts that stay in the store even if the store resets.

// ##############
//   ## ##   ##   
//   ##  ## ##   
//   ##   ##     
// ##############  Set network check informations

setAllowedNet(store.dispatch, network_id, network_genesis_hash);

// This is completely optional, but is useful if you want to quickly detect if you are on the good network.
// You can also provide several networks by calling this method for each network
// If not provided, network check will only happen on smart contraccts (comparing the bytecode stored on the chain vs the bytecode you provided to tell if it's the good network or not)
// This will update the status of the store so you can easily display a message to your user

```


## Starting everything up !

`ethvtx` is now ready. Let's sum things up.

To start `ethvtx` you need:

* to recover reducers, initial state and sagas
* to add your reducers, initial state and sagas if you have any
* to create the redux store as shown in the store creation section
* to initialize the contract engine with the store
* to set the web3 instance
* to load the smart contracts

And now you can finally call the start function to boot things up !

```jsx

import { start } from 'ethvtx/lib/dispatchers';

// Before being able to use a wallet provider, you now need to require access.
// A function is exposed on the window if the access request is required.
// This function must be called before being able to use the wallet provider.

const enable = window.ethereum ? window.ethereum.enable : undefined;

start(store.dispatch, enable);

// The start function will give this callback to the store, which will ensure
// it is properly called. If it's undefined, the store will simply ignore it.

```

The store is now started, and the next thing you want to do is recover its status !
