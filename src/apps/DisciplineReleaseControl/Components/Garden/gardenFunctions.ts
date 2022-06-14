import { tokens } from '@equinor/eds-tokens';
import { GetKeyFunction } from '@equinor/ParkView';
import { DateTime } from 'luxon';
import {
    getChecklistStepName,
    getPipetestStatusEnumByValue,
    getPipetestStatusForStep,
    getPipetestStatusSortValue,
} from '../../Functions/statusHelpers';
import { PipetestCompletionStatusColors } from '../../Styles/ReleaseControlColors';
import {
    PipetestStep,
    PipetestStatusOrder,
    PipetestCompletionStatus,
    CheckListStepTag,
    CheckListStatus,
} from '../../Types/drcEnums';
import { CheckList, Pipetest } from '../../Types/pipetest';

export const sortByPipetestStatus = (a: string, b: string): number => {
    return PipetestStatusOrder[getPipetestStatusEnumByValue(a)]
        ?.toString()
        ?.localeCompare(
            PipetestStatusOrder[getPipetestStatusEnumByValue(b)].toString(),
            undefined,
            {
                numeric: true,
                sensitivity: 'base',
            }
        );
};

export const getSystemKey: GetKeyFunction<Pipetest> = (item) => {
    return item.name.substring(0, 2);
};

export const groupBySystem = (a: string, b: string): number => {
    return a.toString().localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base',
    });
};

export const sortByNumber = (a: string, b: string): number =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

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

export const getGardenItemColor = (step: string | undefined): string => {
    let color = '#D3D3D3';

    switch (step) {
        case PipetestStep.PressureTest:
            color = '#6D889A';
            break;
        case PipetestStep.ChemicalCleaning:
            color = '#A8C8DE';
            break;
        case PipetestStep.HotOilFlushing:
            color = '#D9E9F2';
            break;
        case PipetestStep.Bolttensioning:
            color = '#F7F7F7';
            break;
        case PipetestStep.Painting:
            color = tokens.colors.ui.background__medium.hex;
            break;
        case PipetestStep.HtTest:
            color = '#FFE7D6';
            break;
        case PipetestStep.Insulation:
            color = tokens.colors.infographic.primary__moss_green_55.hex;
            break;
        case PipetestStep.BoxInsulation:
            color = tokens.colors.infographic.primary__moss_green_34.hex;
            break;
        case PipetestStep.HtRetest:
            color = '#FFC67A';
            break;
        case PipetestStep.HtCTest:
            color = '#DCAB6A';
            break;
        case PipetestStep.Marking:
            color = tokens.colors.interactive.table__cell__fill_activated.hex;
            break;
        case PipetestStep.Complete:
            color = tokens.colors.interactive.success__resting.hex;
            break;
        case PipetestStep.Unknown:
            color = tokens.colors.infographic.substitute__pink_salmon.hex;
            break;
    }

    return color;
};

export const getGardenItemCompletionColor = (completionStatus: string): string => {
    let color = '#DCDCDC';

    switch (completionStatus) {
        case PipetestCompletionStatus.Outstanding:
            color = PipetestCompletionStatusColors.OS;
            break;
        case PipetestCompletionStatus.Complete:
            color = PipetestCompletionStatusColors.OK;
            break;
        case PipetestCompletionStatus.PunchBError:
            color = PipetestCompletionStatusColors.PB;
            break;
        case PipetestCompletionStatus.PunchAError:
            color = PipetestCompletionStatusColors.PA;
            break;
    }

    return color;
};

export function getGardenContentColor(step: string): string {
    let color;

    switch (step) {
        case PipetestStep.PressureTest:
            color = tokens.colors.text.static_icons__primary_white.hex;
            break;
        case PipetestStep.ChemicalCleaning:
            color = tokens.colors.text.static_icons__default.hex;
            break;
        case PipetestStep.HotOilFlushing:
            color = tokens.colors.text.static_icons__default.hex;
            break;
        case PipetestStep.Bolttensioning:
            color = tokens.colors.text.static_icons__default.hex;
            break;
        case PipetestStep.Painting:
            color = tokens.colors.text.static_icons__default.hex;
            break;
        case PipetestStep.HtTest:
            color = tokens.colors.text.static_icons__default.hex;
            break;
        case PipetestStep.Insulation:
            color = tokens.colors.text.static_icons__primary_white.hex;
            break;
        case PipetestStep.BoxInsulation:
            color = tokens.colors.text.static_icons__primary_white.hex;
            break;
        case PipetestStep.HtRetest:
            color = tokens.colors.text.static_icons__default.hex;
            break;
        case PipetestStep.HtCTest:
            color = tokens.colors.text.static_icons__default.hex;
            break;
        case PipetestStep.Marking:
            color = tokens.colors.text.static_icons__default.hex;
            break;
        case PipetestStep.Complete:
            color = tokens.colors.text.static_icons__default.hex;
            break;
        case PipetestStep.Unknown:
            color = tokens.colors.text.static_icons__default.hex;
            break;
        default:
            color = tokens.colors.text.static_icons__default.hex;
    }

    return color;
}

