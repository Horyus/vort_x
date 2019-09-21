import { utils } from 'ethers';
/**
 * @description Utility to check if provided argument is a proper ethereum address
 *
 * @param address Value to check
 */
export var isAddress = function (address) {
    try {
        void utils.getAddress(address);
        return true;
    }
    catch (e) {
        return false;
    }
};
//# sourceMappingURL=isAddress.js.map