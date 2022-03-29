import { transformData } from '../Utils/transformData';

describe('transform data', () => {
    it('should create correct type and values based on line breaks', () => {
        const pbiData = `Responsible\r\n""\r\nKEF\r\nKMF\r\nKPF\r\nKSF\r\nKSFI\r\nKSI\r\nKSII\r\nKSIL\r\nKVF`;
        const expected = {
            type: 'Responsible',
            values: ['(Blank)', 'KEF', 'KMF', 'KPF', 'KSF', 'KSFI', 'KSI', 'KSII', 'KSIL', 'KVF'],
        };
        const transformedData = transformData(pbiData);
        expect(transformedData).toStrictEqual(expected);
    });

    it('should remove quotation marks from input data and create correct type and values', () => {
        const pbiDataQMarks = `"Project"\r\n"JCA"\r\n"JS"`;
        const transformedData = transformData(pbiDataQMarks);
        const expectedOutput = {
            type: 'Project',
            values: ['JCA', 'JS'],
        };
        expect(transformedData).toStrictEqual(expectedOutput);
    });

    it('should remove commas, but not if comma is in filter value', () => {
        const pbiDataCommas = `"Project"\r\n"JCA",\r\n"J,S",`;
        const transformedData = transformData(pbiDataCommas);
        const expected = {
            type: 'Project',
            values: ['JCA', 'J,S'],
        };
        expect(transformedData).toStrictEqual(expected);
    });

    it('should create (Blank) filter value if empty space with a line break is a filter value', () => {
        const pbiBlank = `Project\r\n\r\nJCA\r\nJS`;
        const transformedData = transformData(pbiBlank);
        const expected = {
            type: 'Project',
            values: ['(Blank)', 'JCA', 'JS'],
        };
        expect(transformedData).toStrictEqual(expected);
    });
});
