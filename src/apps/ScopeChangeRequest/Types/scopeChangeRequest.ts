export interface ScopeChangeRequestFormModel extends ScopeChangeBaseModel {
    tagNumbers: string[];
    commissioningPackageNumbers: string[];
    systemIds: number[];
    areaCodes: string[];
    disciplineCodes: string[];
    documentNumbers: string[];
    setAsOpen?: boolean;
    //workflow
}
export type StrippedCriteria = Pick<Criteria, 'id' | 'value' | 'signedState'>;

export type OriginType = 'NCR' | 'Punch' | 'SWCR' | 'Query' | 'NotApplicable' | 'DCN';

export interface Origin {
    type: OriginType;
    id?: string;
}

export type ScopeChangeRequestState = 'Draft' | 'Open' | 'Closed';
export type WorkflowStatus = 'Completed' | 'Active' | 'Inactive' | 'Failed';

export interface ScopeChangeBaseModel {
    id: string;
    title: string;
    description: string;
    phase: string;
    category: string;
    estimatedChangeHours: number;
    originSourceId?: string;
    originSource: OriginType;
    actualChangeHours: number;
    guesstimateHours: string;
    guesstimateDescription: string;
}

export interface ScopeChangeRequest extends ScopeChangeBaseModel {
    createdAtUtc: string;
    createdBy: Person;
    modifiedAtUtc: string;
    modifiedBy: Person;
    state: ScopeChangeRequestState;
    isVoided: boolean;
    currentWorkflowStep?: WorkflowStep;
    workflowSteps: WorkflowStep[];
    tags: Tag[];
    commissioningPackages: CommissioningPackage[];
    systems: System[];
    attachments: Attachment[];
    documents: Document[];
    //workflow
}

export interface Document {
    id: string;
    stidDocumentNumber: string;
    stidDocumentRevisionNumber: string;
}

export interface Attachment {
    blobPath: string;
    createdAtUtc: string;
    createdBy: Person;
    fileName: string;
    id: string;
    modifiedAtUtc: string | null;
    modifiedBy: string | null;
    fileSize: number;
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
    procosysCode: string;
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
    signedState: 'Approved' | 'Rejected' | null;
}

export interface Contributor {
    createdAtUtc: Date;
    createdBy: Person;
    modifiedAtUtc: Date;
    modifiedBy: Person;
    plant: string;
    id: string;
    instructionsToContributor: string;
    person: Person;
    contribution: Contribution | null;
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
