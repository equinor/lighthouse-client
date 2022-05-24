import { Icon } from '@equinor/eds-core-react';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { CreateReleaseControlStepModel } from '../../../types/releaseControl';
import { InsertAfter } from './InsertAfter';
import { InsertBefore } from './InsertBefore';

const { updateAtom } = DRCFormAtomApi;

export interface MenuItem {
    label: string;
    onClick?: () => void;
    icon?: JSX.Element;
    isDisabled?: boolean;
}

export function getNewWorkflowSteps(): CreateReleaseControlStepModel[] {
    const baseReleaseControlSteps: CreateReleaseControlStepModel[] = [
        {
            order: 1,
            name: 'Initiate',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysUserSignature',
                    assignToCreator: true,
                },
            ],
        },
    ];
    return baseReleaseControlSteps;
}

export function updateStepName(
    step: CreateReleaseControlStepModel,
    steps: CreateReleaseControlStepModel[],
    stepName: string
): CreateReleaseControlStepModel[] {
    const index = steps.findIndex((x) => x.order === step.order);
    steps[index].name = stepName;
    return [...steps];
}

export function updateStepResponsible(
    step: CreateReleaseControlStepModel,
    steps: CreateReleaseControlStepModel[],
    responsible: string
): CreateReleaseControlStepModel[] {
    const index = steps.findIndex((x) => x.order === step.order);
    steps[index].criteriaTemplates[0].value = responsible;
    return [...steps];
}

export function addStepAfter(
    currentStep: CreateReleaseControlStepModel,
    steps: CreateReleaseControlStepModel[]
): CreateReleaseControlStepModel[] {
    const newStep: CreateReleaseControlStepModel = {
        order: currentStep.order + 1,
        name: '',
        allowContributors: true,
        criteriaTemplates: [
            {
                assignToCreator: true,
                type: 'RequireProcosysUserSignature',
            },
        ],
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
    currentStep: CreateReleaseControlStepModel,
    steps: CreateReleaseControlStepModel[]
): CreateReleaseControlStepModel[] {
    const newStep: CreateReleaseControlStepModel = {
        order: currentStep.order,
        name: '',
        allowContributors: true,
        criteriaTemplates: [
            {
                assignToCreator: true,
                type: 'RequireProcosysUserSignature',
            },
        ],
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
    currentStep: CreateReleaseControlStepModel,
    steps: CreateReleaseControlStepModel[]
): CreateReleaseControlStepModel[] {
    const newStep: CreateReleaseControlStepModel = {
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
    step: CreateReleaseControlStepModel,
    steps: CreateReleaseControlStepModel[]
): CreateReleaseControlStepModel[] {
    steps = steps.filter((x) => x.order !== step.order);
    steps.forEach((x) => {
        if (x.order > step.order) {
            x.order--;
        }
    });
    return steps;
}

export function getWorkflowStepMenuActions(
    step: CreateReleaseControlStepModel,
    steps: CreateReleaseControlStepModel[]
): MenuItem[] {
    const actions: MenuItem[] = [];
    actions.push({
        label: 'Add step before',
        icon: <InsertBefore />,
        onClick: () =>
            updateAtom({
                workflowSteps: addStepBefore(step, steps),
            }),
    });

    actions.push({
        label: 'Add step after',
        icon: <InsertAfter />,
        onClick: () =>
            updateAtom({
                workflowSteps: addStepAfter(step, steps),
            }),
    });

    actions.push({
        label: 'Duplicate step',
        icon: <Icon name="copy" color="grey" />,
        onClick: () =>
            updateAtom({
                workflowSteps: duplicateStep(step, steps),
            }),
    });

    actions.push({
        label: 'Delete',
        icon: <Icon name="delete_forever" color="grey" />,
        onClick: () =>
            updateAtom({
                workflowSteps: removeStep(step, steps),
            }),
    });

    return actions;
}
