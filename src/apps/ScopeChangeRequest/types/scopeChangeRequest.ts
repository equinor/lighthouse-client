import { TypedSelectOption } from '../api/Search/searchType';

export interface ScopeChangeCreateEditModel {
    id?: string;
    title: string;
    description: string;
    setAsOpen?: boolean;
    scopeId: string;
    scope: Scope | null;
    disciplineGuesstimates: DisciplineGuesstimate[];
    phase: string;
    changeCategoryId: string;
    changeCategory: ChangeCategory;
    potentialWarrantyCase: boolean;
    originSourceId?: string;
    originSource: OriginType;

    newAttachments?: File[];
    references?: TypedSelectOption[];
    tagNumbers: string[];
    commissioningPackageNumbers: string[];
    systemIds: number[];
    areaCodes: string[];
    documentNumbers: string[];
    materialsIdentifiedInStorage: boolean;
    materialsToBeBoughtByContractor: boolean;
    materialsNote?: string;
}

export interface DisciplineGuesstimate {
    disciplineCode: string;
    guesstimateHours: number | null;
}

export type OriginType = 'NCR' | 'Punch' | 'SWCR' | 'Query' | 'NotApplicable' | 'DCR';

export type ScopeChangeRequestState = 'Draft' | 'Open' | 'Closed';
export type WorkflowStatus = 'Completed' | 'Active' | 'Inactive' | 'Failed';

export interface ChangeCategory {
    id: string;
    name: string;
}

export interface Scope {
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
    potentialWarrantyCase: boolean;
    materialsIdentifiedInStorage: boolean;
    materialsToBeBoughtByContractor: boolean;
    materialsNote?: string;
}

export interface ScopeChangeDisciplineGuesstimates {
    id: string;
    guesstimate: number;
    discipline: ScopeChangeDiscipline;
}
export interface ScopeChangeDiscipline {
    id: string;
    procosysCode: string;
    procosysId: number;
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
    details: string;
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
    workflowSteps: WorkflowStep[] | null;
    tags: ScopeChangeTag[];
    commissioningPackages: ScopeChangeCommissioningPackage[];
    systems: ScopeChangeSystem[];
    attachments: Attachment[];
    documents: ScopeChangeDocument[];
    disciplines: ScopeChangeDiscipline[];
    areas: ScopeChangeArea[];
    hasComments: boolean;
    sequenceNumber: number;
    workOrders: ScopeChangeWorkOrder[];
    scope: Scope;
    disciplineGuesstimates: ScopeChangeDisciplineGuesstimates[];
}

export interface ScopeChangeWorkOrder {
    id: string;
    jobNumber: string;
}

export interface ScopeChangeArea {
    id: string;
    procosysCode: string;
    procosysId: number;
}

export interface ScopeChangeDocument {
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

export interface ScopeChangeCommissioningPackage {
    id: string;
    procosysId: number;
    procosysNumber: string;
}

export interface ScopeChangeTag {
    id: string;
    procosysId: number;
    procosysNumber: string;
}

export interface ScopeChangeSystem {
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
    signedState: CriteriaSignState | null;
    valueDescription: string | null;
}

export interface Contributor {
    createdAtUtc: Date | null;
    createdBy: Person;
    modifiedAtUtc: Date;
    modifiedBy: Person;
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
    id: string;
    comment: string;
    suggestion: string;
}

export type CriteriaSignState = 'Approved' | 'Rejected' | 'Disputed';
