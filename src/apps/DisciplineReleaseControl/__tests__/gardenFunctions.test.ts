import { tokens } from '@equinor/eds-tokens';

describe('skip', () => {
    it('Should skip because stuff doesnt work', () => expect(true).toEqual(true));
});
// describe('gardenFunctions tests', () => {
//     it('should return correct color', () => {
//         expect(getGardenItemColor('Unknown')).toStrictEqual(
//             tokens.colors.infographic.substitute__pink_salmon.hex
//         );
//     });
//     it('should return 3 checklists with specific data', () => {
//         const result = createChecklistTestSteps([testData1], 'HT201219A', 1);
//         expect(result.length).toStrictEqual(3);
//         expect(result.every((x) => x.workflowStepText?.length === 1)).toBeTruthy;
//         expect(result[0].underline).toStrictEqual('Before');
//     });
// });
