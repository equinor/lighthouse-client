import { DateTime, Duration } from 'luxon';
import { getPipetests } from '../api/getPipetests';
import { PipetestCompletionStatusColors } from '../../Styles/ReleaseControlColors';
import {
  CheckListStatus,
  PipetestCheckListOrder,
  PipetestStep,
  PipetestStatusOrder,
  CheckListStepTag,
  PipetestCompletionStatus,
} from '../../Types/drcEnums';
import {
  CheckList,
  Circuit,
  CircuitGrouped,
  HeatTraceGrouped,
  InsulationBox,
  Pipetest,
} from '../../Types/pipetest';
import { FilterValueType } from '@equinor/filter';

export async function fetchAndChewPipetestDataFromApi(): Promise<Pipetest[]> {
  let data = await getPipetests();
  data = chewPipetestDataFromApi(data);
  return data;
}
export const getTimePeriod = (item: Pipetest): string => {
  const date = DateTime.fromISO(item.rfccPlanned);

  const upcomingFourWeeks = (date: DateTime) =>
    0 < date?.diffNow('weeks').weeks && date?.diffNow('weeks').weeks < 4;
  const pastFourWeeks = (date: DateTime) =>
    -4 < date?.diffNow('weeks').weeks && date?.diffNow('weeks').weeks < 0;

  if (upcomingFourWeeks(date)) {
    return 'Next four weeks';
  }
  if (pastFourWeeks(date)) {
    return 'Past four weeks';
  }

  return 'Other';
};
export function chewPipetestDataFromApi(pipetests: Pipetest[]): Pipetest[] {
  pipetests.map((pipetest: Pipetest) => {
    pipetest.circuits?.forEach((circuit: Circuit) => {
      circuit.checkLists?.forEach((checkList: CheckList) => {
        checkList.formularType.startsWith(CheckListStepTag.HtCTest);
        pipetest.checkLists.push(checkList);
      });
    });
    pipetest.checkLists = sortPipetestChecklist(pipetest.checkLists);
    pipetest.heatTraces = pipetest.checkLists.filter(({ isHeatTrace }) => isHeatTrace);
    pipetest.step = getPipetestStatus(pipetest);
    pipetest.steps = getPipetestSteps(pipetest);
    pipetest.pipetestProcessDoneInRightOrder = isPipetestProcessDoneInRightOrder(pipetest);
    pipetest.completionStatus = getPipetestCompletionStatus(pipetest);
    pipetest.shortformCompletionStatus = getShortformCompletionStatusName(
      pipetest.completionStatus
    );
    pipetest.dueDateTimePeriod = getTimePeriod(pipetest);
    pipetest.overdue =
      pipetest.step !== PipetestStep.Complete &&
      DateTime.now() > DateTime.fromISO(pipetest.rfccPlanned)
        ? 'Yes'
        : 'No';
    pipetest.hasCriticalLine = pipetest.lines?.some((line) => line.isCritical === true);

    pipetest.htCableRfc = getHTCableRfc(pipetest.checkLists.filter((x) => x.isHeatTrace));

    if (isHTCableExposed(pipetest)) {
      pipetest.htCableExposed = getHTCableExposedTime(pipetest.checkLists);
    }

    //Find insulation checklists and add them to pipeInsulationBox array.
    pipetest.pipeInsulationBoxes = [];
    const insulationCheckLists = pipetest.checkLists.filter(
      (checkList) => checkList.tagNo.substring(0, 2) === CheckListStepTag.Insulation
    );
    insulationCheckLists.forEach((checkList) => {
      const pipeInsulationBox: InsulationBox = {
        objectNo: checkList.tagNo,
        objectName: checkList.responsible + ' / ' + checkList.formularGroup,
        objectStatus: 'rev: ' + checkList.revision,
        procosysStatus: checkList.status,
        object3dReference: '',
        objectStatusName: '',
      };
      pipetest.pipeInsulationBoxes?.push(pipeInsulationBox);
    });

    //Find 'PIPB-' insulation boxes and move them to pipeInsulationBox array
    const pipbInsulations = pipetest.insulationBoxes?.filter(
      (x) => x.objectNo.substring(0, 4) === 'PIPB'
    );
    pipbInsulations.forEach((x) => pipetest.pipeInsulationBoxes?.push(x));
    pipetest.insulationBoxes = pipetest.insulationBoxes?.filter(
      (x) => x.objectNo.substring(0, 4) !== 'PIPB'
    );
    return pipetest;
  });

  //Find the worst step for all heatTraces related to the pipetest
  const pipetestsGroupedByHeatTrace = getPipetestsGroupedByHeatTrace(pipetests);
  pipetests.map((pipetest: Pipetest) => {
    if (pipetest.heatTraces.length !== 0) {
      pipetest.heatTraces.map((heatTrace: CheckList) => {
        const pipetestGroupedByHeatTrace = pipetestsGroupedByHeatTrace.find(
          (x) => x.htTagNo === heatTrace.tagNo
        );
        if (pipetestGroupedByHeatTrace !== undefined) {
          heatTrace.worstPipetestStep = getWorstStepForHeatTrace(pipetestGroupedByHeatTrace);
        }
        return heatTrace;
      });
      pipetest.htStep = getWorstStepForPipetestHeatTraces(pipetest);
    }
    return pipetest;
  });

  //Find the worst step for all circuits related to the pipetest
  const pipetestsGroupedByCircuit = getPipetestsGroupedByCircuit(pipetests);
  pipetests.map((pipetest: Pipetest) => {
    if (pipetest.circuits.length !== 0) {
      pipetest.circuits.map((circuit: Circuit) => {
        const pipetestGroupedByCircuit = pipetestsGroupedByCircuit.find(
          (x) => x.circuitTagNo === circuit.circuitAndStarterTagNo
        );
        if (pipetestGroupedByCircuit !== undefined) {
          circuit.worstPipetestStep = getWorstStepForCircuit(pipetestGroupedByCircuit);
        }
        return circuit;
      });
      pipetest.circuitStep = getWorstStepForPipetestCircuits(pipetest);
    }
    return pipetest;
  });

  sortPipetests(pipetests);
  return pipetests;
}

