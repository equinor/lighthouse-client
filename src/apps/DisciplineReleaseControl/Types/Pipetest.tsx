export interface Pipetest {
    name: string;
    status: PipetestStatus;
    // description: string;
    // dueDate: string;
    checkLists: Checklist[];
    // lineAndSpools: string[][];
    // tagTree: Record<string, unknown>;
}

export interface Checklist {
    tagNo: string;
    responsible: string;
    formularType: string;
    formularGroup: string;
    status: string;
    revision: string;
    test: string;
    isHeatTrace: boolean;

    // mcStatus: string;
    // workflowStepText: string | undefined;
}

export interface Tag {
    register: string;
    children: string[];
}

export enum PipetestTestStatus {
    ATest = 'ELE19.1',
    BTest = 'ELE19.2',
}
export enum PipetestStatus {
    Unknown = 'Unknown',
    ReadyForBolttensioning = 'Ready for bolt tensioning',
    ReadyForPainting = 'Ready for painting',
    ReadyForHtTest = 'Ready for A-test',
    ReadyForInsulation = 'Ready for insulation',
    ReadyForHtRetest = 'Ready for B-test',
    ReadyForMarking = 'Ready for marking',
    Complete = 'Complete',
}

export enum PipetestChecklistOrder {
    Unknown = 1,
    Bolttensioning = 2,
    Painting = 3,
    HtTest = 4,
    Insulation = 5,
    HtRetest = 6,
    Marking = 7,
    Complete = 8,
}

export enum PipetestStatusOrder {
    Unknown = 1,
    ReadyForBolttensioning = 2,
    ReadyForPainting = 3,
    ReadyForHtTest = 4,
    ReadyForInsulation = 5,
    ReadyForHtRetest = 6,
    ReadyForMarking = 7,
    Complete = 8,
}
