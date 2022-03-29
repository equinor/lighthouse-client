import { PipetestCompletionStatus, PipetestStep } from './drcEnums';

export interface Pipetest {
    name: string;
    step: PipetestStep;
    completionStatus: PipetestCompletionStatus;
    checkLists: CheckList[];
    heatTraces: HeatTrace[];
    insulationBoxes: InsulationBox[];
    description: string;
    commPkPriority1: string;
    rfccPlanned: string;
    overdue: string;
    dueDateTimePeriod: string;
    tagTree: Record<string, unknown>;
    // lineAndSpools: string[][];
}

export interface CheckList {
    tagNo: string;
    responsible: string;
    formularType: string;
    formularGroup: string;
    status: string;
    revision: string;
    test: string;
    isHeatTrace: boolean;
    workflowStepText: string | undefined;
    stepName: string;
}

export interface InsulationBox {
    objectNo: string;
    objectName: string;
    objectStatusName: string;
    objectStatus: string;
    object3dReference: string;
    procosysStatus: string;
}

export interface HeatTrace extends CheckList {}

export type CheckListType = {
    tagNo: string;
    responsible: string;
    formularType: string;
    formularGroup: string;
    status: string;
    revision: string;
    test: string;
    isHeatTrace: boolean;
    workflowStepText: string | undefined;
};

export interface Tag {
    register: string;
    children: string[];
}