export function getHTCableRfc(checkLists: CheckList[]): string {
  const dates: string[] = [];

  checkLists.forEach((checkList: CheckList) => {
    const mcDate = checkList.m03Forecast || checkList.m03Planned;
    const commDate = checkList.c01Forecast || checkList.c01Planned;

    if (mcDate !== null) {
      dates.push(mcDate ?? '');
    } else if (commDate !== null) {
      dates.push(commDate ?? '');
    }
  });

  if (dates.length === 0) {
    return 'No date';
  }
  const earliestDate = dates.reduce(function (a, b) {
    return a < b ? a : b;
  });

  return earliestDate;
}

export function sortPipetests(pipetests: Pipetest[]): Pipetest[] {
  pipetests.sort((a, b) => getPipetestStatusSortValue(a.step) - getPipetestStatusSortValue(b.step));
  return pipetests;
}

export function sortPipetestChecklist(checkLists: CheckList[]): CheckList[] {
  checkLists.sort((a, b) => getChecklistSortValue(a) - getChecklistSortValue(b));
  return checkLists;
}

export function getChecklistSortValue(checkList: CheckList): number {
  let number: number = PipetestCheckListOrder.Unknown;
  if (!checkList.isHeatTrace) {
    switch (checkList.tagNo.substring(0, 2)) {
      case CheckListStepTag.PressureTest:
        number = PipetestCheckListOrder.PressureTest;
        break;
      case CheckListStepTag.ChemicalCleaning:
        number = PipetestCheckListOrder.ChemicalCleaning;
        break;
      case CheckListStepTag.HotOilFlushing:
        number = PipetestCheckListOrder.HotOilFlushing;
        break;
      case CheckListStepTag.Bolttensioning:
        number = PipetestCheckListOrder.Bolttensioning;
        break;
      case CheckListStepTag.Painting:
        number = PipetestCheckListOrder.Painting;
        break;
      case CheckListStepTag.Insulation:
        number = PipetestCheckListOrder.Insulation;
        break;
      case CheckListStepTag.Marking:
        number = PipetestCheckListOrder.Marking;
        break;
    }
  } else {
    if (checkList.formularType.startsWith(CheckListStepTag.HtTest)) {
      number = PipetestCheckListOrder.HtTest;
    } else if (checkList.formularType.startsWith(CheckListStepTag.HtRetest)) {
      number = PipetestCheckListOrder.HtRetest;
    } else if (checkList.formularType.startsWith(CheckListStepTag.HtCTest)) {
      number = PipetestCheckListOrder.HtCTest;
    }
  }
  return number;
}

