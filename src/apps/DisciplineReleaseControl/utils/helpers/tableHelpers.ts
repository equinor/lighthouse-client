import {
  CheckListStatus,
  CheckListStepTag,
  PipetestCompletionStatus,
  PipetestStep,
} from '../../Types/drcEnums';
import { CheckList, CheckListType, Pipetest } from '../../Types/pipetest';
import {
  getBoxInsulationStatus,
  getChecklistStepName,
  getPipetestStatusForStep,
} from './statusHelpers';

export const checklistTagFunc = (item: CheckList) => {
  switch (item?.status) {
    case CheckListStatus.Outstanding:
      return PipetestCompletionStatus.Outstanding;
    case CheckListStatus.OK:
      return PipetestCompletionStatus.Complete;
    case CheckListStatus.PunchBError:
      return PipetestCompletionStatus.PunchBError;
    case CheckListStatus.PunchAError:
      return PipetestCompletionStatus.PunchAError;
    case CheckListStatus.Inactive:
      return PipetestCompletionStatus.Inactive;
    default:
      return PipetestCompletionStatus.Outstanding;
  }
};

export function getHTList(checkLists: CheckList[]): string[] {
  const heatTraces: string[] = [];
  checkLists
    .filter((x) => x.isHeatTrace)
    .forEach((ht: CheckList) => {
      heatTraces.push(ht.tagNo);
    });

  return heatTraces;
}

export function getPipetestsWithHTCable(pipetests: Pipetest[]): Pipetest[] {
  const pipetestsWithHTCable: Pipetest[] = [];
  pipetests?.forEach((pipetest: Pipetest) => {
    if (pipetest.checkLists.some((x) => x.isHeatTrace)) {
      pipetestsWithHTCable.push(pipetest);
    }
  });
  return pipetestsWithHTCable;
}

