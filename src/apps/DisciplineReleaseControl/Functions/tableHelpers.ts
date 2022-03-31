import { CheckListStatus, CheckListStepTag, PipetestCompletionStatus } from '../Types/drcEnums';
import { CheckList, Pipetest } from '../Types/pipetest';
import { getPipetestStatusForStep } from './statusHelpers';

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

export function getHTList(checkLists: CheckList[]): string {
    let htList = '';
    const usedHts: string[] = [];
    let htCount = 0;
    checkLists
        .filter((x) => x.isHeatTrace)
        .forEach((ht: CheckList) => {
            if (htCount < 3 && !usedHts.some((x) => x === ht.tagNo)) {
                htList !== '' ? (htList += ', ') : null;
                htList += ht.tagNo;
            }
            if (!usedHts.some((x) => x === ht.tagNo)) {
                htCount = htCount += 1;
            }
            usedHts.push(ht.tagNo);
        });
    if (htCount > 3) {
        htList += ' (+' + (htCount - 3).toString() + ')';
    }
    return htList;
}

export function getPipetestsWithHTCable(pipetests: Pipetest[]): Pipetest[] {
    const pipetestsWithHTCable: Pipetest[] = [];
    pipetests.forEach((pipetest: Pipetest) => {
        if (pipetest.checkLists?.some((x) => x.isHeatTrace)) {
            pipetestsWithHTCable.push(pipetest);
        }
    });
    return pipetestsWithHTCable;
}

//TODO - refactor into more functions (3)
export function createChecklistSteps(data: CheckList[]): CheckList[] {
    const allWorkflowSteps = [
        CheckListStepTag.Bolttensioning,
        CheckListStepTag.PressureTest,
        CheckListStepTag.ChemicalCleaning,
        CheckListStepTag.HotOilFlushing,
        CheckListStepTag.Painting,
        CheckListStepTag.HtTest,
        CheckListStepTag.Insulation,
        CheckListStepTag.HtRetest,
        CheckListStepTag.Marking,
    ];
    const workflowSteps: CheckList[] = [];
    for (let i = 0; i < allWorkflowSteps.length; i++) {
        const foundSteps = data.filter((x) => x.tagNo.substring(0, 2) === allWorkflowSteps[i]);
        const htTestStep =
            allWorkflowSteps[i] === CheckListStepTag.HtTest ||
            allWorkflowSteps[i] === CheckListStepTag.HtRetest;
        const formularType =
            allWorkflowSteps[i] === CheckListStepTag.HtTest
                ? CheckListStepTag.HtTest
                : CheckListStepTag.HtRetest;
        if (foundSteps.length !== 0 && !htTestStep) {
            const workflowStep = foundSteps[0];
            workflowStep.status = getPipetestStatusForStep(foundSteps);
            workflowStep.workflowStepText = foundSteps[0]?.tagNo.substring(1, 2);
            workflowSteps.push(workflowStep);
        } else if (
            htTestStep &&
            data.some((x) => x.isHeatTrace) &&
            data.some((x) => x.formularType === formularType)
        ) {
            const foundTestSteps = data.filter((x) => x.formularType === formularType);
            const workflowStep: CheckList = {
                tagNo: '',
                responsible: '',
                formularGroup: '',
                formularType: '',
                status: getPipetestStatusForStep(foundTestSteps),
                isHeatTrace: true,
                revision: '',
                test: '',
                workflowStepText: formularType === CheckListStepTag.HtTest ? '1' : '2',
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
                workflowStepText: htTestStep
                    ? allWorkflowSteps[i] === CheckListStepTag.HtTest
                        ? '1'
                        : '2'
                    : allWorkflowSteps[i].substring(1, 2),
            });
        }
    }

    return workflowSteps;
}
