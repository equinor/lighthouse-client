import { createChecklistSteps } from '../utils/helpers/tableHelpers';
import { testData1 } from '../Mock/mockData';

describe('tableHelpers tests', () => {
    it('should return 11 checklists with specific data', () => {
        const result = createChecklistSteps(testData1);
        expect(result.length).toStrictEqual(11);
        expect(
            result.every((x) => x.workflowStepText !== undefined && x.workflowStepText.length !== 0)
        ).toBeTruthy;
        expect(result.every((x) => x.status !== undefined && x.status.length !== 2)).toBeTruthy;
        expect(result[0].stepName === 'Pressure test').toBeTruthy;
        expect(result[10].stepName === 'Marking').toBeTruthy;
    });
});
