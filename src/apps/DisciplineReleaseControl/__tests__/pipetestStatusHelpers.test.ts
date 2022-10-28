import {
    getBoxInsulationStatus,
    getChecklistSortValue,
    getHTCableRfc,
    getPipetestCompletionStatus,
    getPipetestStatus,
    getPipetestStatusEnumByValue,
    getPipetestSteps,
    isBoxInsulationOk,
    isCheckListGroupOk,
    isCheckListStepOk,
    isCheckListStepsInRightOrder,
    isCheckListTestOk,
    isPipetestProcessDoneInRightOrder,
} from '../utils/helpers/statusHelpers';
import { testData1 } from '../Mock/mockData';
import {
    CheckListStatus,
    CheckListStepTag,
    PipetestCheckListOrder,
    PipetestCompletionStatus,
    PipetestStatusOrder,
    PipetestStep,
} from '../Types/drcEnums';

describe('statusHelpers tests', () => {
    it('should return pressure test as status because it is the current step', () => {
        expect(getPipetestStatus(testData1)).toStrictEqual(PipetestStep.PressureTest);
    });
    it('should return specific value as htCableRfc', () => {
        expect(getHTCableRfc(testData1.checkLists.filter((x) => x.isHeatTrace))).toStrictEqual(
            '2022-11-10T00:00:00+00:00'
        );
    });
    it('should return b-test sort value from ELE19.2 checklists', () => {
        expect(
            getChecklistSortValue(
                testData1.checkLists.filter((x) => x.formularType === 'ELE19.2JCA')[0]
            )
        ).toStrictEqual(PipetestCheckListOrder.HtRetest);
    });
    it('should return false (not in right order)', () => {
        expect(isPipetestProcessDoneInRightOrder(testData1)).toStrictEqual(false);
    });
    it('should return c-test checklists test step is not ok', () => {
        expect(isCheckListTestOk(testData1.checkLists, CheckListStepTag.HtCTest)).toStrictEqual(
            false
        );
    });
    it('should return pressure test checklists test step is not ok (A punch)', () => {
        expect(
            isCheckListStepOk(testData1.checkLists, CheckListStepTag.PressureTest)
        ).toStrictEqual(false);
    });
    it('should return specific steps', () => {
        const result = getPipetestSteps(testData1);
        expect(result).toHaveLength(9);
        expect(result).not.toContain(PipetestStep.Unknown);
        expect(result).not.toContain(PipetestStep.ChemicalCleaning);
        expect(result).not.toContain(PipetestStep.HotOilFlushing);
    });
    it('should return false - not in correct order', () => {
        expect(
            isCheckListStepsInRightOrder(
                testData1.checkLists,
                PipetestStatusOrder.HtTest,
                testData1.insulationBoxes
            )
        ).toStrictEqual(false);
    });
    it('should return true - checklist group is ok', () => {
        expect(
            isCheckListGroupOk(
                testData1.checkLists.filter(
                    (x) => x.tagNo.substring(0, 2) === CheckListStepTag.Bolttensioning
                )
            )
        ).toStrictEqual(true);
    });
    it('should return true - checklist group is ok (B-punch is ok)', () => {
        expect(
            isCheckListGroupOk(
                testData1.checkLists.filter(
                    (x) => x.tagNo.substring(0, 2) === CheckListStepTag.Painting
                )
            )
        ).toStrictEqual(true);
    });
    it('should return false - checklist group is not ok', () => {
        expect(
            isCheckListGroupOk(
                testData1.checkLists.filter(
                    (x) => x.tagNo.substring(0, 2) === CheckListStepTag.PressureTest
                )
            )
        ).toStrictEqual(false);
    });
    it('should return false - insulation boxes group is not ok', () => {
        expect(isBoxInsulationOk(testData1.insulationBoxes)).toStrictEqual(false);
    });
    it('should return outstanding (worst - worse than A-punch) completion status', () => {
        expect(getPipetestCompletionStatus(testData1)).toStrictEqual(
            PipetestCompletionStatus.Outstanding
        );
    });
    it('should return correct PipetestStatus from enum value', () => {
        expect(getPipetestStatusEnumByValue('B-test')).toStrictEqual('HtRetest');
    });
    it('should return outstanding completion status', () => {
        expect(getBoxInsulationStatus(testData1)).toStrictEqual(CheckListStatus.Outstanding);
    });
});
