import { utils } from 'ethers';

/**
 * @description Utility to format addresses
 *
 * @param address Value to format
 */
export const getAddress = (address: string): string => {
    return utils.getAddress(address);
};
