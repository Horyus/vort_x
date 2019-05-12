import { Store }                      from 'redux';
import Web3                           from 'web3';
import { start, setWeb3, addAccount } from 'ethvtx/lib/dispatchers';

declare global {
    interface Window { web3: any; ethereum: any; }
}

export const setupWeb3 = async (store: Store): Promise<void> => {

    /// If provider requires authorization
    if (window.ethereum) {
        addAccount(store.dispatch, '0xa087a6Ddc4BDB1028fe4431C8616F8E15Cf5F522', {alias: '@permanenttest', permanent: true});

        const web3_getter = async (): Promise<any> => {

            const provider = window.ethereum;
            const web3 = new Web3(provider);

            return web3;
        };

        start(store.dispatch, {
            enable: window.ethereum.enable,
            web3: web3_getter
        });

    } else {
        /// If provider does not require authorization, and we assume web3 is available
        const provider = window.web3.currentProvider;
        //// Should do this in store

        const web3 = new Web3(provider);

        // SETUP CONTRACTS HERE
        addAccount(store.dispatch, '0xa087a6Ddc4BDB1028fe4431C8616F8E15Cf5F522', {alias: '@permanenttest', permanent: true});

        setWeb3(store.dispatch, web3);
        start(store.dispatch);
    }
};