export function getPipetestStatus(pipetest: Pipetest): PipetestStep {
  const checkLists = pipetest.checkLists;
  if (!isCheckListStepOk(checkLists, CheckListStepTag.PressureTest)) {
    return PipetestStep.PressureTest;
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.ChemicalCleaning)) {
    return PipetestStep.ChemicalCleaning;
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.HotOilFlushing)) {
    return PipetestStep.HotOilFlushing;
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Bolttensioning)) {
    return PipetestStep.Bolttensioning;
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Painting)) {
    return PipetestStep.Painting;
  } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtTest)) {
    return PipetestStep.HtTest;
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Insulation)) {
    return PipetestStep.Insulation;
  } else if (
    pipetest.insulationBoxes.length !== 0 &&
    !isBoxInsulationOk(pipetest.insulationBoxes)
  ) {
    return PipetestStep.BoxInsulation;
  } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtRetest)) {
    return PipetestStep.HtRetest;
  } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtCTest)) {
    return PipetestStep.HtCTest;
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Marking)) {
    return PipetestStep.Marking;
  } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtTemporary)) {
    return PipetestStep.Unknown;
  } else {
    return PipetestStep.Complete;
  }
}

export function getPipetestSteps(pipetest: Pipetest): PipetestStep[] {
  const pipetestSteps: PipetestStep[] = [];

  if (pipetest.checkLists.some((x) => x.tagNo.substring(0, 2) === CheckListStepTag.PressureTest)) {
    pipetestSteps.push(PipetestStep.PressureTest);
  }
  if (
    pipetest.checkLists.some((x) => x.tagNo.substring(0, 2) === CheckListStepTag.ChemicalCleaning)
  ) {
    pipetestSteps.push(PipetestStep.ChemicalCleaning);
  }
  if (
    pipetest.checkLists.some((x) => x.tagNo.substring(0, 2) === CheckListStepTag.HotOilFlushing)
  ) {
    pipetestSteps.push(PipetestStep.HotOilFlushing);
  }
  if (
    pipetest.checkLists.some((x) => x.tagNo.substring(0, 2) === CheckListStepTag.Bolttensioning)
  ) {
    pipetestSteps.push(PipetestStep.Bolttensioning);
  }
  if (pipetest.checkLists.some((x) => x.tagNo.substring(0, 2) === CheckListStepTag.Painting)) {
    pipetestSteps.push(PipetestStep.Painting);
  }
  if (pipetest.checkLists.some((x) => x.formularType.startsWith(CheckListStepTag.HtTest))) {
    pipetestSteps.push(PipetestStep.HtTest);
  }
  if (pipetest.checkLists.some((x) => x.tagNo.substring(0, 2) === CheckListStepTag.Insulation)) {
    pipetestSteps.push(PipetestStep.Insulation);
  }
  if (pipetest.insulationBoxes.length !== 0) {
    pipetestSteps.push(PipetestStep.BoxInsulation);
  }
  if (pipetest.checkLists.some((x) => x.formularType.startsWith(CheckListStepTag.HtRetest))) {
    pipetestSteps.push(PipetestStep.HtRetest);
  }
  if (pipetest.checkLists.some((x) => x.formularType.startsWith(CheckListStepTag.HtCTest))) {
    pipetestSteps.push(PipetestStep.HtCTest);
  }
  if (pipetest.checkLists.some((x) => x.tagNo.substring(0, 2) === CheckListStepTag.Marking)) {
    pipetestSteps.push(PipetestStep.Marking);
  }

  return pipetestSteps;
}

