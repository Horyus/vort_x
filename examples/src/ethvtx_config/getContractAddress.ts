import Web3 from 'web3';
import SimpleStorage from '../contracts/SimpleStorage.json';

const web3_getter = async (): Promise<any> => {

    const provider = (window as any).ethereum;
    const web3 = new Web3(provider);

    return web3;
};

let address: string | null = null;

export const get_contract_address = async (): Promise<string | null> => {

    if (address === null) {

        const web3_instance = await web3_getter();
        const net = await web3_instance.eth.net.getId();
        address = (SimpleStorage as any).networks[net].address;

    }

    return address;

};
