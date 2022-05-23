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
    item: ReleaseControlStep;
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
}

export interface Tag {
    id: string;
    procosysId: number;
    procosysNumber: string;
}

export interface Area {
    id: string;
    procosysId: number;
    procosysCode: string;
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
    workflowSteps: ReleaseControlStep[];
    tags: Tag[];
    areas: Area[];
}
