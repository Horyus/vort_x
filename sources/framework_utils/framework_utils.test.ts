import { embark } from './embark';
import * as expect                                               from 'expect';

describe('[framework_utils]', function (): void {

    it('embark.loadSpec bin:true permanent:true', function (): void {

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

    it('embark.loadSpec bin:false permanent:false', function (): void {

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
