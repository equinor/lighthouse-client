import { DateTime } from 'luxon';
import { getPipetests } from '../Components/Electro/getPipetests';
import { getTimePeriod } from '../Components/Garden/gardenFunctions';
import { PipetestCompletionStatusColors } from '../Styles/ReleaseControlColors';
import {
    CheckListStatus,
    PipetestCheckListOrder,
    PipetestStep,
    PipetestStatusOrder,
    CheckListStepTag,
    PipetestCompletionStatus,
} from '../Types/drcEnums';
import { CheckList, Circuit, InsulationBox, Pipetest } from '../Types/pipetest';

export async function fetchAndChewPipetestDataFromApi(): Promise<Pipetest[]> {
    let data = await getPipetests();
    data = chewPipetestDataFromApi(data);
    return data;
}

export function chewPipetestDataFromApi(pipetests: Pipetest[]): Pipetest[] {
    pipetests.map((pipetest: Pipetest) => {
        pipetest.circuits?.forEach((circuit: Circuit) => {
            circuit.checkLists?.forEach((checkList: CheckList) => {
                checkList.formularType = CheckListStepTag.HtCTest;
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
    pipetests = setPipingRfcUniqueHTDate(pipetests);
    sortPipetests(pipetests);
    return pipetests;
}

export function setPipingRfcUniqueHTDate(pipetests: Pipetest[]): Pipetest[] {
    const htGroupedByPipetest = heatTracesGroupedByPipetest(pipetests);
    htGroupedByPipetest.map((ht) => {
        ht.children.sort((a, b) =>
            a.rfccPlanned.localeCompare(b.rfccPlanned, undefined, {
                numeric: true,
                sensitivity: 'base',
            })
        );
        ht.earliestRfcDate = ht.children[0].rfccPlanned;
        return ht;
    });

    pipetests.map((pipetest: Pipetest) => {
        const htCablesOnPipetest = pipetest.heatTraces;
        const htCableDates: string[] = [];
        htCablesOnPipetest.forEach((ht) => {
            const htCable = htGroupedByPipetest.find((z) => z.name === ht.tagNo);
            if (htCable !== undefined && htCable.earliestRfcDate !== '') {
                htCableDates.push(htCable.earliestRfcDate);
            }
        });
        htCableDates.sort((a, b) =>
            a.localeCompare(b, undefined, {
                numeric: true,
                sensitivity: 'base',
            })
        );

        pipetest.pipingRfcUniqueHT = htCableDates[0];
        return pipetest;
    });

    return pipetests;
}

function getPipeTestByHeatTrace(groupName: string, pipetest: Pipetest[]) {
    const pipetestChildren = pipetest.filter(
        (pipetest, index, array) =>
            pipetest.heatTraces.some((y) => y.tagNo === groupName) &&
            array.indexOf(pipetest) === index
    );
    return {
        name: groupName,
        children: pipetestChildren,
        count: pipetestChildren.length,
        earliestRfcDate: '',
    };
}

export function heatTracesGroupedByPipetest(pipetests: Pipetest[]) {
    const heatTracesGroupedByPipetest = pipetests
        .reduce(
            (prev: CheckList[], curr) => [
                ...prev,
                ...curr.heatTraces.filter((ht) => !prev.includes(ht)),
            ],
            []
        )
        .map((groupName) => getPipeTestByHeatTrace(groupName.tagNo, pipetests));

    /** Pipetest that has no heatTraces */
    const pipetestChildren = pipetests.filter(({ heatTraces }) => heatTraces.length === 0);

    heatTracesGroupedByPipetest.push({
        name: 'No heatTraces',
        children: pipetestChildren,
        count: pipetestChildren.length,
        earliestRfcDate: '',
    });

    return heatTracesGroupedByPipetest;
}

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
        if (checkList.formularType === CheckListStepTag.HtTest) {
            number = PipetestCheckListOrder.HtTest;
        } else if (checkList.formularType === CheckListStepTag.HtRetest) {
            number = PipetestCheckListOrder.HtRetest;
        } else if (checkList.formularType === CheckListStepTag.HtCTest) {
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

    if (
        pipetest.checkLists.some((x) => x.tagNo.substring(0, 2) === CheckListStepTag.PressureTest)
    ) {
        pipetestSteps.push(PipetestStep.PressureTest);
    }
    if (
        pipetest.checkLists.some(
            (x) => x.tagNo.substring(0, 2) === CheckListStepTag.ChemicalCleaning
        )
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
    if (pipetest.checkLists.some((x) => x.formularType === CheckListStepTag.HtTest)) {
        pipetestSteps.push(PipetestStep.HtTest);
    }
    if (pipetest.checkLists.some((x) => x.tagNo.substring(0, 2) === CheckListStepTag.Insulation)) {
        pipetestSteps.push(PipetestStep.Insulation);
    }
    if (pipetest.insulationBoxes.length !== 0) {
        pipetestSteps.push(PipetestStep.BoxInsulation);
    }
    if (pipetest.checkLists.some((x) => x.formularType === CheckListStepTag.HtRetest)) {
        pipetestSteps.push(PipetestStep.HtRetest);
    }
    if (pipetest.checkLists.some((x) => x.formularType === CheckListStepTag.HtCTest)) {
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
