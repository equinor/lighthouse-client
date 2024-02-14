import { Icon } from '@equinor/eds-core-react-old';
import { WorkflowStepTemplate, Criteria, CriteriaStatus } from '@equinor/Workflow';

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
            id: '',
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
            criteriaTemplates: [
                {
                    type: 'RequireProcosysUserSignature',
                    assignToCreator: true,
                    value: '',
                },
            ],
        },
    ];
    return baseReleaseControlSteps;
}

export function updateStep(
    step: WorkflowStepTemplate,
    steps: WorkflowStepTemplate[],
    newStep: WorkflowStepTemplate
): WorkflowStepTemplate[] {
    const index = steps.findIndex((x) => x.order === step.order);
    newStep.workflowStepCriteriaTemplates = [
        { id: '', type: 'RequireProcosysUserSignature', assignToCreator: true },
    ];
    steps[index] = newStep;
    return [...steps];
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
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
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
