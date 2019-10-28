---
id: blocks_intro
title: Blocks
sidebar_label: Introduction
---

The core concept behind `ethvtx` is to constantly poll for current block height, and fetch required information only when block height is updated. This way, we minimize clumsy refresh and polling by making sure that data fetching and updating is not superfluous or redondant.

So, as the block height is constantly polled, we also fetch the new blocks when they're ready, and they're stored inside `ethvtx` for you to access them. By default, only blocks from the moment the app is running will be fetched, but you can also manually request a block to be fetched, and the polling engine will handle everything.
