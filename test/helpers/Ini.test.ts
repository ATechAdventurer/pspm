import { expect } from 'chai';
import { Ini } from '../../src/helpers/Ini';

describe('Ini', () => {
    const exampleFile = `# comment
    test = 1
    test2 = 2
    test3 = "1"
    test4 = '2'
    test5 = abcsf
    test6=5
    test7=test;45453;werer
    `;
    const ini = new Ini(exampleFile);

    it('Should return the string value properly', () => {
        expect(ini.toString()).to.equal(exampleFile);
    })

    it('Should set the value properly', () => {
        ini.set('test', '3');
        expect(ini.get('test')).to.equal('3');
    });
});
