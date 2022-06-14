import { Icon } from '@equinor/eds-core-react';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import {
    CreateReleaseControlStepModel,
    Criteria,
    CriteriaTemplate,
    ReleaseControl,
} from '../../../types/releaseControl';
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
                    value: '',
                },
            ],
            criterias: [],
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
    steps[index].criteriaTemplates[0].type = 'RequireProcosysFunctionalRoleSignature';
    steps[index].criteriaTemplates[0].assignToCreator = false;

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
                value: '',
            },
        ],
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
                value: '',
            },
        ],
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

export function addStep(steps: CreateReleaseControlStepModel[]): void {
    updateAtom({
        workflowSteps: addStepAfter(
            {
                order: steps.length,
                name: '',
                allowContributors: true,
                criteriaTemplates: [],
                criterias: [],
            },
            steps
        ),
    });
}

export function getWorkflowStepMenuActions(
    step: CreateReleaseControlStepModel,
    steps: CreateReleaseControlStepModel[],
    initiateStep?: boolean
): MenuItem[] {
    const actions: MenuItem[] = [];
    {
        !initiateStep &&
            actions.push({
                label: 'Add step before',
                icon: <InsertBefore />,
                onClick: () =>
                    updateAtom({
                        workflowSteps: addStepBefore(step, steps),
                    }),
            });
    }

    actions.push({
        label: 'Add step after',
        icon: <InsertAfter />,
        onClick: () =>
            updateAtom({
                workflowSteps: addStepAfter(step, steps),
            }),
    });

    {
        !initiateStep &&
            actions.push({
                label: 'Duplicate step',
                icon: <Icon name="copy" color="grey" />,
                onClick: () =>
                    updateAtom({
                        workflowSteps: duplicateStep(step, steps),
                    }),
            });
    }
    {
        !initiateStep &&
            actions.push({
                label: 'Delete',
                icon: <Icon name="delete_forever" color="grey" />,
                onClick: () =>
                    updateAtom({
                        workflowSteps: removeStep(step, steps),
                    }),
            });
    }

    return actions;
}

export function setCriteriaTemplates(
    releaseControl: ReleaseControl | undefined
): ReleaseControl | undefined {
    if (releaseControl === undefined) {
        return undefined;
    }
    const editedSteps = releaseControl.workflowSteps;
    editedSteps.forEach((x) => (x.criteriaTemplates = packCriterias(x.criterias)));
    return releaseControl;
}

export function packCriterias(criterias: Criteria[]): CriteriaTemplate[] {
    const criteriaTemplates = criterias.map((c: Criteria) => {
        const criteriaTemplate: CriteriaTemplate = {
            assignToCreator: false,
            value: c.valueDescription,
            type: 'RequireProcosysFunctionalRoleSignature',
        };
        return criteriaTemplate;
    });
    return criteriaTemplates;
}

export function getFullWorkflowTemplate(): CreateReleaseControlStepModel[] {
    const fullReleaseControlTemplate: CreateReleaseControlStepModel[] = [
        {
            order: 1,
            name: 'Initiate',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysUserSignature',
                    assignToCreator: true,
                    value: '',
                },
            ],
            criterias: [],
        },
        {
            order: 2,
            name: 'Coordinator',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysFunctionalRoleSignature',
                    assignToCreator: false,
                    value: 'RC - Coordinator',
                },
            ],
            criterias: [],
        },
        {
            order: 3,
            name: 'Work prep',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysFunctionalRoleSignature',
                    assignToCreator: false,
                    value: 'RC - Work prep.',
                },
            ],
            criterias: [],
        },

        {
            order: 4,
            name: 'Circuit isolation',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysFunctionalRoleSignature',
                    assignToCreator: false,
                    value: 'RC - Comm. Electro',
                },
            ],
            criterias: [],
        },
        {
            order: 5,
            name: 'Demount ISO',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysFunctionalRoleSignature',
                    assignToCreator: false,
                    value: 'RC - Insulation',
                },
            ],
            criterias: [],
        },
        {
            order: 6,
            name: 'Check/demount HT',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysFunctionalRoleSignature',
                    assignToCreator: false,
                    value: 'RC - Electrical',
                },
            ],
            criterias: [],
        },
        {
            order: 7,
            name: 'Remount (or new) HT/A-test',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysFunctionalRoleSignature',
                    assignToCreator: false,
                    value: 'RC - Electrical',
                },
            ],
            criterias: [],
        },
        {
            order: 8,
            name: 'Remount (or new) ISO',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysFunctionalRoleSignature',
                    assignToCreator: false,
                    value: 'RC - Insulation',
                },
            ],
            criterias: [],
        },
        {
            order: 9,
            name: 'Remount (or new) HT/B-test',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysFunctionalRoleSignature',
                    assignToCreator: false,
                    value: 'RC - Electrical',
                },
            ],
            criterias: [],
        },
        {
            order: 10,
            name: 'Circuit power-up',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysFunctionalRoleSignature',
                    assignToCreator: false,
                    value: 'RC - Comm. Electro',
                },
            ],
            criterias: [],
        },
        {
            order: 11,
            name: 'Remount (or new) HT/C-test',
            allowContributors: true,
            criteriaTemplates: [
                {
                    type: 'RequireProcosysFunctionalRoleSignature',
                    assignToCreator: false,
                    value: 'RC - Electrical',
                },
            ],
            criterias: [],
        },
    ];
    return fullReleaseControlTemplate;
}
