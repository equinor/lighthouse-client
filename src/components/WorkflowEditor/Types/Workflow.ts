import { title } from 'process';

export interface Step {
    id: string;
    title: string;
    type: string;
    functionalRole: string;
    canAddContributors: boolean;
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
