export interface ScopeChangeRequest {
    id: string;
    title: string;
    description: string;
    phase: string;
    origin: string;
    category: string;
    estimatedChangeHours: number;
    actualChangeHours: number;
    created: string;
    createdBy: string;
    lastModified: string;
    lastModifiedBy: string;
    state: string;
    currentWorkflowStep: WorkflowStep;
    workflowSteps: WorkflowStep[];
    //workflow
}

export interface WorkflowStep {
    id: string;
    name: string;
    order: number;
    isCompleted: boolean;
}
