import { Store }                      from 'redux';
import Web3                           from 'web3';
import { start, setWeb3, addAccount } from 'ethvtx/lib/dispatchers';

declare global {
    interface Window { web3: any; ethereum: any; }
}

export const setupWeb3 = async (store: Store): Promise<void> => {

    const provider = window.web3.currentProvider;
    //// Should do this in store

    const web3 = new Web3(provider);

    setWeb3(store.dispatch, web3);

    // SETUP CONTRACTS HERE
    addAccount(store.dispatch, '0xa087a6Ddc4BDB1028fe4431C8616F8E15Cf5F522', {alias: '@permanenttest', permanent: true});

    start(store.dispatch, window.ethereum ? window.ethereum.enable : undefined);

};
