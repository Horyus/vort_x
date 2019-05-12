import { Store }                      from 'redux';
import Web3                           from 'web3';
import { start, setWeb3, addAccount, authorizeAndSetWeb3 } from 'ethvtx/lib/dispatchers';

declare global {
    interface Window { web3: any; ethereum: any; }
}

export const setupWeb3 = async (store: Store): Promise<void> => {

    /// If provider requires authorization
    if (window.ethereum) {

        const web3_getter = async (): Promise<any> => {

            const provider = window.ethereum;
            const web3 = new Web3(provider);

            return web3;
        };

        await authorizeAndSetWeb3(store.dispatch, {
            enable: window.ethereum.enable,
            web3: web3_getter
        });

        addAccount(store.dispatch, '0xa087a6Ddc4BDB1028fe4431C8616F8E15Cf5F522', {alias: '@permanenttest', permanent: true});

        start(store.dispatch);

    } else {
        /// If provider does not require authorization, and we assume web3 is available
        const provider = window.web3.currentProvider;
        //// Should do this in store

        const web3 = new Web3(provider);

        setWeb3(store.dispatch, web3);

        // SETUP CONTRACTS HERE
        addAccount(store.dispatch, '0xa087a6Ddc4BDB1028fe4431C8616F8E15Cf5F522', {alias: '@permanenttest', permanent: true});

        start(store.dispatch);
    }
};
