import { Pipetest } from './pipetest';

export interface DisciplineReleaseControlFormModel extends DisciplineReleaseControlBaseModel {
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
export type WorkflowStatus = 'Complete' | 'Active' | 'Inactive' | 'Failed';

export interface Origin {
    type: OriginType;
    id?: string;
}

export type DisciplineReleaseControlState = 'Draft' | 'Open' | 'Closed';

export interface DisciplineReleaseControlBaseModel {
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

export interface DisciplineReleaseControl extends DisciplineReleaseControlBaseModel {
    createdAtUtc: string;
    createdBy: Person;
    modifiedAtUtc: string;
    modifiedBy: Person;
    state: DisciplineReleaseControlState;
    isVoided: boolean;
    currentWorkflowStep?: WorkflowStep;
    workflowSteps: WorkflowStep[];
    tags: Tag[];
    commissioningPackages: CommissioningPackage[];
    systems: System[];
    attachments: Attachment[];
    documents: Document[];
    hasComments: boolean;
    sequenceNumber: number;
    disciplines: Discipline[];
    areas: Area[];
    pipetest: Pipetest;
    //workflow
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
    createdAtUtc: Date;
    createdBy: Person;
    modifiedAtUtc: Date;
    modifiedBy: Person;
    plant: string;
    id: string;
    instructionsToContributor: string;
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
    description: string;
    objectGuid: string;
    eventType: string;
    objectType: string;
}
