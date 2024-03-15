import { Icon } from '@equinor/eds-core-react-old';
import { DRCFormAtomApi } from '../../../Atoms/formAtomApi';
import {
  CreateReleaseControlStepModel,
  Criteria,
  CriteriaTemplate,
  ReleaseControl,
  ReleaseControlStepNames,
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
      description: "",
      allowContributors: true, completedStatusName: 'Initiated', criteriaTemplates: [ {
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
  steps[index] = getStatusNamesForStep(steps[index]);
  return [...steps];
}

export function getStatusNamesForStep(
  step: CreateReleaseControlStepModel
): CreateReleaseControlStepModel {
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
  step: CreateReleaseControlStepModel,
  steps: CreateReleaseControlStepModel[],
  responsible: string,
  responsibleDescription: string,
  responsibleType: string
): CreateReleaseControlStepModel[] {
  const index = steps.findIndex((x) => x.order === step.order);
  steps[index].criteriaTemplates[0].value = responsible;
  steps[index].criteriaTemplates[0].valueDescription = responsibleDescription;
  steps[index].criteriaTemplates[0].assignToCreator = false;

  steps[index].criteriaTemplates[0].type =
    responsibleType === 'functionalRole'
      ? 'RequireProcosysFunctionalRoleSignature'
      : 'RequireProcosysUserSignature';

  return [...steps];
}

export function addStepAfter(
  currentStep: CreateReleaseControlStepModel,
  steps: CreateReleaseControlStepModel[]
): CreateReleaseControlStepModel[] {
  const newStep: CreateReleaseControlStepModel = {
    id: Math.random().toString(), //Needs temporary unique id for drag/drop sorting
    order: currentStep.order + 1,
    description: "",
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
    id: Math.random().toString(), //Needs temporary unique id for drag/drop sorting
    description: "",
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
        id: Math.random().toString(), //Needs temporary unique id for drag/drop sorting
        description: "",
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

export function setData(releaseControl: ReleaseControl | undefined): ReleaseControl | undefined {
  if (releaseControl === undefined) {
    return undefined;
  }
  const editedSteps = releaseControl.workflowSteps;
  editedSteps.forEach((x) => (x.criteriaTemplates = packCriterias(x.criterias)));

  return releaseControl;
}

export function packCriterias(criterias: Criteria[]): CriteriaTemplate[] {
  const criteriaTemplates = criterias.map((criteria: Criteria) => {
    const criteriaTemplate: CriteriaTemplate = {
      assignToCreator: false,
      value: criteria.value,
      valueDescription: criteria.valueDescription,
      type:
        criteria.type === 'RequireProcosysFunctionalRoleSignature'
          ? 'RequireProcosysFunctionalRoleSignature'
          : 'RequireProcosysUserSignature',
    };
    return criteriaTemplate;
  });
  return criteriaTemplates;
}

export const updateStep = (stepName: 'scope' | 'workflow') => {
  updateAtom({ step: stepName });
};
