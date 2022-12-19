import { CriteriaSignState, FamTag } from '@equinor/Workflow';

export type CreatedBy = {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type ModifiedBy = {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type SignedBy = {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type Person = {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type Contribution = {
    createdAtUtc: Date;
    createdBy: CreatedBy;
    modifiedAtUtc: Date;
    modifiedBy: ModifiedBy;
    id: string;
    comment: string;
    suggestion: string;
};

export type Contributor = {
    id: string;
    instructionsToContributor: string;
    person: Person;
    contribution: Contribution;
    createdAtUtc;
    createdBy;
    modifiedAtUtc;
    modifiedBy;
    plant;
};

export type DraggableReleaseControlStep = {
    id: string;
    item: CreateReleaseControlStepModel;
};

export type ReleaseControlStep = {
    id: string;
    name: string;
    order: number;
    responsible: string;
    isCurrent: boolean;
    isCompleted: boolean;
    criterias: Criteria[];
    contributors: Contributor[];
    allowContributors: boolean;
    criteriaTemplates: CriteriaTemplate[];
    workflowStepCriteriaTemplates?: CriteriaTemplate[];
};

export type CreateReleaseControlStepModel = {
    id?: string;
    name: string;
    order: number;
    allowContributors: boolean;
    completedStatusName?: string;
    rejectedStatusName?: string;
    isCompleted?: boolean;
    isCurrent?: boolean;
    tagNumbers?: string[];
    scopeTags?: FamTag[];
    scopeHTTags?: FamTag[];
    contributors?: Contributor[];
    criteriaTemplates: CriteriaTemplate[];
    criterias: Criteria[];
    workflowStepCriteriaTemplates?: CriteriaTemplate[];
};

export type Criteria = {
    id: string;
    type: string;
    value: string;
    valueDescription: string;
    signedAtUtc: string;
    signedBy: SignedBy;
    signedComment: string;
    signedState: CriteriaSignState | null;
};
export type CriteriaTemplate = {
    id?: string;
    type: 'RequireProcosysUserSignature' | 'RequireProcosysFunctionalRoleSignature';
    assignToCreator: boolean;
    //I.E functional role name or azure oid
    value?: string;
    valueDescription?: string;
};

export type ReleaseControlDocument = {
    id: string;
    stidDocumentNumber: string;
    stidDocumentRevisionNumber: string;
};

export type ReleaseControlPunch = {
    id: string;
    procosysId: number;
};
export type ReleaseControl = {
    createdAtUtc: Date;
    createdBy: CreatedBy;
    modifiedAtUtc: Date;
    modifiedBy: ModifiedBy;
    id: string;
    sequenceNumber: number;
    title: string;
    description: string;
    phase: string;
    plannedDueDate: string;
    state: string;
    workflowStatus: string;
    isVoided: boolean;
    hasComments: boolean;
    hasPendingContributions: boolean;
    allowContributors: boolean;
    currentWorkflowStep: ReleaseControlStep;
    workflowSteps: CreateReleaseControlStepModel[];
    editedWorkflowSteps: ReleaseControlStep[];
    documents: ReleaseControlDocument[];
    punchListItems: ReleaseControlPunch[];
    scopeChangeRequestReferences: ScopeChangeRequestReference[];
    scopeTags?: FamTag[];
    scopeHTTags?: FamTag[];
    attachments: Attachment[];
    hasDisconnectedEquipment: boolean;
    hasIsolatedEquipment: boolean;

    systems: string[];
    areas: string[];
    switchboards: string[];
    circuits: string[];
    commPkIds: string[];
    commPkNos: string[];
};

export type ReleaseControlWorkflow = {
    id: string;
    name: string;
};

export type ReleaseControlWorkflowTemplate = {
    id: string;
    isPublished: boolean;
    workflowStepTemplates: CreateReleaseControlStepModel[];
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

export type UserObject = {
    azureOid: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
};

export type ScopeChangeRequestReference = {
    scopeChangeReferenceId: string;
    scopeChangeReferenceSerialNumber: string;
    scopeChangeReferenceTitle: string;
};

export enum ReleaseControlStepNames {
    Coordinator = 'Coordinator',
    Engineering = 'Engineering',
    Material = 'Material',
    WorkPrep = 'Work prep',
    Scaffolding = 'Scaffolding',
    CircuitIsolation = 'Circuit isolation',
    DemountISO = 'Demount ISO',
    CheckHT = 'Check/demount HT',
    DemountMech = 'Demount Mech./Piping',
    ATest = 'Remount (or new) HT/A-test',
    RemountISO = 'Remount (or new) ISO',
    BTest = 'Recheck (or new) HT/B-test',
    CircuitPowerUp = 'Circuit power-up',
    CTest = 'Recheck (or new) HT/C-test',
}