//TODO - refactor into more functions (3)
export function createChecklistSteps(pipetest: Pipetest): CheckList[] {
  const allWorkflowSteps = [
    CheckListStepTag.PressureTest,
    CheckListStepTag.ChemicalCleaning,
    CheckListStepTag.HotOilFlushing,
    CheckListStepTag.Bolttensioning,
    CheckListStepTag.Painting,
    CheckListStepTag.HtTest,
    CheckListStepTag.Insulation,
    CheckListStepTag.BoxInsulation,
    CheckListStepTag.HtRetest,
    CheckListStepTag.HtCTest,
    CheckListStepTag.Marking,
  ];
  const checkLists = pipetest.checkLists;
  const workflowSteps: CheckList[] = [];
  for (let i = 0; i < allWorkflowSteps.length; i++) {
    const foundSteps = checkLists.filter((x) => x.tagNo.substring(0, 2) === allWorkflowSteps[i]);
    const htTestStep =
      allWorkflowSteps[i] === CheckListStepTag.HtTest ||
      allWorkflowSteps[i] === CheckListStepTag.HtRetest ||
      allWorkflowSteps[i] === CheckListStepTag.HtCTest;
    const boxInsulationStep = allWorkflowSteps[i] === CheckListStepTag.BoxInsulation;
    const formularType =
      allWorkflowSteps[i] === CheckListStepTag.HtTest
        ? CheckListStepTag.HtTest
        : allWorkflowSteps[i] === CheckListStepTag.HtRetest
        ? CheckListStepTag.HtRetest
        : CheckListStepTag.HtCTest;
    if (foundSteps.length !== 0 && !htTestStep) {
      const workflowStep = foundSteps[0];
      workflowStep.status = getPipetestStatusForStep(foundSteps);
      workflowStep.workflowStepText = foundSteps[0]?.tagNo.substring(1, 2);
      workflowStep.stepName = getChecklistStepName(allWorkflowSteps[i]);
      workflowSteps.push(workflowStep);
    } else if (
      htTestStep &&
      checkLists.some((x) => x.isHeatTrace) &&
      checkLists.some((x) => x.formularType.startsWith(formularType))
    ) {
      const foundTestSteps = checkLists.filter((x) => x.formularType.startsWith(formularType));
      const workflowStep: CheckList = {
        tagNo: '',
        responsible: '',
        formularGroup: '',
        formularType: '',
        status: getPipetestStatusForStep(foundTestSteps),
        isHeatTrace: true,
        revision: '',
        test: '',
        workflowStepText: formularType.startsWith(CheckListStepTag.HtTest)
          ? '1'
          : formularType.startsWith(CheckListStepTag.HtRetest)
          ? '2'
          : '3',
        stepName: getChecklistStepName(allWorkflowSteps[i]),
        c01Forecast: '',
        c01Planned: '',
        m03Forecast: '',
        m03Planned: '',
        m04Actual: '',
      };
      workflowSteps.push(workflowStep);
    } else if (boxInsulationStep) {
      const workflowStep: CheckList = {
        tagNo: '',
        responsible: '',
        formularGroup: '',
        formularType: '',
        status: getBoxInsulationStatus(pipetest),
        isHeatTrace: false,
        revision: '',
        test: '',
        workflowStepText: 'ZB',
        stepName: getChecklistStepName(allWorkflowSteps[i]),
        c01Forecast: '',
        c01Planned: '',
        m03Forecast: '',
        m03Planned: '',
        m04Actual: '',
      };
      workflowSteps.push(workflowStep);
    } else {
      workflowSteps.push({
        tagNo: allWorkflowSteps[i],
        responsible: '',
        formularType: '',
        formularGroup: '',
        status: CheckListStatus.Inactive,
        revision: '',
        test: '',
        isHeatTrace: false,
        workflowStepText:
          htTestStep && allWorkflowSteps[i] === CheckListStepTag.HtTest
            ? '1'
            : htTestStep && allWorkflowSteps[i] === CheckListStepTag.HtRetest
            ? '2'
            : htTestStep && allWorkflowSteps[i] === CheckListStepTag.HtCTest
            ? '3'
            : allWorkflowSteps[i].substring(1, 2),
        stepName: getChecklistStepName(allWorkflowSteps[i]),
        c01Forecast: '',
        c01Planned: '',
        m03Forecast: '',
        m03Planned: '',
        m04Actual: '',
      });
    }
  }

  return workflowSteps;
}

export function getStatusLetterFromStatus(step: string | undefined): string {
  let letter = '';

  switch (step) {
    case PipetestStep.PressureTest:
      letter = 'T';
      break;
    case PipetestStep.ChemicalCleaning:
      letter = 'C';
      break;
    case PipetestStep.HotOilFlushing:
      letter = 'H';
      break;
    case PipetestStep.Bolttensioning:
      letter = 'B';
      break;
    case PipetestStep.Painting:
      letter = 'T';
      break;
    case PipetestStep.HtTest:
      letter = '1';
      break;
    case PipetestStep.Insulation:
      letter = 'Z';
      break;
    case PipetestStep.BoxInsulation:
      letter = 'ZB';
      break;
    case PipetestStep.HtRetest:
      letter = '2';
      break;
    case PipetestStep.HtCTest:
      letter = '3';
      break;
    case PipetestStep.Marking:
      letter = 'M';
      break;
    case PipetestStep.Complete:
      letter = '';
      break;
    case PipetestStep.Unknown:
      letter = '?';
      break;
  }

  return letter;
}

export function sortCheckListTable(checkLists: CheckListType[]): CheckListType[] {
  checkLists?.sort((a, b) => a.responsible?.localeCompare(b?.responsible));
  checkLists?.sort((a, b) => a.formularType?.localeCompare(b?.formularType));
  checkLists?.sort((a, b) =>
    a.revision !== undefined && b.revision !== undefined
      ? a.revision?.localeCompare(b?.revision)
      : -1
  );
  checkLists?.sort((a, b) => a.tagNo?.localeCompare(b?.tagNo));
  return checkLists;
}
