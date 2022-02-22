export interface Pipetest {
    name: string;
    description: string;
    dueDate: string;
    checklists: Checklist[];
    lineAndSpools: string[][];
    tagTree: Record<string, unknown>;
}

export interface Checklist {
    tagNo: string;
    responsible: string;
    formType: string;
    status: string;
    commPk: string;
    mcPk: string;
    mcStatus: string;
    workflowStepText: string | undefined;
}

export interface Tag {
    register: string;
    children: string[];
}
