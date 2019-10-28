---
id: react_intro
title: React
sidebar_label: Introduction
---

`ethvtx` was initially built with React in mind. The store works extremelly well with React apps, and Contract reading is done in a reactive and smart manner.

## Prerequisite

Install `react`, `redux`, `react-redux` and `redux-saga`.

```
npm install --save react redux react-redux redux-saga
```

You'll also need `react-ethvtx`, our React utility package.

```
npm install --save react-ethvtx
```

## What you can do

- **Read the store**, and recover important information stored in the store.
- **Dispatch actions** to follow balances, contracts, events, blocks, transactions ...
- **Use the `withContract` HOC** and load `VtxContract` instance into your props
- Use `VtxContract` instance to **make smart contract calls**
- Use `VtxContract` instance to **make smart contract transaction**
- Use `VtxContract` instance to **subscribe to events**

