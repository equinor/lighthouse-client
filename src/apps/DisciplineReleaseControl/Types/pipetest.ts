import { PipetestCompletionStatus, PipetestStep } from './drcEnums';

export interface Pipetest {
    name: string;
    step: PipetestStep;
    completionStatus: PipetestCompletionStatus;
    checkLists: CheckList[];
    heatTraces: HeatTrace[];
    description: string;
    commPkPriority1: string;
    rfccPlanned: string;
    overdue: string;
    // description: string;
    // dueDate: string;
    // lineAndSpools: string[][];
    tagTree: Record<string, unknown>;
    dueDateTimePeriod: string;
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
}

export interface HeatTrace extends CheckList { }

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
