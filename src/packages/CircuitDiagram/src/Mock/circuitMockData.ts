import { EleNetwork } from '../types/eleNetwork';

export const eleTestData: EleNetwork = {
    eleNetId: 78780,
    circuits: [
        {
            eleNetId: 78780,
            parentEleNetId: null,
            tagNo: '82EL065',
            eleSymbolCode: 'TAVLE',
            circuitSymbolCode: 'KURS',
            circuitUsage: 'O',
        },
        {
            eleNetId: 78781,
            parentEleNetId: 78780,
            tagNo: '82EL065-409-B01',
            eleSymbolCode: 'K_BOX',
            circuitSymbolCode: null,
            circuitUsage: null,
        },
        {
            eleNetId: 78783,
            parentEleNetId: 78781,
            tagNo: '82EL065-409-B02',
            eleSymbolCode: 'K_BOX',
            circuitSymbolCode: null,
            circuitUsage: null,
        },
        {
            eleNetId: 78788,
            parentEleNetId: 78783,
            tagNo: '82EL065-409-B03',
            eleSymbolCode: 'K_BOX',
            circuitSymbolCode: null,
            circuitUsage: null,
        },
        {
            eleNetId: 78784,
            parentEleNetId: 78783,
            tagNo: '82EL065-409-B04',
            eleSymbolCode: 'K_BOX',
            circuitSymbolCode: null,
            circuitUsage: null,
        },
        {
            eleNetId: 78782,
            parentEleNetId: 78781,
            tagNo: 'HT201609A',
            eleSymbolCode: 'HT_KAB',
            circuitSymbolCode: null,
            circuitUsage: null,
        },
        {
            eleNetId: 78787,
            parentEleNetId: 78783,
            tagNo: 'HT201609B',
            eleSymbolCode: 'HT_KAB',
            circuitSymbolCode: null,
            circuitUsage: null,
        },
        {
            eleNetId: 78786,
            parentEleNetId: 78783,
            tagNo: 'HT201609C',
            eleSymbolCode: 'HT_KAB',
            circuitSymbolCode: null,
            circuitUsage: null,
        },
        {
            eleNetId: 78789,
            parentEleNetId: 78788,
            tagNo: 'HT201609D',
            eleSymbolCode: 'HT_KAB',
            circuitSymbolCode: null,
            circuitUsage: null,
        },
        {
            eleNetId: 78790,
            parentEleNetId: 78788,
            tagNo: 'HT201609E',
            eleSymbolCode: 'HT_KAB',
            circuitSymbolCode: null,
            circuitUsage: null,
        },
        {
            eleNetId: 78791,
            parentEleNetId: 78788,
            tagNo: 'HT201609F',
            eleSymbolCode: 'HT_KAB',
            circuitSymbolCode: null,
            circuitUsage: null,
        },
        {
            eleNetId: 78785,
            parentEleNetId: 78784,
            tagNo: 'HT201609G',
            eleSymbolCode: 'HT_KAB',
            circuitSymbolCode: null,
            circuitUsage: null,
        },
    ],
    cables: [
        {
            tagNo: 'PT201609A',
            tagFrom: '82EL065-409',
            tagTo: '82EL065-409-B01',
            estimatedCableLength: '50',
            installedCableLength: '40',
            pulledDate: '2020-12-27T00:00:00+00:00',
            releasedDate: null,
            terminatedFromDate: '2021-02-15T00:00:00+00:00',
            terminatedToDate: '2021-03-22T00:00:00+00:00',
            testedDate: '2021-03-22T00:00:00+00:00',
        },
        {
            tagNo: 'PT201609B',
            tagFrom: '82EL065-409-B01',
            tagTo: '82EL065-409-B02',
            estimatedCableLength: '20',
            installedCableLength: '41',
            pulledDate: '2021-01-12T00:00:00+00:00',
            releasedDate: null,
            terminatedFromDate: '2021-02-22T00:00:00+00:00',
            terminatedToDate: '2021-01-26T00:00:00+00:00',
            testedDate: '2021-02-22T00:00:00+00:00',
        },
        {
            tagNo: 'PT201609C',
            tagFrom: '82EL065-409-B02',
            tagTo: '82EL065-409-B03',
            estimatedCableLength: '20',
            installedCableLength: '7',
            pulledDate: '2020-05-20T00:00:00+00:00',
            releasedDate: null,
            terminatedFromDate: '2020-10-22T00:00:00+00:00',
            terminatedToDate: '2021-01-26T00:00:00+00:00',
            testedDate: '2020-06-11T00:00:00+00:00',
        },
        {
            tagNo: 'PT201609D',
            tagFrom: '82EL065-409-B02',
            tagTo: '82EL065-409-B04',
            estimatedCableLength: '20',
            installedCableLength: '23',
            pulledDate: '2020-05-20T00:00:00+00:00',
            releasedDate: null,
            terminatedFromDate: '2020-10-22T00:00:00+00:00',
            terminatedToDate: '2020-06-11T00:00:00+00:00',
            testedDate: '2020-06-11T00:00:00+00:00',
        },
    ],
    checkLists: [
        {
            tagNo: 'HT201609C',
            responsible: 'KSI',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OS',
        },
        {
            tagNo: '82EL065-409-B01',
            responsible: 'KSII',
            formularType: 'ELE20',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609D',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: '82EL065',
            responsible: 'KSI',
            formularType: 'ELE10',
            formularGroup: 'MCCR',
            status: 'OS',
        },
        {
            tagNo: 'HT201609A',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'PT201609D',
            responsible: 'KSF',
            formularType: 'E-C',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609D',
            responsible: 'KSII',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: '82EL065-409-B04',
            responsible: 'KSF',
            formularType: 'ELE20',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609A',
            responsible: 'KSII',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609G',
            responsible: 'KSF',
            formularType: 'ELE19.2V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: '82EL065',
            responsible: 'KSF',
            formularType: 'ELE10V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609B',
            responsible: 'KSF',
            formularType: 'ELE19.2V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609C',
            responsible: 'KSF',
            formularType: 'ELE19.2V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609G',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: '82EL065-409-B03',
            responsible: 'KSII',
            formularType: 'ELE20',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'PT201609A',
            responsible: 'KSF',
            formularType: 'E-C',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609E',
            responsible: 'KSII',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609B',
            responsible: 'KSI',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OS',
        },
        {
            tagNo: 'HT201609C',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: '82EL065-409',
            responsible: 'KSI',
            formularType: 'ELE19.3',
            formularGroup: 'MCCR',
            status: 'OS',
        },
        {
            tagNo: 'PT201609B',
            responsible: 'KSF',
            formularType: 'E-C',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609F',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'PT201609C',
            responsible: 'KSF',
            formularType: 'E-C',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609E',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609F',
            responsible: 'KSII',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: '82EL065-409-B02',
            responsible: 'KSF',
            formularType: 'ELE20',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: '82EL065',
            responsible: 'ASMS',
            formularType: 'ELE10V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            tagNo: 'HT201609B',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
    ],
    switchBoardTagNo: '82EL065-409',
};
