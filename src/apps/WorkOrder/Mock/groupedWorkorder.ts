import { GardenGroups } from '../../../components/ParkView/Models/data';
import { getYearAndWeekFromDate } from '@equinor/GardenUtils';
import { WorkOrder } from '../Garden/models';

export const groupedWorkOrder: GardenGroups<WorkOrder> = [
    {
        groupKey: 'hwp' as keyof WorkOrder,
        value: '2022-35',
        count: 1,
        isExpanded: true,
        items: [
            {
                projectIdentifier: 'L.O532C.002',
                workOrderNumber: 'LX0SYSTEM43',
                workOrderUrlId: '',
                commissioningPackageUrlId: '',
                workBreakdownStructure: '',
                description:
                    'Apply / rectify sealent to the boxes that are part of the HPLT (High pressure leak test) - Syst 43',
                discipline: 'Architect and building (incl insulation)',
                disciplineCode: 'C',
                responsible: null,
                responsibleCode: 'KSI',
                milestone: null,
                milestoneCode: null,
                materialStatus: 'MN',
                plannedStartupDate: '2022-09-01',
                w1ActualDate: null,
                w2ActualDate: null,
                w3ActualDate: '2022-08-26T00:00:00+00:00',
                w4ActualDate: null,
                w5ActualDate: null,
                w6ActualDate: null,
                w7ActualDate: null,
                w8ActualDate: null,
                w9ActualDate: null,
                w10ActualDate: null,
                commpkgNumber: null,
                workOrderId: '117715962',
                materialComments: null,
                constructionComments: null,
                projectProgress: '66.67',
                estimatedHours: '24.00',
                remainingHours: '88.00',
                expendedHours: null,
                mccrStatus: null,
                holdBy: null,
                holdByDescription: null,
                jobStatus: 'W03',
                projectDescription: 'Johan Castberg Facilities Project',
                plannedFinishDate: '2022-11-09',
                actualStartupDate: '2022-08-16',
                actualFinishDate: null,
                commpkgId: null,
                priority1: 'CIT',
                priority2: '',
                priority3: '',
            },
        ],
        subGroups: [],
        description: '',
        subGroupCount: 0,
        depth: 0,
    },
    {
        groupKey: 'hwp' as keyof WorkOrder,
        value: getYearAndWeekFromDate(new Date()),
        count: 1,
        isExpanded: true,
        items: [
            {
                projectIdentifier: 'L.O532C.002',
                workOrderNumber: 'LM5PDECK-7.01',
                commissioningPackageUrlId: '',
                workBreakdownStructure: '',
                workOrderUrlId: '',
                description:
                    'STR-5234 surface treatment of HVAC House - Outside wall portside  - Poop Deck',
                discipline: 'Material technology (incl surface prot.)',
                disciplineCode: 'M',
                responsible: null,
                responsibleCode: 'KSI',
                milestone: null,
                milestoneCode: null,
                materialStatus: 'MN',
                plannedStartupDate: new Date().toDateString(),
                w1ActualDate: null,
                w2ActualDate: '2022-08-01T00:00:00+00:00',
                w3ActualDate: null,
                w4ActualDate: '2022-08-02T00:00:00+00:00',
                w5ActualDate: '2022-08-09T00:00:00+00:00',
                w6ActualDate: '2022-08-23T00:00:00+00:00',
                w7ActualDate: null,
                w8ActualDate: null,
                w9ActualDate: null,
                w10ActualDate: null,
                commpkgNumber: null,
                workOrderId: '117534742',
                materialComments: null,
                constructionComments: null,
                projectProgress: '99.00',
                estimatedHours: '760.00',
                remainingHours: '10.00',
                expendedHours: null,
                mccrStatus: null,
                holdBy: null,
                holdByDescription: null,
                jobStatus: 'W06',
                projectDescription: 'Johan Castberg Facilities Project',
                plannedFinishDate: '2022-10-14',
                actualStartupDate: '2022-07-26',
                actualFinishDate: '2022-08-19',
                commpkgId: null,
                priority1: 'CIT',
                priority2: '',
                priority3: '',
            },
        ],
        subGroups: [],
        description: '',
        subGroupCount: 0,
        depth: 0,
    },
];
