import { Icon } from '@equinor/eds-core-react';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import { ReleaseControlStep } from '../../../types/releaseControl';
import { InsertAfter } from './InsertAfter';
import { InsertBefore } from './InsertBefore';

const { updateAtom } = DRCFormAtomApi;

export interface MenuItem {
    label: string;
    onClick?: () => void;
    icon?: JSX.Element;
    isDisabled?: boolean;
}

export function getNewWorkflowSteps(): ReleaseControlStep[] {
    const baseReleaseControlSteps: ReleaseControlStep[] = [
        {
            id: '',
            order: 1,
            name: '',
            responsible: '',
            isCompleted: false,
            isCurrent: false,
            contributors: [],
            criterias: [],
        },
    ];
    return baseReleaseControlSteps;
}

export function updateStepName(
    step: ReleaseControlStep,
    steps: ReleaseControlStep[],
    stepName: string
): ReleaseControlStep[] {
    const index = steps.findIndex((x) => x.order === step.order);
    steps[index].name = stepName;
    return [...steps];
}

export function updateStepResponsible(
    step: ReleaseControlStep,
    steps: ReleaseControlStep[],
    responsible: string
): ReleaseControlStep[] {
    const index = steps.findIndex((x) => x.order === step.order);
    steps[index].responsible = responsible;
    return [...steps];
}

export function addStepAfter(
    currentStep: ReleaseControlStep,
    steps: ReleaseControlStep[]
): ReleaseControlStep[] {
    const newStep = {
        id: '',
        order: currentStep.order + 1,
        name: '',
        responsible: '',
        isCompleted: false,
        isCurrent: false,
        contributors: [],
        criterias: [],
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
    currentStep: ReleaseControlStep,
    steps: ReleaseControlStep[]
): ReleaseControlStep[] {
    const newStep = {
        id: '',
        order: currentStep.order,
        name: '',
        responsible: '',
        isCompleted: false,
        isCurrent: false,
        contributors: [],
        criterias: [],
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
    currentStep: ReleaseControlStep,
    steps: ReleaseControlStep[]
): ReleaseControlStep[] {
    const newStep = {
        id: '',
        order: currentStep.order + 1,
        name: currentStep.name,
        responsible: currentStep.responsible,
        isCompleted: false,
        isCurrent: false,
        contributors: [],
        criterias: [],
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
    step: ReleaseControlStep,
    steps: ReleaseControlStep[]
): ReleaseControlStep[] {
    steps = steps.filter((x) => x.order !== step.order);
    steps.forEach((x) => {
        if (x.order > step.order) {
            x.order--;
        }
    });
    return steps;
}

export function getWorkflowStepMenuActions(
    step: ReleaseControlStep,
    steps: ReleaseControlStep[]
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
