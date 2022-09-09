import { TypedSelectOption } from './search/searchType';

export type ScopeChangeCreateEditModel = {
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

    potentialAtsScope: boolean;
    //Revision id
    originatorId?: string | null;
    /**Attachments id to duplicate */
    attachmentsToDuplicate: string[] | null;
    revisionAttachments: Attachment[] | null;
    //internal placeholder not sent to backend
    newAttachments?: File[];
    //internal placeholder not sent to backend
    references?: TypedSelectOption[];
    tagNumbers: string[];
    commissioningPackageNumbers: string[];
    systemIds: number[];
    areaCodes: string[];
    punchListItemIds: number[];
    documentNumbers: string[];
    materialsIdentifiedInStorage: boolean;
    materialsToBeBoughtByContractor: boolean;
    materialsNote?: string;
};

export type DisciplineGuesstimate = {
    disciplineCode: string;
    guesstimateHours: number | null;
};

export type OriginType =
    | 'NCR'
    | 'Punch'
    | 'SWCR'
    | 'Query'
    | 'Not Applicable'
    | 'NotApplicable'
    | 'DCR';

export type ScopeChangeRequestState = 'Draft' | 'Open' | 'Closed';
export type WorkflowStatus = 'Completed' | 'Active' | 'Inactive' | 'Failed';

export type ChangeCategory = {
    id: string;
    name: string;
};

export type Scope = {
    id: string;
    name: string;
};

export type ScopeChangeBaseModel = {
    id: string;
    title: string;
    description: string;
    phase: string;
    changeCategoryId: string;
    changeCategory: ChangeCategory;
    estimatedChangeHours: number;
    originSourceId?: string;
    potentialAtsScope: boolean;
    hasPendingContributions: boolean;
    originSource: OriginType;
    actualChangeHours: number;
    potentialWarrantyCase: boolean;
    materialsIdentifiedInStorage: boolean;
    materialsToBeBoughtByContractor: boolean;
    materialsNote?: string;
};

export type ScopeChangeDisciplineGuesstimates = {
    id: string;
    guesstimate: number;
    discipline: ScopeChangeDiscipline;
};
export type ScopeChangeDiscipline = {
    id: string;
    procosysCode: string;
    procosysId: number;
};

export type LogEntry = {
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
};

export type ScopeChangeRequest = ScopeChangeBaseModel & {
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
    punchListItems: ScopeChangePunch[];
    areas: ScopeChangeArea[];
    hasComments: boolean;
    sequenceNumber: number;
    workOrders: ScopeChangeWorkOrder[];
    scope: Scope;
    originatorId: string;
    disciplineGuesstimates: ScopeChangeDisciplineGuesstimates[];
    revisionNumber: number;
    serialNumber: string;
};

export type ScopeChangeWorkOrder = {
    id: string;
    jobNumber: string;
};

export type ScopeChangeArea = {
    id: string;
    procosysCode: string;
    procosysId: number;
};

export type ScopeChangeDocument = {
    id: string;
    stidDocumentNumber: string;
    stidDocumentRevisionNumber: string;
};

export type ScopeChangePunch = {
    id: string;
    procosysId: number;
};

export type Attachment = {
    blobPath: string;
    createdAtUtc: string;
    createdBy: Person;
    fileName: string;
    id: string;
    modifiedAtUtc: string | null;
    modifiedBy: string | null;
    fileSize: number;
};

export type ScopeChangeCommissioningPackage = {
    id: string;
    procosysId: number;
    procosysNumber: string;
};

export type ScopeChangeTag = {
    id: string;
    procosysId: number;
    procosysNumber: string;
};

export type ScopeChangeSystem = {
    id: string;
    procosysId: number;
    procosysCode: string;
};

export type Person = {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
};

export type WorkflowStep = {
    id: string;
    name: string;
    order: number;
    isCompleted: boolean;
    isCurrent: boolean;
    criterias: Criteria[];
    contributors: Contributor[];
};

export type Criteria = {
    id: string;
    type: string;
    value: string;
    signedAtUtc: string | null;
    signedBy: Person;
    signedComment: string | null;
    signedState: CriteriaSignState | null;
    valueDescription: string | null;
};

export type Contributor = {
    createdAtUtc: Date | null;
    createdBy: Person;
    modifiedAtUtc: Date;
    modifiedBy: Person;
    id: string;
    instructionsToContributor: string;
    person: Person;
    contribution: Contribution | null;
};

export type Contribution = {
    createdAtUtc: Date;
    createdBy: Person;
    modifiedAtUtc: Date;
    modifiedBy: Person;
    id: string;
    comment: string;
    suggestion: string;
};

export type CriteriaSignState = 'Approved' | 'Rejected' | 'Disputed';
export type CriteriaStatus = CriteriaSignState | 'Inactive' | 'Active';
