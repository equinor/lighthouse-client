import { CheckListStatus, PipetestCompletionStatus, PipetestStep } from './drcEnums';

export type Pipetest = {
    name: string;
    step: PipetestStep;
    steps: PipetestStep[];
    completionStatus: PipetestCompletionStatus;
    pipetestProcessDoneInRightOrder: boolean;
    shortformCompletionStatus: CheckListStatus;
    checkLists: CheckList[];
    heatTraces: HeatTrace[];
    insulationBoxes: InsulationBox[];
    pipeInsulationBoxes: InsulationBox[];
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

export type InsulationBox = {
    objectNo: string;
    objectName: string;
    objectStatusName: string;
    objectStatus: string;
    object3dReference: string;
    procosysStatus: string;
};

export type Circuit = {
    switchBoardTagNo: string;
    circuitAndStarterTagNo: string;
    checkLists: CheckList[];
};

export type HeatTrace = CheckList;

export type CheckListType = {
    tagNo: string;
    responsible: string;
    formularType: string;
    formularGroup: string;
    status: string;
    revision?: string;
    test?: string;
    isHeatTrace?: boolean;
    workflowStepText?: string | undefined;
};

export type InsulationBoxType = {
    objectNo: string;
    objectName: string;
    objectStatusName: string;
    objectStatus: string;
    object3dReference: string;
    procosysStatus: string;
};

export type Line = {
    tagNo: string;
    isCritical: boolean;
};

export type HTSidesheet = {
    value: string;
    items: Pipetest[];
};
