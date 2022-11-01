import { CheckListStatus, PipetestCompletionStatus, PipetestStep } from '../Types/drcEnums';
import { Pipetest } from '../Types/pipetest';

export const testData1: Pipetest = {
    name: '2002-L005',
    description: 'Test Separator and Inlet Heater',
    commPkPriority1: 'ECM10',
    rfccPlanned: '2023-07-21T00:00:00+00:00',
    location: 'AP700',
    mcPkgId: '112744027',
    hasDisconnectedEquipment: false,
    hasIsolatedEquipment: false,
    htCableExposed: null,
    hasCriticalLine: false,
    htStep: PipetestStep.Unknown,
    checkLists: [
        {
            tagNo: '82EL056-419',
            responsible: 'KSI',
            formularType: 'ELE19.3',
            formularGroup: 'MCCR',
            status: 'OS',
        },
        {
            tagNo: '82EL064-417',
            responsible: 'KSI',
            formularType: 'ELE19.3',
            formularGroup: 'MCCR',
            status: 'OS',
        },
        {
            tagNo: '82EL065-409',
            responsible: 'KSI',
            formularType: 'ELE19.3',
            formularGroup: 'MCCR',
            status: 'OS',
        },
        {
            revision: '1',
            isHeatTrace: false,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: '#T-2002-L005',
            responsible: 'KSF',
            formularType: 'PIP04',
            formularGroup: 'MCCR',
            status: 'PA',
            workflowStepText: 'T',
            stepName: 'Pressure test',
        },
        {
            revision: '1',
            isHeatTrace: false,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: '#X-2002-L005',
            responsible: 'KSF',
            formularType: 'SUR05',
            formularGroup: 'MCCR',
            status: 'PB',
            workflowStepText: 'X',
            stepName: 'Painting',
        },
        {
            revision: '1',
            isHeatTrace: false,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: '#B-2002-L005',
            responsible: 'KSF',
            formularType: 'MEC25',
            formularGroup: 'MCCR',
            status: 'OK',
            workflowStepText: 'B',
            stepName: 'Bolt tensioning',
        },
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201219A',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201517A',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201609A',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            revision: '1',
            isHeatTrace: false,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: '#Z-2002-L005',
            responsible: 'KSII',
            formularType: 'ING04',
            formularGroup: 'MCCR',
            status: 'OK',
            workflowStepText: 'Z',
            stepName: 'Insulation',
        },
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201219A',
            responsible: 'KSI',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201517A',
            responsible: 'KSII',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201609A',
            responsible: 'KSII',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            revision: '1',
            isHeatTrace: false,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: '#M-2002-L005',
            responsible: 'KSII',
            formularType: 'PIP06',
            formularGroup: 'MCCR',
            status: 'OK',
            workflowStepText: 'M',
            stepName: 'Marking',
        },
    ],
    insulationBoxes: [
        {
            objectNo: 'FLAN-200098-P05',
            objectName: 'AP700-2002-L005-20L00503A-1600PR-BD100-CL1500',
            objectStatusName: 'BOX INSTALLED APPROVED',
            objectStatus: 'VF47',
            object3dReference: '=25218/55714',
            procosysStatus: '',
        },
        {
            objectNo: 'PCOM-200110-P04',
            objectName: 'AP700-2002-L005-20L00503B-2400PR-BD100',
            objectStatusName: 'BOX INSTALLED APPROVED',
            objectStatus: 'VF47',
            object3dReference: '=17026/38911',
            procosysStatus: 'OK',
        },
        {
            objectNo: 'PCOM-200100-P19-99',
            objectName: 'AP700-2002-L005-20L00503A-1600PR-BD100-04020Y',
            objectStatusName: 'BOX INSTALLED APPROVED',
            objectStatus: 'VF47',
            object3dReference: '',
            procosysStatus: '',
        },
        {
            objectNo: 'PCOM-200110-P11',
            objectName: 'AP700-2002-L005-20L00503B-2400PR-BD100',
            objectStatusName: 'BOX INSTALLED APPROVED',
            objectStatus: 'VF47',
            object3dReference: '=17026/38911',
            procosysStatus: 'OK',
        },
        {
            objectNo: 'VALV-200100-P25-99',
            objectName: 'AP700-2002-L005-20L00503A-1600PR-BD100-04020Y',
            objectStatusName: 'BOX INSTALLED APPROVED',
            objectStatus: 'VF47',
            object3dReference: '',
            procosysStatus: '',
        },
        {
            objectNo: 'VALV-200100-P25',
            objectName: 'AP700-2002-L005-20L00503A-1600PR-BD100-04020Y',
            objectStatusName: 'Sent Fabrication',
            objectStatus: 'VTOS004',
            object3dReference: '=17026/346227',
            procosysStatus: 'OK',
        },
        {
            objectNo: 'CTEM-200089-P12',
            objectName: 'AP700-2002-L005-20L00505A-1200PR-BD100-4020N',
            objectStatusName: 'BOX INSTALLED APPROVED',
            objectStatus: 'VF47',
            object3dReference: '=41602/6345',
            procosysStatus: '',
        },
        {
            objectNo: 'PCOM-200100-P19',
            objectName: 'AP700-2002-L005-20L00503A-1600PR-BD100-04020Y',
            objectStatusName: 'Sent Fabrication',
            objectStatus: 'VTOS004',
            object3dReference: '=17026/346225',
            procosysStatus: 'OK',
        },
        {
            objectNo: 'CTEM-200088-P09',
            objectName: 'AP700-2002-L005-20L00505A-1200PR-BD100-4020N',
            objectStatusName: 'Sent Fabrication',
            objectStatus: 'VTOS004',
            object3dReference: '=41602/6345',
            procosysStatus: 'OK',
        },
        {
            objectNo: 'CTEM-200088-P09-99',
            objectName: 'AP700-2002-L005-20L00505A-1200PR-BD100-4020N',
            objectStatusName: 'BOX INSTALLED APPROVED',
            objectStatus: 'VF47',
            object3dReference: '',
            procosysStatus: '',
        },
    ],
    circuits: [
        {
            switchBoardTagNo: '82EL056',
            circuitAndStarterTagNo: '82EL056-419',
            checkLists: [
                {
                    tagNo: '82EL056-419',
                    responsible: 'KSI',
                    formularType: 'ELE19.3',
                    formularGroup: 'MCCR',
                    status: 'OS',
                },
            ],
        },
        {
            switchBoardTagNo: '82EL064',
            circuitAndStarterTagNo: '82EL064-417',
            checkLists: [
                {
                    tagNo: '82EL064-417',
                    responsible: 'KSI',
                    formularType: 'ELE19.3',
                    formularGroup: 'MCCR',
                    status: 'OS',
                },
            ],
        },
        {
            switchBoardTagNo: '82EL065',
            circuitAndStarterTagNo: '82EL065-409',
            checkLists: [
                {
                    tagNo: '82EL065-409',
                    responsible: 'KSI',
                    formularType: 'ELE19.3',
                    formularGroup: 'MCCR',
                    status: 'OS',
                },
            ],
        },
    ],
    lines: [
        { tagNo: '20L00503A', isCritical: false },
        { tagNo: '20L00505A', isCritical: true },
    ],
    heatTraces: [
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201219A',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201517A',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201609A',
            responsible: 'KSF',
            formularType: 'ELE19.1V1',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201219A',
            responsible: 'KSI',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201517A',
            responsible: 'KSII',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OK',
        },
        {
            revision: '',
            isHeatTrace: true,
            c01Planned: '2023-07-21T00:00:00+00:00',
            c01Forecast: '',
            m03Planned: '2022-11-10T00:00:00+00:00',
            m03Forecast: '',
            m04Actual: '',
            tagNo: 'HT201609A',
            responsible: 'KSII',
            formularType: 'ELE19.2JCA',
            formularGroup: 'MCCR',
            status: 'OK',
        },
    ],
    step: PipetestStep.PressureTest,
    steps: [
        PipetestStep.PressureTest,
        PipetestStep.Bolttensioning,
        PipetestStep.Painting,
        PipetestStep.HtTest,
        PipetestStep.Insulation,
        PipetestStep.BoxInsulation,
        PipetestStep.HtRetest,
        PipetestStep.HtCTest,
        PipetestStep.Marking,
    ],
    pipetestProcessDoneInRightOrder: false,
    completionStatus: PipetestCompletionStatus.Outstanding,
    shortformCompletionStatus: CheckListStatus.Outstanding,
    dueDateTimePeriod: 'Other',
    overdue: 'No',
    htCableRfc: '',
    pipeInsulationBoxes: [
        {
            objectNo: '#Z-2002-L005',
            objectName: 'KSII / MCCR',
            objectStatus: 'rev: 1',
            procosysStatus: 'OK',
            object3dReference: '',
            objectStatusName: '',
        },
    ],
};
