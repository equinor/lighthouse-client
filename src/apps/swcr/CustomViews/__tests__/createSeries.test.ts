import { DateTime } from 'luxon';
import { Series } from '../../../Construction/Components/ConstructionVisual/Types';
import { SwcrPackage } from '../../models/SwcrPackage';
export const getLastWeeks = () => {
    const today = new Date();
    const week = DateTime.fromJSDate(today).startOf('week').toJSDate();
    const weeks: number[] = [];
    for (let i = 0; i < 20; i++) {
        const offset = i * 7;
        const startOfWeek = DateTime.fromJSDate(today).startOf('week').toJSDate();
        startOfWeek.setDate(week.getDate() - offset);
        weeks.push(DateTime.fromJSDate(startOfWeek).weekNumber);
    }
    return weeks.reverse();
};

describe('create series', () => {
    it('should create', () => {
        const series = createSeries(swcrPackage, getLastWeeks());
        console.log(series);
    });
});

type Temp = Record<string, number>;
const createCategoriesMap = (categories: Date[]) => {
    return categories.reduce((acc, curr) => {
        acc[curr.toString()] = 0;
        return acc;
    }, {});
};
type Foo = Record<'Open' | 'Closed', number>;
type Blah = Record<string, Foo>;
const a: Blah = {
    '2020': {
        Open: 1,
        Closed: 2,
    },
    '2021': {
        Open: 1,
        Closed: 2,
    },
};

// Categories [2020, 2021]
// Series [[1,2], [1,2]]
export const createSeries = (data: SwcrPackage[], categories) => {
    const SERIESNAMES = ['Created', 'Closed'];
    const accOpenClosed = data.reduce((acc, curr) => {
        const isClosedAtDate = DateTime.fromJSDate(new Date(curr.closedAtDate))
            .startOf('week')
            .toJSDate();
        acc[isClosedAtDate.toString()] = {
            ...acc[isClosedAtDate.toString()],
            Closed: acc[isClosedAtDate.toString()]?.Closed + 1 || 1,
        };

        const isCreatedAtDate = DateTime.fromJSDate(new Date(curr.createdAtDate))
            .startOf('week')
            .toJSDate();
        acc[isCreatedAtDate.toString()] = {
            ...acc[isCreatedAtDate.toString()],
            Open: acc[isCreatedAtDate.toString()]?.Open + 1 || 1,
        };
        return acc;
    }, {} as Blah);
    const series = SERIESNAMES.map((name) => {
        const seriesData: number[] = [];
        categories?.forEach((cat) => {
            seriesData.push(accOpenClosed[cat.toString()][name]);
        });
        return { label: name, data: seriesData };
    });

    console.log('sereis', series);

    const s: Series = {
        label: 'Closed',
        data: Object.values(accOpenClosed).map((val) => val.Closed),
    };
    const s2: Series = {
        label: 'Open',
        data: Object.values(accOpenClosed).map((val) => val.Open),
    };

    //     const series = cats.reduce((acc, curr, index) => {
    //         acc.push(
    //             {
    //                 label: 'Closed',
    //                 data: [...(acc[index]?.data || []), temp[curr].Closed],
    //             },
    //             {
    //                 label: 'Open',
    //                 data: [...(acc[index]?.data || []), temp[curr].Open],
    //             }
    //         );
    //         return acc;
    //     }, [] as Series[]);

    return [s, s2];
};
export const seriesOutput: Series[] = [{ label: 'Open', data: [1] }];
export {};