export function isPipetestProcessDoneInRightOrder(pipetest: Pipetest): boolean {
  const checkLists = pipetest.checkLists;
  if (!isCheckListStepOk(checkLists, CheckListStepTag.PressureTest)) {
    if (
      !isCheckListStepsInRightOrder(
        checkLists,
        PipetestStatusOrder.PressureTest,
        pipetest.insulationBoxes
      )
    ) {
      return false;
    }
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.ChemicalCleaning)) {
    if (
      !isCheckListStepsInRightOrder(
        checkLists,
        PipetestStatusOrder.ChemicalCleaning,
        pipetest.insulationBoxes
      )
    ) {
      return false;
    }
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.HotOilFlushing)) {
    if (
      !isCheckListStepsInRightOrder(
        checkLists,
        PipetestStatusOrder.HotOilFlushing,
        pipetest.insulationBoxes
      )
    ) {
      return false;
    }
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Bolttensioning)) {
    if (
      !isCheckListStepsInRightOrder(
        checkLists,
        PipetestStatusOrder.Bolttensioning,
        pipetest.insulationBoxes
      )
    ) {
      return false;
    }
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Painting)) {
    if (
      !isCheckListStepsInRightOrder(
        checkLists,
        PipetestStatusOrder.Painting,
        pipetest.insulationBoxes
      )
    ) {
      return false;
    }
  } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtTest)) {
    if (
      !isCheckListStepsInRightOrder(
        checkLists,
        PipetestStatusOrder.HtTest,
        pipetest.insulationBoxes
      )
    ) {
      return false;
    }
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Insulation)) {
    if (
      !isCheckListStepsInRightOrder(
        checkLists,
        PipetestStatusOrder.Insulation,
        pipetest.insulationBoxes
      )
    ) {
      return false;
    }
  } else if (
    pipetest.insulationBoxes.length !== 0 &&
    !isBoxInsulationOk(pipetest.insulationBoxes)
  ) {
    if (
      !isCheckListStepsInRightOrder(
        checkLists,
        PipetestStatusOrder.BoxInsulation,
        pipetest.insulationBoxes
      )
    ) {
      return false;
    }
  } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtRetest)) {
    if (
      !isCheckListStepsInRightOrder(
        checkLists,
        PipetestStatusOrder.HtRetest,
        pipetest.insulationBoxes
      )
    ) {
      return false;
    }
  } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtCTest)) {
    if (
      !isCheckListStepsInRightOrder(
        checkLists,
        PipetestStatusOrder.HtCTest,
        pipetest.insulationBoxes
      )
    ) {
      return false;
    }
  } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Marking)) {
    if (
      !isCheckListStepsInRightOrder(
        checkLists,
        PipetestStatusOrder.Marking,
        pipetest.insulationBoxes
      )
    ) {
      return false;
    }
  } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtTemporary)) {
    return false;
  } else {
    return true;
  }
  return true;
}

export function isCheckListStepOk(checkLists: CheckList[], step: CheckListStepTag): boolean {
  return checkLists
    .filter((x) => x.tagNo.substring(0, 2) === step)
    .every((x) => x.status === CheckListStatus.OK || x.status === CheckListStatus.PunchBError);
}

export function isCheckListTestOk(checkLists: CheckList[], type: CheckListStepTag): boolean {
  return checkLists
    .filter((x) => x.formularType.startsWith(type))
    .every((x) => x.status === CheckListStatus.OK || x.status === CheckListStatus.PunchBError);
}

export function isCheckListStepsInRightOrder(
  checkLists: CheckList[],
  checkListStep: PipetestStatusOrder,
  insulationBoxes: InsulationBox[]
): boolean {
  let rightOrder = true;

  checkLists = checkLists.filter((x) => getChecklistSortValue(x) > checkListStep);
  //Filter out markings if B-test or C-test is current step (they can be done at the same time)
  if (
    checkListStep === PipetestStatusOrder.HtRetest ||
    checkListStep === PipetestStatusOrder.HtCTest
  ) {
    checkLists = checkLists.filter((x) => x.tagNo.substring(0, 2) !== CheckListStepTag.Marking);
  }
  const checkInsulationBoxes =
    PipetestStatusOrder.BoxInsulation > checkListStep && insulationBoxes.length !== 0;

  const groupedArrays = checkLists.reduce(function (r, a) {
    //Use substring(0, 7) to make tests of formularType ELE19.1xxx and ELE19.2xxx match each other
    r[a.formularType.substring(0, 7)] = r[a.formularType.substring(0, 7)] || [];
    r[a.formularType.substring(0, 7)].push(a);
    return r;
  }, Object.create(null));
  for (const key in groupedArrays) {
    const array = groupedArrays[key];
    if (
      array.every(
        (x) => x.status === CheckListStatus.OK || x.status === CheckListStatus.PunchBError
      ) ||
      (checkInsulationBoxes && isBoxInsulationOk(insulationBoxes))
    ) {
      rightOrder = false;
    }
  }

  return rightOrder;
}

