import { embark } from './embark';

describe('[framework_utils]', () => {

    test('embark.loadSpec bin:true permanent:true', () => {

        const embark_artifact = {
            _jsonInterface: [
                'interface'
            ],
            runtime_bytecode: 'bytecode'
        };

        const res = embark.loadSpec(embark_artifact, 'contract_name', true, true);

        expect(res).toEqual([
            'contract_name',
            ['interface'],
            {
                bin: 'bytecode',
                permanent: true
            }
        ]);

    });

    test('embark.loadSpec bin:false permanent:false', () => {

        const embark_artifact = {
            _jsonInterface: [
                'interface'
            ],
            runtime_bytecode: 'bytecode'
        };

        const res = embark.loadSpec(embark_artifact, 'contract_name', false, false);

        expect(res).toEqual([
            'contract_name',
            ['interface'],
            {
                bin: undefined,
                permanent: false
            }
        ]);

    });

});
