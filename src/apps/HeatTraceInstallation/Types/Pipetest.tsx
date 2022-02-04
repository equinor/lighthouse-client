export interface Pipetest {
    name: string;
    description: string;
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
}

export interface Tag {
    register: string;
    children: string[];
}