export function isCheckListGroupOk(checkLists: CheckList[]): boolean {
  return checkLists.every(
    (x) => x.status === CheckListStatus.OK || x.status === CheckListStatus.PunchBError
  );
}

export function isBoxInsulationOk(insulationBoxes: InsulationBox[]): boolean {
  return insulationBoxes.every(
    (x) =>
      x.procosysStatus === CheckListStatus.OK || x.procosysStatus === CheckListStatus.PunchBError
  );
}

export function getBoxInsulationStatus(pipetest: Pipetest): CheckListStatus {
  if (pipetest.insulationBoxes?.length === 0) {
    return CheckListStatus.Inactive;
  } else if (pipetest.insulationBoxes.every((x) => x.procosysStatus === CheckListStatus.OK)) {
    return CheckListStatus.OK;
  } else if (
    pipetest.insulationBoxes.find((x) => x.procosysStatus === CheckListStatus.Outstanding)
  ) {
    {
      return CheckListStatus.Outstanding;
    }
  } else if (
    pipetest.insulationBoxes.find((x) => x.procosysStatus === CheckListStatus.PunchAError)
  ) {
    return CheckListStatus.PunchAError;
  } else if (
    pipetest.insulationBoxes.find((x) => x.procosysStatus === CheckListStatus.PunchBError)
  ) {
    return CheckListStatus.PunchBError;
  } else {
    return CheckListStatus.Outstanding;
  }
}

export function getPipetestStatusEnumByValue(enumValue: string): string {
  return Object.keys(PipetestStep).filter((x) => PipetestStep[x] === enumValue)[0];
}

export function getPipetestStatusSortValue(step: PipetestStep): number {
  let number: number = PipetestStatusOrder.Unknown;
  switch (step) {
    case PipetestStep.Unknown:
      number = PipetestStatusOrder.Unknown;
      break;

    case PipetestStep.PressureTest:
      number = PipetestStatusOrder.PressureTest;
      break;
    case PipetestStep.ChemicalCleaning:
      number = PipetestStatusOrder.ChemicalCleaning;
      break;
    case PipetestStep.HotOilFlushing:
      number = PipetestStatusOrder.HotOilFlushing;
      break;
    case PipetestStep.Bolttensioning:
      number = PipetestStatusOrder.Bolttensioning;
      break;
    case PipetestStep.Painting:
      number = PipetestStatusOrder.Painting;
      break;
    case PipetestStep.HtTest:
      number = PipetestStatusOrder.HtTest;
      break;
    case PipetestStep.Insulation:
      number = PipetestStatusOrder.Insulation;
      break;
    case PipetestStep.BoxInsulation:
      number = PipetestStatusOrder.BoxInsulation;
      break;
    case PipetestStep.HtRetest:
      number = PipetestStatusOrder.HtRetest;
      break;
    case PipetestStep.HtCTest:
      number = PipetestStatusOrder.HtCTest;
      break;
    case PipetestStep.Marking:
      number = PipetestStatusOrder.Marking;
      break;
    case PipetestStep.Complete:
      number = PipetestStatusOrder.Complete;
      break;
  }

  return number;
}

