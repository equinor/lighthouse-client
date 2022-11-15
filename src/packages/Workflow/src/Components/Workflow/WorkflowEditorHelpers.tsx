import { Icon } from '@equinor/eds-core-react';
import {
    WorkflowStepTemplate,
    ReleaseControlStepNames,
    Criteria,
    CriteriaStatus,
} from '@equinor/Workflow';

import { InsertAfter } from './InsertAfter';
import { InsertBefore } from './InsertBefore';

export interface MenuItem {
    label: string;
    onClick?: () => void;
    icon?: JSX.Element;
    isDisabled?: boolean;
}

export function getNewWorkflowSteps(): WorkflowStepTemplate[] {
    const baseReleaseControlSteps: WorkflowStepTemplate[] = [
        {
            order: 1,
            name: 'Initiate',
            allowContributors: true,
            completedStatusName: 'Initiated',
            workflowStepCriteriaTemplates: [
                {
                    type: 'RequireProcosysUserSignature',
                    assignToCreator: true,
                    value: '',
                },
            ],
            criterias: [],
            criteriaTemplates: [],
        },
    ];
    return baseReleaseControlSteps;
}

export function updateStepName(
    step: WorkflowStepTemplate,
    steps: WorkflowStepTemplate[],
    stepName: string
): WorkflowStepTemplate[] {
    const index = steps.findIndex((x) => x.order === step.order);
    steps[index].name = stepName;
    steps[index] = getStatusNamesForStep(steps[index]);
    return [...steps];
}

export function getStatusNamesForStep(step: WorkflowStepTemplate): WorkflowStepTemplate {
    switch (step.name) {
        case ReleaseControlStepNames.Coordinator:
            step.completedStatusName = 'Coordinated';
            break;
        case ReleaseControlStepNames.Engineering:
            step.completedStatusName = 'Engineering completed';
            break;
        case ReleaseControlStepNames.Material:
            step.completedStatusName = 'Material completed';
            break;
        case ReleaseControlStepNames.WorkPrep:
            step.completedStatusName = 'Work prep completed';
            break;
        case ReleaseControlStepNames.Scaffolding:
            step.completedStatusName = 'Scaffolding completed';
            break;
        case ReleaseControlStepNames.CircuitIsolation:
            step.completedStatusName = 'Circuit isolation completed';
            break;
        case ReleaseControlStepNames.DemountISO:
            step.completedStatusName = 'Isolation demounted';
            break;
        case ReleaseControlStepNames.CheckHT:
            step.completedStatusName = 'Check/demount HT completed';
            break;
        case ReleaseControlStepNames.DemountMech:
            step.completedStatusName = 'Demount Mech./Piping completed';
            break;
        case ReleaseControlStepNames.ATest:
            step.completedStatusName = 'A-test completed';
            break;
        case ReleaseControlStepNames.RemountISO:
            step.completedStatusName = 'Isolation completed';
            break;
        case ReleaseControlStepNames.BTest:
            step.completedStatusName = 'B-test completed';
            break;
        case ReleaseControlStepNames.CircuitPowerUp:
            step.completedStatusName = 'Circuit power-up completed';
            break;
        case ReleaseControlStepNames.CTest:
            step.completedStatusName = 'C-test completed';
            break;
        default:
            step.completedStatusName = 'Completed';
    }
    return step;
}

export function updateStepResponsible(
    step: WorkflowStepTemplate,
    steps: WorkflowStepTemplate[],
    responsible: string,
    responsibleDescription: string,
    responsibleType: string
): WorkflowStepTemplate[] {
    const index = steps.findIndex((x) => x.order === step.order);
    steps[index].workflowStepCriteriaTemplates[0].value = responsible;
    steps[index].workflowStepCriteriaTemplates[0].valueDescription = responsibleDescription;
    steps[index].workflowStepCriteriaTemplates[0].assignToCreator = false;

    steps[index].workflowStepCriteriaTemplates[0].type =
        responsibleType === 'functionalRole'
            ? 'RequireProcosysFunctionalRoleSignature'
            : 'RequireProcosysUserSignature';

    return [...steps];
}

