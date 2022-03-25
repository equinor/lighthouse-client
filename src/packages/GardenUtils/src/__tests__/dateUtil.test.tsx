import { getYearAndWeekFromString } from '../dateUtils';
describe('Date utils', () => {
    it('should return N/A when argument is invalid date', () => {
        const expectedDate = 'N/A';
        const invalidTestDate = getYearAndWeekFromString('abc');

        expect(invalidTestDate).toBe(expectedDate);
    });
});