export function getPipetestStatusForStep(checkLists: CheckList[]): string {
  if (checkLists.every((x) => x.status === CheckListStatus.OK)) {
    return CheckListStatus.OK;
  } else if (checkLists.find((x) => x.status === CheckListStatus.Outstanding)) {
    {
      return CheckListStatus.Outstanding;
    }
  } else if (checkLists.find((x) => x.status === CheckListStatus.PunchAError)) {
    return CheckListStatus.PunchAError;
  } else if (checkLists.find((x) => x.status === CheckListStatus.PunchBError)) {
    return CheckListStatus.PunchBError;
  } else {
    return CheckListStatus.Inactive;
  }
}

export const getYearAndWeekFromDate = (date: Date): string => {
  const dateTime = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate());
  if (dateTime.year === 1) return DATE_BLANKSTRING;
  return `${dateTime.year}-${dateTime.weekNumber}`;
};

export const DATE_BLANKSTRING = 'No Date';

export const getYearAndWeekFromString = (dateString: string, removeDays = 0): string => {
  if (dateString === null || dateString === '') {
    return DATE_BLANKSTRING;
  }
  const date = new Date(dateString);
  return DateTime.fromJSDate(date).isValid
    ? getYearAndWeekFromDate(
        removeDays ? new Date(date.setDate(date.getDate() - removeDays)) : date
      )
    : DATE_BLANKSTRING;
};

export function getPipetestCompletionStatus(pipetest: Pipetest): PipetestCompletionStatus {
  const pipetestStepStatus = getPipetestStatus(pipetest);

  if (pipetest.checkLists.some((x) => x.status === CheckListStatus.Outstanding)) {
    return PipetestCompletionStatus.Outstanding;
  } else if (pipetest.checkLists.some((x) => x.status === CheckListStatus.PunchAError)) {
    return PipetestCompletionStatus.PunchAError;
  } else if (
    pipetestStepStatus === PipetestStep.Complete &&
    pipetest.checkLists.some((x) => x.status === CheckListStatus.PunchBError)
  ) {
    return PipetestCompletionStatus.PunchBError;
  } else if (pipetestStepStatus === PipetestStep.Complete) {
    return PipetestCompletionStatus.Complete;
  } else {
    return PipetestCompletionStatus.Outstanding;
  }
}

export const getDotsColor = (status: PipetestCompletionStatus): string => {
  switch (status) {
    case PipetestCompletionStatus.Outstanding:
      return PipetestCompletionStatusColors.OS;
    case PipetestCompletionStatus.Complete:
      return PipetestCompletionStatusColors.OK;
    case PipetestCompletionStatus.PunchBError:
      return PipetestCompletionStatusColors.PB;
    case PipetestCompletionStatus.PunchAError:
      return PipetestCompletionStatusColors.PA;
    default:
      return PipetestCompletionStatusColors.OS;
  }
};

export const getShortformCompletionStatusName = (status: string): CheckListStatus => {
  switch (status) {
    case PipetestCompletionStatus.Outstanding:
      return CheckListStatus.Outstanding;
    case PipetestCompletionStatus.Complete:
      return CheckListStatus.OK;
    case PipetestCompletionStatus.PunchBError:
      return CheckListStatus.PunchBError;
    case PipetestCompletionStatus.PunchAError:
      return CheckListStatus.PunchAError;
    default:
      return CheckListStatus.Outstanding;
  }
};

export function getChecklistStepName(step: CheckListStepTag): string {
  let stepName: string = PipetestStep.Unknown;

  switch (step) {
    case CheckListStepTag.PressureTest:
      stepName = PipetestStep.PressureTest;
      break;
    case CheckListStepTag.ChemicalCleaning:
      stepName = PipetestStep.ChemicalCleaning;
      break;
    case CheckListStepTag.HotOilFlushing:
      stepName = PipetestStep.HotOilFlushing;
      break;
    case CheckListStepTag.Bolttensioning:
      stepName = PipetestStep.Bolttensioning;
      break;
    case CheckListStepTag.Painting:
      stepName = PipetestStep.Painting;
      break;
    case CheckListStepTag.Insulation:
      stepName = PipetestStep.Insulation;
      break;
    case CheckListStepTag.BoxInsulation:
      stepName = PipetestStep.BoxInsulation;
      break;
    case CheckListStepTag.Marking:
      stepName = PipetestStep.Marking;
      break;
    case CheckListStepTag.HtTest:
      stepName = PipetestStep.HtTest;
      break;
    case CheckListStepTag.HtRetest:
      stepName = PipetestStep.HtRetest;
      break;
    case CheckListStepTag.HtCTest:
      stepName = PipetestStep.HtCTest;
      break;
  }
  return stepName;
}

