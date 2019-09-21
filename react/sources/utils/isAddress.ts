import { utils } from 'ethers';

/**
 * @description Utility to check if provided argument is a proper ethereum address
 *
 * @param address Value to check
 */
export const isAddress = (address: string): boolean => {
    try {
        void utils.getAddress(address);
        return true;
    } catch (e) {
        return false;
    }
};