export function addStepAfter(
    currentStep: WorkflowStepTemplate,
    steps: WorkflowStepTemplate[]
): WorkflowStepTemplate[] {
    const newStep: WorkflowStepTemplate = {
        id: Math.random().toString(), //Needs temporary unique id for drag/drop sorting
        order: currentStep.order + 1,
        name: '',
        allowContributors: true,
        workflowStepCriteriaTemplates: [
            {
                assignToCreator: true,
                type: 'RequireProcosysUserSignature',
                value: '',
            },
        ],
        criterias: [],
        criteriaTemplates: [],
    };
    steps.forEach((x) => {
        if (x.order >= currentStep.order + 1) {
            x.order++;
        }
    });
    steps.splice(currentStep.order, 0, newStep);
    return [...steps];
}

export function addStepBefore(
    currentStep: WorkflowStepTemplate,
    steps: WorkflowStepTemplate[]
): WorkflowStepTemplate[] {
    const newStep: WorkflowStepTemplate = {
        id: Math.random().toString(), //Needs temporary unique id for drag/drop sorting
        order: currentStep.order,
        name: '',
        allowContributors: true,
        workflowStepCriteriaTemplates: [
            {
                assignToCreator: true,
                type: 'RequireProcosysUserSignature',
                value: '',
            },
        ],
        criterias: [],
        criteriaTemplates: [],
    };
    steps.forEach((x) => {
        if (x.order >= currentStep.order) {
            x.order++;
        }
    });
    steps.splice(currentStep.order - 2, 0, newStep);
    return [...steps];
}

export function duplicateStep(
    currentStep: WorkflowStepTemplate,
    steps: WorkflowStepTemplate[]
): WorkflowStepTemplate[] {
    const newStep: WorkflowStepTemplate = {
        ...currentStep,
        order: currentStep.order + 1,
    };
    steps.forEach((x) => {
        if (x.order >= newStep.order) {
            x.order++;
        }
    });
    steps.splice(currentStep.order, 0, newStep);
    return [...steps];
}

export function removeStep(
    step: WorkflowStepTemplate,
    steps: WorkflowStepTemplate[]
): WorkflowStepTemplate[] {
    steps = steps.filter((x) => x.order !== step.order);
    steps.forEach((x) => {
        if (x.order > step.order) {
            x.order--;
        }
    });
    return steps;
}

export function addStep(steps: WorkflowStepTemplate[], atomApi: any): void {
    const { updateAtom } = atomApi;

    updateAtom({
        workflowStepTemplates: addStepAfter(
            {
                id: Math.random().toString(), //Needs temporary unique id for drag/drop sorting
                order: steps.length,
                name: '',
                allowContributors: true,
                workflowStepCriteriaTemplates: [],
                criterias: [],
                criteriaTemplates: [],
            },
            steps
        ),
    });
}

export function getWorkflowStepMenuActions(
    step: WorkflowStepTemplate,
    steps: WorkflowStepTemplate[],
    atomApi: any,
    initiateStep?: boolean
): MenuItem[] {
    const { updateAtom } = atomApi;
    const actions: MenuItem[] = [];
    {
        !initiateStep &&
            actions.push({
                label: 'Add step before',
                icon: <InsertBefore />,
                onClick: () =>
                    updateAtom({
                        workflowStepTemplates: addStepBefore(step, steps),
                    }),
            });
    }

    actions.push({
        label: 'Add step after',
        icon: <InsertAfter />,
        onClick: () =>
            updateAtom({
                workflowStepTemplates: addStepAfter(step, steps),
            }),
    });

    {
        !initiateStep &&
            actions.push({
                label: 'Duplicate step',
                icon: <Icon name="copy" color="grey" />,
                onClick: () =>
                    updateAtom({
                        workflowStepTemplates: duplicateStep(step, steps),
                    }),
            });
    }
    {
        !initiateStep &&
            actions.push({
                label: 'Remove',
                icon: <Icon name="delete_forever" color="grey" />,
                onClick: () =>
                    updateAtom({
                        workflowStepTemplates: removeStep(step, steps),
                    }),
            });
    }

    return actions;
}

export function getCriteriaStatus(criteria: Criteria, isCurrentStep: boolean): CriteriaStatus {
    if (!criteria.signedState) {
        return isCurrentStep ? 'Active' : 'Inactive';
    }
    return criteria.signedState;
}
