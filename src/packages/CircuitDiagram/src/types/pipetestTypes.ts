import { tokens } from '@equinor/eds-tokens';

export type Pipetest = {
    name: string;
    checkLists: CheckList[];
    heatTraces: HeatTrace[];
    circuits: Circuit[];
    description: string;
    commPkPriority1: string;
    rfccPlanned: string;
    htCableRfc: string;
    overdue: string;
    dueDateTimePeriod: string;
    location: string;
    lines: Line[];
    mcPkgId: string;
};

export type CheckList = {
    tagNo: string;
    responsible: string;
    formularType: string;
    formularGroup: string;
    status: string;
    revision?: string;
    test?: string;
    isHeatTrace?: boolean;
    workflowStepText?: string | undefined;
    stepName?: string;
    c01Planned?: string;
    c01Forecast?: string;
    m03Planned?: string;
    m03Forecast?: string;
    m04Actual?: string;
    underline?: string;
};

export type Line = {
    tagNo: string;
    isCritical: boolean;
};

export type Circuit = {
    switchBoardTagNo: string;
    circuitAndStarterTagNo: string;
    checkLists: CheckList[];
};

export type Line = {
    tagNo: string;
    isCritical: boolean;
};

export type HeatTrace = CheckList;

export type HTSidesheet = {
    value: string;
    items: Pipetest[];
};

export enum CheckListStatus {
    OK = 'OK',
    Outstanding = 'OS',
    PunchAError = 'PA',
    PunchBError = 'PB',
    Inactive = 'IN',
}

export enum CheckListStepTag {
    Unknown = '#U',
    Bolttensioning = '#B',
    PressureTest = '#T',
    ChemicalCleaning = '#C',
    HotOilFlushing = '#H',
    Painting = '#X',
    HtTest = 'ELE19.1',
    Insulation = '#Z',
    BoxInsulation = '#I',
    HtRetest = 'ELE19.2',
    HtCTest = 'ELE19.3',
    HtTemporary = 'ELE99',
    Marking = '#M',
    Complete = 'C',
}

export const PipetestCompletionStatusColors: Record<string, string> = {
    OS: tokens.colors.ui.background__medium.hex,
    PB: '#FBCA36',
    PA: tokens.colors.interactive.danger__resting.hex,
    OK: tokens.colors.interactive.success__resting.hex,
    INACTIVE: tokens.colors.text.static_icons__primary_white.hex,
};
