import { DateTime } from 'luxon';
import { PipetestCompletionStatusColors } from '../Styles/ReleaseControlColors';
import {
    CheckListStatus,
    PipetestCheckListOrder,
    PipetestStep,
    PipetestStatusOrder,
    CheckListStepTag,
    PipetestCompletionStatus,
} from '../Types/drcEnums';
import { CheckList, InsulationBox, Pipetest } from '../Types/pipetest';

export function sortPipetests(pipetests: Pipetest[]): Pipetest[] {
    pipetests.sort((a, b) => getPipetestStatusSortValue(a) - getPipetestStatusSortValue(b));
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
            case CheckListStepTag.Bolttensioning:
                number = PipetestCheckListOrder.Bolttensioning;
                break;
            case CheckListStepTag.PressureTest:
                number = PipetestCheckListOrder.PressureTest;
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
        if (checkList.formularType === CheckListStepTag.HtTest) {
            number = PipetestCheckListOrder.HtTest;
        } else if (checkList.formularType === CheckListStepTag.HtRetest) {
            number = PipetestCheckListOrder.HtRetest;
        }
    }
    return number;
}

export function getPipetestStatus(pipetest: Pipetest): PipetestStep {
    const checkLists = pipetest.checkLists;
    if (!isCheckListStepOk(checkLists, CheckListStepTag.Bolttensioning)) {
        return isCheckListStepsInRightOrder(
            checkLists,
            PipetestStatusOrder.Bolttensioning,
            pipetest.insulationBoxes
        )
            ? PipetestStep.Bolttensioning
            : PipetestStep.Unknown;
    } else if (!isCheckListStepOk(checkLists, CheckListStepTag.PressureTest)) {
        return isCheckListStepsInRightOrder(
            checkLists,
            PipetestStatusOrder.PressureTest,
            pipetest.insulationBoxes
        )
            ? PipetestStep.PressureTest
            : PipetestStep.Unknown;
    } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Painting)) {
        return isCheckListStepsInRightOrder(
            checkLists,
            PipetestStatusOrder.Painting,
            pipetest.insulationBoxes
        )
            ? PipetestStep.Painting
            : PipetestStep.Unknown;
    } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtTest)) {
        return isCheckListStepsInRightOrder(
            checkLists,
            PipetestStatusOrder.HtTest,
            pipetest.insulationBoxes
        )
            ? PipetestStep.HtTest
            : PipetestStep.Unknown;
    } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Insulation)) {
        return isCheckListStepsInRightOrder(
            checkLists,
            PipetestStatusOrder.Insulation,
            pipetest.insulationBoxes
        )
            ? PipetestStep.Insulation
            : PipetestStep.Unknown;
    } else if (
        pipetest.insulationBoxes.length !== 0 &&
        !isBoxInsulationOk(pipetest.insulationBoxes)
    ) {
        return isCheckListStepsInRightOrder(
            checkLists,
            PipetestStatusOrder.BoxInsulation,
            pipetest.insulationBoxes
        )
            ? PipetestStep.BoxInsulation
            : PipetestStep.Unknown;
    } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtRetest)) {
        return isCheckListStepsInRightOrder(
            checkLists,
            PipetestStatusOrder.HtRetest,
            pipetest.insulationBoxes
        )
            ? PipetestStep.HtRetest
            : PipetestStep.Unknown;
    } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Marking)) {
        return isCheckListStepsInRightOrder(
            checkLists,
            PipetestStatusOrder.Marking,
            pipetest.insulationBoxes
        )
            ? PipetestStep.Marking
            : PipetestStep.Unknown;
    } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtTemporary)) {
        return PipetestStep.Unknown;
    } else {
        return PipetestStep.Complete;
    }
}

export function isCheckListStepOk(checkLists: CheckList[], step: CheckListStepTag): boolean {
    return checkLists
        .filter((x) => x.tagNo.substring(0, 2) === step)
        .every((x) => x.status === CheckListStatus.OK || x.status === CheckListStatus.PunchBError);
}

export function isCheckListTestOk(checkLists: CheckList[], type: CheckListStepTag): boolean {
    return checkLists
        .filter((x) => x.formularType === type)
        .every((x) => x.status === CheckListStatus.OK || x.status === CheckListStatus.PunchBError);
}

export function isCheckListStepsInRightOrder(
    checkLists: CheckList[],
    checkListStep: PipetestStatusOrder,
    insulationBoxes: InsulationBox[]
): boolean {
    let rightOrder = true;

    checkLists = checkLists.filter((x) => getChecklistSortValue(x) > checkListStep);
    const checkInsulationBoxes =
        PipetestStatusOrder.BoxInsulation > checkListStep && insulationBoxes.length !== 0;
    const groupedArrays = checkLists.reduce(function (r, a) {
        r[a.formularType] = r[a.formularType] || [];
        r[a.formularType].push(a);
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
            x.procosysStatus === CheckListStatus.OK ||
            x.procosysStatus === CheckListStatus.PunchBError
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

export function getPipetestStatusSortValue(pipetest: Pipetest): number {
    let number: number = PipetestStatusOrder.Unknown;
    switch (pipetest.step) {
        case PipetestStep.Unknown:
            number = PipetestStatusOrder.Unknown;
            break;
        case PipetestStep.Bolttensioning:
            number = PipetestStatusOrder.Bolttensioning;
            break;
        case PipetestStep.PressureTest:
            number = PipetestStatusOrder.PressureTest;
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
    if (dateTime.weekYear === 1) return DATE_BLANKSTRING;
    return `${dateTime.weekYear}-${dateTime.weekNumber}`;
};

export const DATE_BLANKSTRING = 'No Date';

export const getYearAndWeekFromString = (dateString: string, removeDays = 0): string => {
    const date = new Date(dateString);
    return DateTime.fromJSDate(date).isValid
        ? getYearAndWeekFromDate(
              removeDays ? new Date(date.setDate(date.getDate() - removeDays)) : date
          )
        : DATE_BLANKSTRING;
};

export function getPipetestCompletionStatus(pipetest: Pipetest): PipetestCompletionStatus {
    const pipetestStepStatus = getPipetestStatus(pipetest);

    if (
        pipetestStepStatus === PipetestStep.Complete &&
        pipetest.checkLists.some((x) => x.status === CheckListStatus.PunchBError)
    ) {
        return PipetestCompletionStatus.PunchBError;
    } else if (pipetestStepStatus === PipetestStep.Complete) {
        return PipetestCompletionStatus.Complete;
    } else if (pipetest.checkLists.some((x) => x.status === CheckListStatus.PunchAError)) {
        return PipetestCompletionStatus.PunchAError;
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

export const getShortformCompletionStatusName = (status: string): string => {
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
        case CheckListStepTag.Bolttensioning:
            stepName = PipetestStep.Bolttensioning;
            break;
        case CheckListStepTag.PressureTest:
            stepName = PipetestStep.PressureTest;
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
        case CheckListStepTag.ChemicalCleaning:
            stepName = PipetestStep.ChemicalCleaning;
            break;
        case CheckListStepTag.HotOilFlushing:
            stepName = PipetestStep.HotOilFlushing;
            break;
    }
    return stepName;
}
