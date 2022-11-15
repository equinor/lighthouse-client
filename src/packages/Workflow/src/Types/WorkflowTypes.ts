export type Workflow = {
    id: string;
    name: string;
    changeCategory: ChangeCategory | null;
    owner?: string;
    isVoided?: boolean;
};

export type ChangeCategory = {
    id: string;
    name: string;
};

export type WorkflowTemplate = {
    id: string;
    isPublished: boolean;
    workflowStepTemplates: WorkflowStepTemplate[];
};

export type WorkflowStepTemplate = {
    id?: string;
    name: string;
    order: number;
    allowContributors: boolean;
    completedStatusName?: string;
    rejectedStatusName?: string;
    isCompleted?: boolean;
    isCurrent?: boolean;
    workflowStepCriteriaTemplates: CriteriaTemplate[];
    criteriaTemplates: CriteriaTemplate[];
    criterias: Criteria[];
};

export type CriteriaTemplate = {
    id?: string;
    type: 'RequireProcosysUserSignature' | 'RequireProcosysFunctionalRoleSignature';
    assignToCreator: boolean;
    //I.E functional role name or azure oid
    value?: string;
    valueDescription?: string;
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

export type SignedBy = {
    id: string;
    oid: string;
    firstName: string;
    lastName: string;
    email: string;
};

export type CriteriaSignState = 'Approved' | 'Rejected' | 'Disputed';

export type CriteriaStatus = CriteriaSignState | 'Inactive' | 'Active';

export type WorkflowStatus = {
    id?: string;
    name: string;
};

export type DraggableStep = {
    id: string;
    item: WorkflowStepTemplate;
};

export interface FunctionalRole {
    Code: string;
    Description: string;
    Email: string | null;
    InformationEmail: string | null;
    UsePersonalEmail: boolean | null;
    Classification: string;
    Persons: Person[];
}

export interface Person {
    AzureOid: string;
    FirstName: string;
    LastName: string;
    UserName: string;
    Email: string;
}

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

export type Contribution = {
    createdAtUtc: Date;
    createdBy: Person;
    modifiedAtUtc: Date;
    modifiedBy: Person;
    id: string;
    comment: string;
    suggestion: string;
};

export type WorkflowTemplateModel = Partial<WorkflowTemplate>;

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

export enum ReleaseControlStatuses {
    Initiated = 'Initiated',
    Engineering = 'Engineered',
    Material = 'Material completed',
    WorkPrep = 'Work prep completed',
    Scaffolding = 'Scaffolded',
    CircuitIsolation = 'Circuit isolation completed',
    DemountISO = 'Demount ISO completed',
    CheckHT = 'Check/demount HT completed',
    DemountMech = 'Demount Mech./Piping completed',
    ATest = 'Remount (or new) HT/A-test completed',
    RemountISO = 'Remount (or new) ISO completed',
    BTest = 'Recheck (or new) HT/B-test completed',
    CircuitPowerUp = 'Circuit power-up completed',
    CTest = 'Recheck (or new) HT/C-test completed',
}
