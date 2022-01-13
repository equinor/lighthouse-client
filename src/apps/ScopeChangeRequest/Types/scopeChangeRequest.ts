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
    createdBy: Person;
    modifiedAtUtc: string;
    modifiedBy: Person;
    state: string;
    currentWorkflowStep: WorkflowStep;
    workflowSteps: WorkflowStep[];
    guesstimateHours: string;
    guesstimateDescription: string;
    //workflow
}

export interface Person {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
}

export interface WorkflowStep {
    id: string;
    name: string;
    order: number;
    isCompleted: boolean;
    isCurrent: boolean;
    criterias: Criteria[];
}

export interface Criteria {
    id: string;
    type: string;
    value: string;
    signedAtUtc: string;
    signedBy: Person;
    signedComment: string;
    signedState: 'Approved' | 'Rejected';
}
