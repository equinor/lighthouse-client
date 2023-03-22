import { CheckListStatus, PipetestCompletionStatus, PipetestStep } from './drcEnums';

export type Pipetest = {
    name: string;
    step: PipetestStep;
    htStep: PipetestStep;
    circuitStep: PipetestStep;
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
    hasCriticalLine: boolean;
    mcPkgId: string;
    mcPkgUrlId: string;
    hasDisconnectedEquipment: boolean;
    hasIsolatedEquipment: boolean;
    htCableExposed: string | null;
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
    signedDate?: string;
    worstPipetestStep?: PipetestStep;
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
    worstPipetestStep?: PipetestStep;
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

export type HeatTraceGrouped = {
    htTagNo: string;
    pipetests: Pipetest[];
    count: number;
};

export type CircuitGrouped = {
    circuitTagNo: string;
    pipetests: Pipetest[];
    count: number;
};