export function getCheckListStatusSortValue(checkList: CheckList): number {
  switch (checkList.status) {
    case CheckListStatus.Outstanding:
      return 1;
    case CheckListStatus.PunchAError:
      return 2;
    case CheckListStatus.PunchBError:
      return 3;
    case CheckListStatus.OK:
      return 4;
    default:
      return 5;
  }
}

export function sortCheckListsForTable(checkLists: CheckList[]): CheckList[] {
  checkLists.sort((a, b) => getCheckListStatusSortValue(a) - getCheckListStatusSortValue(b));
  return checkLists;
}

// Check if a htCable is exposed. A-test is signed and complete but no insulation is completed.
// Gets amount of time the cable has been exposed.
export function isHTCableExposed(pipetest: Pipetest): boolean {
  return getPipetestStatusSortValue(pipetest.step) <= PipetestStatusOrder.Insulation &&
    !isCheckListStepOk(pipetest.checkLists, CheckListStepTag.Insulation) &&
    isCheckListTestOk(pipetest.checkLists, CheckListStepTag.HtTest)
    ? true
    : false;
}

export function getHTCableExposedTime(checkLists: CheckList[]): string | null {
  //Gets signed dates for A-test (HtTest)
  const aTestDates: DateTime[] = checkLists
    .filter((x) => x.formularType.startsWith(CheckListStepTag.HtTest) && x.signedDate !== undefined)
    .map((checkList: CheckList) => {
      return DateTime.fromISO(checkList.signedDate ? checkList.signedDate : '');
    });

  //Gets earliest date from all dates
  const timeExposed = DateTime.min.apply(null, aTestDates);

  //If we have an earliest date, we transform it into a duration based on todays date going back in time
  if (timeExposed !== undefined) {
    const durationDiff = DateTime.now()
      .diff(timeExposed, ['years', 'months', 'weeks', 'days'])
      .toObject();

    const duration = Duration.fromObject(durationDiff);
    //We turn it into a filter-friendly value, to not get too many unique filter options
    return getFilterValueFromDuration(duration);
  }
  return null;
}

export function getFilterValueFromDuration(duration: Duration): string {
  if (duration.years > 0) {
    return duration.years + 'y';
  } else if (duration.months > 0) {
    return duration.months + 'm';
  } else if (duration.weeks > 0) {
    return duration.weeks + 'w';
  } else if (duration.days > 0) {
    return duration.days.toFixed(0) + 'd';
  } else {
    return '';
  }
}

export function sortFilterValueDateDurations(values: FilterValueType[]): FilterValueType[] {
  values.sort((a, b) => {
    const map = new Map<string, number>();

    //Different values for days/weeks/months/years
    map.set('d', 1);
    map.set('w', 2);
    map.set('m', 3);
    map.set('y', 4);

    if (typeof a !== 'string' || a === null) return -1;
    if (typeof b !== 'string' || b === null) return -1;

    let result = 0;
    //If time format (days/weeks/months/years) is different we calculate based on the map above
    if (a.substring(a.length - 1) !== b.substring(b.length - 1)) {
      result =
        (map.get(a.substring(a.length - 1)) ?? -0) - (map.get(b.substring(b.length - 1)) ?? -0);
      //If time format is the same we calculate based on the number before the letter
    } else {
      result = Number(a.substring(0, a.length - 1)) - Number(b.substring(0, b.length - 1));
    }
    return result;
  });
  return values;
}

export function getPipetestsByHeatTrace(htTagNo: string, pipetests: Pipetest[]): HeatTraceGrouped {
  const pipetestChildren = pipetests.filter(
    (pipetest, index, array) =>
      pipetest.heatTraces.map((x) => x.tagNo)?.includes(htTagNo) &&
      array.indexOf(pipetest) === index
  );
  return {
    htTagNo: htTagNo,
    pipetests: pipetestChildren,
    count: pipetestChildren.length,
  };
}

