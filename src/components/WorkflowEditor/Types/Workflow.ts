export interface Step {
    id: string;
    name: string;
    order: number;
}

export interface Workflow {
    id: string;
    isPublished: boolean;
    created: string;
    createdBy: string;
    lastModified?: any;
    lastModifiedBy?: any;
    steps: Step[];
}
