<!--
  Title: Vortex
  Description: Ethereum Ready and Framework Agnostic Redux Store Configuration 
  Author: mortimr
  -->
<div align="center" >
<img src="https://github.com/ticket721/ethvtx/raw/develop/imgs/logo.svg" style="margin-bottom: 20px;">
</div>

## Introduction

`ethvtx` is an Ethereum-Ready & Framework-Agnostic Redux configuration. This package contains all the tools to build an efficient Redux store for your Dapp. Our goal was to create a tool that will allow Dapp developers to efficiently fetch and manipulate informations about the Ethereum Blockchain. By minimizing the amount of requests and by caching and reusing as much data as possible, we decrease the impact that our apps have on the Ethereum nodes.

A complete set of **dispatcher** and **getters** are exposed to the developer and can be used directly inside any of the `mapStateToProps` or `mapDispatchToProps` functions to properly recover informations or emit actions.

The store handles [**transactions**](http://doc.ethvtx.com/docs/transactions_intro), [**accounts**](http://doc.ethvtx.com/docs/accounts_intro), [**contracts**](http://doc.ethvtx.com/docs/contracts_intro) and [**blocks**](http://doc.ethvtx.com/docs/blocks_intro). Each single section has its own set of **dispatchers** and **getters**, and all are well documented in the official documentation,

## Installation

```shell
npm install --save ethvtx redux redux-saga
```

More informations [here](http://doc.ethvtx.com/docs/install)

## Documentation

An extensive usage documentation can be found [here](http://doc.ethvtx.com)

## Questions ? [![Join the chat at https://gitter.im/ethvtx/general](https://badges.gitter.im/ethvtx/general.svg)](https://gitter.im/ethvtx/general?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge) !


## Examples

### Embark Showcase Project

There is an example project showcasing how to use `ethvtx` in an embark project.

It can be found [here](https://github.com/ticket721/ethvtx_embark)

### React TS Showcase Application

The repository contains a complete React Typescript Showcase.

Start by setting up a ganache node in one terminal:
```shell
ganache-cli
```

To setup the showcase, run:
```shell
git clone https://github.com/ticket721/ethvtx
cd ethvtx/examples
npm run setup
npm run start
```

You can then visit the app from http://localhost:3000.
Be sure to have [Metamask](https://metamask.io/) installed, and quadruple-check that you aren't on the Main Ethereum Network before testing transactions :) .


## Status

| Service | Status |
| :---: | :---: |
| Coveralls | [![Coverage Status](https://coveralls.io/repos/github/ticket721/ethvtx/badge.svg?branch=develop)](https://coveralls.io/github/ticket721/ethvtx?branch=develop) |
