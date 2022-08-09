import { CriteriaSignState } from '../../ScopeChangeRequest/types/scopeChangeRequest';
export interface CreatedBy {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface ModifiedBy {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface SignedBy {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Person {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
}

export interface Contribution {
    createdAtUtc: Date;
    createdBy: CreatedBy;
    modifiedAtUtc: Date;
    modifiedBy: ModifiedBy;
    id: string;
    comment: string;
    suggestion: string;
}

export interface Contributor {
    id: string;
    instructionsToContributor: string;
    person: Person;
    contribution: Contribution;
    createdAtUtc;
    createdBy;
    modifiedAtUtc;
    modifiedBy;
    plant;
}

export interface DraggableReleaseControlStep {
    id: string;
    item: CreateReleaseControlStepModel;
}

export interface ReleaseControlStep {
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
}

export interface CreateReleaseControlStepModel {
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
}

export interface Criteria {
    id: string;
    type: string;
    value: string;
    valueDescription: string;
    signedAtUtc: string;
    signedBy: SignedBy;
    signedComment: string;
    signedState: CriteriaSignState | null;
}
export interface CriteriaTemplate {
    type: 'RequireProcosysUserSignature' | 'RequireProcosysFunctionalRoleSignature';
    assignToCreator: boolean;
    //I.E functional role name or azure oid
    value?: string;
}

export interface ReleaseControlDocument {
    id: string;
    stidDocumentNumber: string;
    stidDocumentRevisionNumber: string;
}

export interface ReleaseControlPunch {
    id: string;
    procosysId: number;
}
export interface ReleaseControl {
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
    scopeTags?: FamTag[];
    scopeHTTags?: FamTag[];
}

export interface ReleaseControlWorkflow {
    id: string;
    name: string;
}

export interface ReleaseControlWorkflowTemplate {
    id: string;
    isPublished: boolean;
    workflowStepTemplates: CreateReleaseControlStepModel[];
}

export interface FamTag {
    facility: string;
    project: string;
    tagNo: string;
    tagId: string;
    description: string;
    register: string | null;
    tagType: string | null;
    function: string | null;
    mechanicalCompletionPackageNo: string;
    mechanicalCompletionPackageId: string;
    commissioningPackageNo: string;
    commissioningPackageId: string;
    packageNo: string | null;
    callOffNo: string | null;
    status: string | null;
    discipline: string | null;
    functionalSystem: string | null;
    system: string | null;
    location: string | null;
    area: string | null;
    isVoided: string | null;
    createdDate: string | null;
    updatedDate: string | null;
    mountedOn: string | null;
    relatedHTCables: string | null;
    openWorkOrders: string | null;
    installedCableLength: string | null;
    tagHeated: string | null;
    checklistIds: string | null;
}

export type FamTagType = {
    facility: string;
    project: string;
    tagNo: string;
    tagId: string;
    description: string;
    register: string | null;
    tagType: string | null;
    function: string | null;
    mechanicalCompletionPackageNo: string;
    mechanicalCompletionPackageId: string;
    commissioningPackageNo: string;
    commissioningPackageId: string;
    packageNo: string | null;
    callOffNo: string | null;
    status: string | null;
    discipline: string | null;
    functionalSystem: string | null;
    system: string | null;
    location: string | null;
    area: string | null;
    isVoided: string | null;
    createdDate: string | null;
    updatedDate: string | null;
    mountedOn: string | null;
    relatedHTCables: string | null;
    openWorkOrders: string | null;
    installedCableLength: string | null;
    tagHeated: string | null;
    checklistIds: string | null;
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