export function getPipetestsByCircuit(circuitTagNo: string, pipetests: Pipetest[]): CircuitGrouped {
  const pipetestChildren = pipetests.filter(
    (pipetest, index, array) =>
      pipetest.circuits.map((x) => x.circuitAndStarterTagNo)?.includes(circuitTagNo) &&
      array.indexOf(pipetest) === index
  );
  return {
    circuitTagNo: circuitTagNo,
    pipetests: pipetestChildren,
    count: pipetestChildren.length,
  };
}

export function getPipetestsGroupedByHeatTrace(pipetests: Pipetest[]): HeatTraceGrouped[] {
  let pipetestsGroupedByHeatTrace: HeatTraceGrouped[] = [];
  pipetestsGroupedByHeatTrace = pipetests
    .reduce(
      (prev: string[], curr) => [
        ...prev,
        ...curr.heatTraces?.map((x) => x.tagNo)?.filter((ht) => !prev.includes(ht)),
      ],
      []
    )
    .map((htCheckList) => getPipetestsByHeatTrace(htCheckList, pipetests));

  /** Pipetest that has no heatTraces */
  const pipetestChildren = pipetests?.filter(({ heatTraces }) => heatTraces.length === 0);
  pipetestsGroupedByHeatTrace.push({
    htTagNo: 'No HT cables',
    pipetests: pipetestChildren,
    count: pipetestChildren.length,
  });

  return pipetestsGroupedByHeatTrace;
}

export function getPipetestsGroupedByCircuit(pipetests: Pipetest[]): CircuitGrouped[] {
  let pipetestsGroupedByCircuit: CircuitGrouped[] = [];
  pipetestsGroupedByCircuit = pipetests
    .reduce(
      (prev: string[], curr) => [
        ...prev,
        ...curr.circuits
          ?.map((x) => x.circuitAndStarterTagNo)
          ?.filter((circuit) => !prev.includes(circuit)),
      ],
      []
    )
    .map((circuitCheckList) => getPipetestsByCircuit(circuitCheckList, pipetests));

  /** Pipetest that has no circuits */
  const pipetestChildren = pipetests?.filter(({ circuits }) => circuits.length === 0);
  pipetestsGroupedByCircuit.push({
    circuitTagNo: 'No circuits',
    pipetests: pipetestChildren,
    count: pipetestChildren.length,
  });

  return pipetestsGroupedByCircuit;
}

export function getWorstStepForHeatTrace(heatTraceGrouped: HeatTraceGrouped): PipetestStep {
  const worstPipetest = heatTraceGrouped.pipetests.reduce((prev, curr) =>
    getPipetestStatusSortValue(prev.step) < getPipetestStatusSortValue(curr.step) ? prev : curr
  );
  return worstPipetest.step;
}

export function getWorstStepForPipetestHeatTraces(pipetest: Pipetest): PipetestStep {
  const worstHeatTrace = pipetest.heatTraces?.reduce((prev, curr) =>
    getPipetestStatusSortValue(prev.worstPipetestStep ?? PipetestStep.Unknown) <
    getPipetestStatusSortValue(curr.worstPipetestStep ?? PipetestStep.Unknown)
      ? prev
      : curr
  );
  return worstHeatTrace.worstPipetestStep ?? PipetestStep.Unknown;
}

export function getWorstStepForCircuit(circuitGrouped: CircuitGrouped): PipetestStep {
  const worstPipetest = circuitGrouped.pipetests.reduce((prev, curr) =>
    getPipetestStatusSortValue(prev.step) < getPipetestStatusSortValue(curr.step) ? prev : curr
  );
  return worstPipetest.step;
}

export function getWorstStepForPipetestCircuits(pipetest: Pipetest): PipetestStep {
  const worstCircuit = pipetest.circuits?.reduce((prev, curr) =>
    getPipetestStatusSortValue(prev.worstPipetestStep ?? PipetestStep.Unknown) <
    getPipetestStatusSortValue(curr.worstPipetestStep ?? PipetestStep.Unknown)
      ? prev
      : curr
  );
  return worstCircuit.worstPipetestStep ?? PipetestStep.Unknown;
}
