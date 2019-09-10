export const check_code_at = async (web3: any, contract_address: string, target_bin: string): Promise<boolean> => {

    if (target_bin.indexOf('0x') !== 0) {
        target_bin = `0x${target_bin}`;
    }

    target_bin = target_bin.toLowerCase();
    const remote_code = (await web3.eth.getCode(contract_address)).toLowerCase();

    return target_bin === remote_code;
};
