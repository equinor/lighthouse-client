import { PipetestStatus } from './drcEnums';

export interface Pipetest {
    name: string;
    status: PipetestStatus;
    checkLists: CheckList[];
    // description: string;
    // dueDate: string;
    // lineAndSpools: string[][];
    tagTree: Record<string, unknown>;
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