export function createChecklistTestSteps(
    pipetests: Pipetest[],
    htCable: string,
    statusValue: PipetestStatusOrder
): CheckList[] {
    const allWorkflowSteps = [
        CheckListStepTag.HtTest,
        CheckListStepTag.HtRetest,
        CheckListStepTag.HtCTest,
    ];
    const checkLists = pipetests[0].checkLists.filter((x) => x.tagNo === htCable);
    const cChecklists = pipetests.map((x) => {
        return x.checkLists.filter((y) => y.formularType.startsWith(CheckListStepTag.HtCTest));
    });
    const cTestChecklists = Array.prototype.concat.apply([], cChecklists);

    const workflowSteps: CheckList[] = [];
    for (let i = 0; i < allWorkflowSteps.length; i++) {
        const formularType =
            allWorkflowSteps[i] === CheckListStepTag.HtTest
                ? CheckListStepTag.HtTest
                : allWorkflowSteps[i] === CheckListStepTag.HtRetest
                ? CheckListStepTag.HtRetest
                : CheckListStepTag.HtCTest;

        const underline = shouldHaveUnderline(statusValue, allWorkflowSteps[i]);
        const emptyWorkflowStep = {} as CheckList;
        const foundTestSteps = checkLists.filter((x) => x.formularType.startsWith(formularType));
        if (formularType === CheckListStepTag.HtCTest && cTestChecklists.length !== 0) {
            const workflowStep: CheckList = {
                ...emptyWorkflowStep,
                status: getPipetestStatusForStep(cTestChecklists),
                isHeatTrace: true,
                stepName: getChecklistStepName(allWorkflowSteps[i]),
                underline: underline,
            };
            workflowSteps.push(workflowStep);
        } else if (foundTestSteps.length !== 0 && formularType !== CheckListStepTag.HtCTest) {
            const workflowStep: CheckList = {
                ...emptyWorkflowStep,
                status: getPipetestStatusForStep(foundTestSteps),
                isHeatTrace: true,
                workflowStepText: formularType.startsWith(CheckListStepTag.HtTest)
                    ? 'A'
                    : formularType.startsWith(CheckListStepTag.HtRetest)
                    ? 'B'
                    : 'C',
                stepName: getChecklistStepName(allWorkflowSteps[i]),
                underline: underline,
            };
            workflowSteps.push(workflowStep);
        } else {
            workflowSteps.push({
                ...emptyWorkflowStep,
                tagNo: allWorkflowSteps[i],
                status: CheckListStatus.Inactive,
                isHeatTrace: false,
                workflowStepText:
                    allWorkflowSteps[i] === CheckListStepTag.HtTest
                        ? 'A'
                        : allWorkflowSteps[i] === CheckListStepTag.HtRetest
                        ? 'B'
                        : 'C',
                stepName: getChecklistStepName(allWorkflowSteps[i]),
                underline: underline,
            });
        }
    }

    return workflowSteps;
}

export function getPipetestStatusValueForHTCable(pipetests: Pipetest[]): PipetestStatusOrder {
    const statusValues = pipetests.map((x) => getPipetestStatusSortValue(x));
    return statusValues.reduce((a, b) => Math.min(a, b));
}

export function shouldHaveUnderline(
    statusValue: PipetestStatusOrder,
    step: CheckListStepTag
): string {
    if (step === CheckListStepTag.HtTest) {
        if (statusValue < PipetestStatusOrder.HtTest) {
            return 'Before';
        } else if (statusValue === PipetestStatusOrder.HtTest) {
            return 'Underline';
        } else if (
            statusValue > PipetestStatusOrder.HtTest &&
            statusValue < PipetestStatusOrder.HtRetest
        ) {
            return 'After';
        }
    }
    if (step === CheckListStepTag.HtRetest) {
        if (statusValue === PipetestStatusOrder.HtRetest) {
            return 'Underline';
        } else if (
            statusValue > PipetestStatusOrder.HtRetest &&
            statusValue < PipetestStatusOrder.HtCTest
        ) {
            return 'After';
        }
    }
    if (step === CheckListStepTag.HtCTest) {
        if (statusValue === PipetestStatusOrder.HtCTest) {
            return 'Underline';
        }
    }
    return '';
}
