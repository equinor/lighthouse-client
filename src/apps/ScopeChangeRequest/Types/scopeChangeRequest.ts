export interface ScopeChangeRequestFormModel {
    title: string;
    description: string;
    phase: string;
    origin: string;
    category: string;
    guesstimateHours: string;
    guesstimateDescription: string;
    TagNumbers: string[];
    CommissioningPackageNumbers: string[];
    SystemIds: string[];
    //workflow
}

export type ScopeChangeRequestState = 'Draft' | 'Open' | 'Closed';

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
    state: ScopeChangeRequestState;
    currentWorkflowStep?: WorkflowStep;
    workflowSteps: WorkflowStep[];
    guesstimateHours: string;
    guesstimateDescription: string;
    tags: Tag[];
    TagNumbers: string[];
    CommissioningPackageNumbers: string[];
    commissioningPackages: CommissioningPackage[];
    systems: System[];
    SystemIds: System[];
    attachments: Attachment[];
    //workflow
}

export interface Attachment {
    blobPath: string;
    createdAtUtc: string;
    createdBy: Person;
    fileName: string;
    id: string;
    modifiedAtUtc: string | null;
    modifiedBy: string | null;
}

export interface CommissioningPackage {
    id: string;
    procosysId: number;
    procosysNumber: string;
}

export interface Tag {
    id: string;
    procosysId: number;
    procosysNumber: string;
}

export interface System {
    id: string;
    procosysId: number;
    procosysNumber: string;
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
    contributors: Contributor[];
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

export interface Contributor {
    createdAtUtc: Date;
    createdBy: Person;
    modifiedAtUtc: Date;
    modifiedBy: Person;
    plant: string;
    id: string;
    messageToContributor: string;
    person: Person;
    contribution: Contribution;
}

export interface Contribution {
    createdAtUtc: Date;
    createdBy: Person;
    modifiedAtUtc: Date;
    modifiedBy: Person;
    plant: string;
    id: string;
    comment: string;
    suggestion: string;
}
