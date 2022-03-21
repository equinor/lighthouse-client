import { DateTime } from 'luxon';
import {
    CheckListStatus,
    PipetestCheckListOrder,
    PipetestStatus,
    PipetestStatusOrder,
    CheckListStepTag,
} from '../Types/drcEnums';
import { CheckList, Pipetest } from '../Types/pipetest';

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

export function getPipetestStatus(checkLists: CheckList[]): PipetestStatus {
    if (!isCheckListStepOk(checkLists, CheckListStepTag.Bolttensioning)) {
        return isCheckListStepsInRightOrder(checkLists, PipetestStatusOrder.ReadyForBolttensioning)
            ? PipetestStatus.ReadyForBolttensioning
            : PipetestStatus.Unknown;
    } else if (!isCheckListStepOk(checkLists, CheckListStepTag.PressureTest)) {
        return isCheckListStepsInRightOrder(checkLists, PipetestStatusOrder.ReadyForPressureTest)
            ? PipetestStatus.ReadyForPressureTest
            : PipetestStatus.Unknown;
    } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Painting)) {
        return isCheckListStepsInRightOrder(checkLists, PipetestStatusOrder.ReadyForPainting)
            ? PipetestStatus.ReadyForPainting
            : PipetestStatus.Unknown;
    } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtTest)) {
        return isCheckListStepsInRightOrder(checkLists, PipetestStatusOrder.ReadyForHtTest)
            ? PipetestStatus.ReadyForHtTest
            : PipetestStatus.Unknown;
    } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Insulation)) {
        return isCheckListStepsInRightOrder(checkLists, PipetestStatusOrder.ReadyForInsulation)
            ? PipetestStatus.ReadyForInsulation
            : PipetestStatus.Unknown;
    } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtRetest)) {
        return isCheckListStepsInRightOrder(checkLists, PipetestStatusOrder.ReadyForHtRetest)
            ? PipetestStatus.ReadyForHtRetest
            : PipetestStatus.Unknown;
    } else if (!isCheckListStepOk(checkLists, CheckListStepTag.Marking)) {
        return isCheckListStepsInRightOrder(checkLists, PipetestStatusOrder.ReadyForMarking)
            ? PipetestStatus.ReadyForMarking
            : PipetestStatus.Unknown;
    } else if (!isCheckListTestOk(checkLists, CheckListStepTag.HtTemporary)) {
        return PipetestStatus.Unknown;
    } else {
        return PipetestStatus.Complete;
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
    checkListStep: PipetestStatusOrder
): boolean {
    let rightOrder = true;

    checkLists = checkLists.filter((x) => getChecklistSortValue(x) > checkListStep);

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
            )
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

export function getPipetestStatusEnumByValue(enumValue: string): string {
    return Object.keys(PipetestStatus).filter((x) => PipetestStatus[x] === enumValue)[0];
}

export function getPipetestStatusSortValue(pipetest: Pipetest): number {
    let number: number = PipetestStatusOrder.Unknown;
    switch (pipetest.status) {
        case PipetestStatus.Unknown:
            number = PipetestStatusOrder.Unknown;
            break;
        case PipetestStatus.ReadyForBolttensioning:
            number = PipetestStatusOrder.ReadyForBolttensioning;
            break;
        case PipetestStatus.ReadyForPressureTest:
            number = PipetestStatusOrder.ReadyForPressureTest;
            break;
        case PipetestStatus.ReadyForPainting:
            number = PipetestStatusOrder.ReadyForPainting;
            break;
        case PipetestStatus.ReadyForHtTest:
            number = PipetestStatusOrder.ReadyForHtTest;
            break;
        case PipetestStatus.ReadyForInsulation:
            number = PipetestStatusOrder.ReadyForInsulation;
            break;
        case PipetestStatus.ReadyForHtRetest:
            number = PipetestStatusOrder.ReadyForHtRetest;
            break;
        case PipetestStatus.ReadyForMarking:
            number = PipetestStatusOrder.ReadyForMarking;
            break;
        case PipetestStatus.Complete:
            number = PipetestStatusOrder.Complete;
            break;
    }

    return number;
}

export function getPipetestStatusForStep(checkLists: CheckList[]): string {
    if (
        checkLists.every(
            (x) => x.status === CheckListStatus.OK || x.status === CheckListStatus.PunchBError
        )
    ) {
        return CheckListStatus.OK;
    } else if (checkLists.find((x) => x.status === CheckListStatus.Outstanding)) {
        {
            return CheckListStatus.Outstanding;
        }
    } else if (checkLists.find((x) => x.status === CheckListStatus.PunchAError)) {
        return CheckListStatus.PunchAError;
    } else {
        return CheckListStatus.OK;
    }
}

export const getYearAndWeekFromDate = (date: Date): string => {
    const dateTime = DateTime.local(date.getFullYear(), date.getMonth() + 1, date.getDate());
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
