const loadSpec = (embark_instance: any, name: string, bin: boolean, permanent: boolean): any[] =>
    ([name, embark_instance._jsonInterface, {
        bin: bin ? embark_instance.runtime_bytecode : undefined,
        permanent
    }]);

export const embark = {
    loadSpec
};
