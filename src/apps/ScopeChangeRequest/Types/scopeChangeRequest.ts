export interface ScopeChangeRequest {
    id: string;
    title: string;
    description: string;
    phase: string;
    origin: string;
    category: string;
    estimatedChangeHours: number;
    actualChangeHours: number;
    createdAtUtc: string;
    createdById: string;
    modifiedAtUtc: string;
    modifiedById: string;
    lastModified: string;
    lastModifiedBy: string;
    state: string;
    currentWorkflowStep: WorkflowStep;
    workflowSteps: WorkflowStep[];
    guesstimateHours: string;
    guesstimateDescription: string;
    //workflow
}

export interface WorkflowStep {
    id: string;
    name: string;
    order: number;
    isCompleted: boolean;
    isCurrent: boolean;
}
