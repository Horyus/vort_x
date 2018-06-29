# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## Unreleased
## [1.0.1-delta.0]
### Added
- `ipfs_config` can be given as config argument to Vortex, and will allow endpoint customization
- `backlink_config` can be given as config argument to Vortex, and will allow backlink endpoint customization
- Ability to enable Backlink, and have dynamic data update (NO MORE POLLING)
- Accounts are refreshed only when a transaction to/from them is caught
- Contracts constant data is refreshed only when a transaction to them is caught

### Changed
- Contract vortex methods are now under `vortexMethods` field (previously was `vortex`)
- Contract static call is now under `call` field (previously was `vortexCall`)
- Contract static call is now under `send` field (previously was `vortexSend`)
- Contract static call is now under `data` field (previously was `vortexData`)
- Transaction arguments are now last argument (like in web3) for `call`, `send` and `data` of every contract
- Basically:

```diff
-   state[name][address].instance.vortex.set.vortexSend({from: coinbase}, 12);
+   state[name][address].instance.vortexMethods.set.send(12, {from: coinbase});
```

- Internal IPFS mechanisms got improved

[[Unreleased]](https://github.com/Horyus/vortex/compare/1.0.1-delta.0...HEAD)
[[1.0.1-delta.0]](https://github.com/Horyus/vortex/compare/1.0.1-charlie.1...1.0.1-delta.0)


