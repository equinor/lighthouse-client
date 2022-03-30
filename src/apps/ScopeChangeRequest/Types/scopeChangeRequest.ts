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

export type OriginType = 'NCR' | 'Punch' | 'SWCR' | 'Query' | 'NotApplicable' | 'DCN';

export type ScopeChangeRequestState = 'Draft' | 'Open' | 'Closed';
export type WorkflowStatus = 'Completed' | 'Active' | 'Inactive' | 'Failed';

export interface ChangeCategory {
    id: string;
    name: string;
}

export interface ScopeChangeBaseModel {
    id: string;
    title: string;
    description: string;
    phase: string;
    changeCategoryId: string;
    changeCategory: ChangeCategory;
    estimatedChangeHours: number;
    originSourceId?: string;
    hasPendingContributions: boolean;
    originSource: OriginType;
    actualChangeHours: number;
    guesstimateHours: number;
    guesstimateDescription: string;
}

export interface LogEntry {
    createdAtUtc: string;
    createdBy: {
        id: string;
        oid: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    modifiedAtUtc: string;
    modifiedBy: {
        id: string;
        oid: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    id: string;
    title: string;
    objectGuid: string;
    eventType: string;
    objectType: string;
}

export interface ScopeChangeRequest extends ScopeChangeBaseModel {
    workflowStatus: string | null;
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
    disciplines: Discipline[];
    areas: Area[];
    hasComments: boolean;
    sequenceNumber: number;
}

export interface Discipline {
    id: string;
    procosysCode: string;
    procosysId: number;
}

export interface Area {
    id: string;
    procosysCode: string;
    procosysId: number;
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
    signedAtUtc: string | null;
    signedBy: Person;
    signedComment: string | null;
    signedState: 'Approved' | 'Rejected' | null;
    valueDescription: string | null;
}

export interface Contributor {
    createdAtUtc: Date | null;
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