export const swcrPackage: SwcrPackage[] = [
    {
        siteCode: 'JCA',
        projectIdentifier: 'L.O532C.002',
        projectDescription: 'Johan Castberg Facilities Project',
        swcrNo: '683',
        title: 'System 18 - EI215-Annulus Vent Monitoring system SW FAT changes',
        description:
            'Please refer to C143-AS-EI171-RF-00330, SAS SOFTWARE FAT REPORT - SYSTEM 18 ANNULUS VENT SYSTEM  document.\n\nSCD updates:\n1) 18FQI95XX logic has been updated. XEQ pin has been removed and the input is connected to the FQ pin. Refer to the SCDs.\n2)  Pressure buildup/relief timer logic has been updated.  A timer (3Sec) has been added for the FQ logic. RXQ input has been changed. Also 2Sec pulse has been added.\n3) The funtion block has been changed from QA to MA for annulus gas average temperature during pressure relief signal, Free annulus volume for the riser signal and diffusion Rate signal.\n4) AVM Skrugard/Havis & drivis water injection riser:  18PT9541.BXL/18PT9581.BXL connection to the sequence has been removed.\n\nSequence updates:\n1) PT/FT tag number has been added for the TRANS.\n2) Sequence 18KI9579: 18HS9528.YBM1=1 has been changed to 18HS9578.YBM1=1 \n3) Sequence 18KI9589: \n  Step 10 : 18PT9543 has been changed to 18PT9583.\n TRANS 30 : 18PT9541 has been changed to 18PT9581\n            and 18FT9546 has been changed to 18FT9586. \n\nSW report updates:\nFQI range and units are updated.\n\n',
        modification:
            'ABB/VIPA/26.11.2020:\nABB Software implementation is completed. Related evidence has been attached.\n\nObservation:\n1. Around 16 sequence texts are exceeding on the faceplate.\n\n\nPB/28.06.2021/ AKSO:\n\nThe AVMS logic updates related to FAT has been tested. ',
        priority: 'MEDIUM',
        system: '18',
        controlSystem: 'PCS',
        contract: 'SBM FC',
        action: '',
        supplier: '',
        node: 'C01',
        status: 'Ready for Retest',
        referenceTypes: '',
        types: 'SW',
        createdAtDate: '2020/02/28',
        updatedAtDate: '2021/06/29',
        dueAtDate: '',
        closedAtDate: '2021/06/29',
        nextToSign: 'Workflow complete',
        estimatedManhours: '',
        cntAttachments: '5',
        cpkgNo: '1840-T01',
        cpkgPhase: 'CIS',
        cpkgStartPlannedAtDate: '2021/10/31',
        cpkgStartForecastAtDate: '2023/09/03',
        cpkgFinishPlannedAtDate: '',
        cpkgFinishForecastAtDate: '',
        url: 'https://procosys.equinor.com/JOHAN_CASTBERG/SWAP/SWCR/#id=115311561',
        latestSignRanking: '45',
        nextSignRanking: '',
        swcrId: '115311561',
        rowKey: '683',
        nextsToSign: ['Workflow complete'],
    },
    {
        siteCode: 'JCA',
        projectIdentifier: 'L.O532C.002',
        projectDescription: 'Johan Castberg Facilities Project',
        swcrNo: '683',
        title: 'System 18 - EI215-Annulus Vent Monitoring system SW FAT changes',
        description:
            'Please refer to C143-AS-EI171-RF-00330, SAS SOFTWARE FAT REPORT - SYSTEM 18 ANNULUS VENT SYSTEM  document.\n\nSCD updates:\n1) 18FQI95XX logic has been updated. XEQ pin has been removed and the input is connected to the FQ pin. Refer to the SCDs.\n2)  Pressure buildup/relief timer logic has been updated.  A timer (3Sec) has been added for the FQ logic. RXQ input has been changed. Also 2Sec pulse has been added.\n3) The funtion block has been changed from QA to MA for annulus gas average temperature during pressure relief signal, Free annulus volume for the riser signal and diffusion Rate signal.\n4) AVM Skrugard/Havis & drivis water injection riser:  18PT9541.BXL/18PT9581.BXL connection to the sequence has been removed.\n\nSequence updates:\n1) PT/FT tag number has been added for the TRANS.\n2) Sequence 18KI9579: 18HS9528.YBM1=1 has been changed to 18HS9578.YBM1=1 \n3) Sequence 18KI9589: \n  Step 10 : 18PT9543 has been changed to 18PT9583.\n TRANS 30 : 18PT9541 has been changed to 18PT9581\n            and 18FT9546 has been changed to 18FT9586. \n\nSW report updates:\nFQI range and units are updated.\n\n',
        modification:
            'ABB/VIPA/26.11.2020:\nABB Software implementation is completed. Related evidence has been attached.\n\nObservation:\n1. Around 16 sequence texts are exceeding on the faceplate.\n\n\nPB/28.06.2021/ AKSO:\n\nThe AVMS logic updates related to FAT has been tested. ',
        priority: 'MEDIUM',
        system: '18',
        controlSystem: 'PCS',
        contract: 'SBM FC',
        action: '',
        supplier: '',
        node: 'C01',
        status: 'Closed',
        referenceTypes: '',
        types: 'SW',
        createdAtDate: '2020/02/28',
        updatedAtDate: '2021/06/29',
        dueAtDate: '',
        closedAtDate: '2021/06/29',
        nextToSign: 'Workflow complete',
        estimatedManhours: '',
        cntAttachments: '5',
        cpkgNo: '1840-T01',
        cpkgPhase: 'CIS',
        cpkgStartPlannedAtDate: '2021/10/31',
        cpkgStartForecastAtDate: '2023/09/03',
        cpkgFinishPlannedAtDate: '',
        cpkgFinishForecastAtDate: '',
        url: 'https://procosys.equinor.com/JOHAN_CASTBERG/SWAP/SWCR/#id=115311561',
        latestSignRanking: '45',
        nextSignRanking: '',
        swcrId: '115311561',
        rowKey: '683',
        nextsToSign: ['Workflow complete'],
    },
];
