import { getSubtitleHeader } from '../Garden/utility/getSubtitleHeader';
import { groupedWorkOrder } from '../Mock/groupedWorkorder';

describe('getSubtitleHeader', () => {
    it('should return null when groupBy is not equal to hwp', () => {
        const subHeader = getSubtitleHeader(groupedWorkOrder, 0, false, 'wp');

        expect(subHeader).toBeFalsy();
    });

    it('should return a string when groupBy is equal to hwp', () => {
        const subHeader = getSubtitleHeader(groupedWorkOrder, 0, false, 'hwp');

        expect(subHeader).toBeTruthy();
    });
    it('should return sum of remaining hours for a group', () => {
        const subHeader = getSubtitleHeader(groupedWorkOrder, 0, false, 'hwp');

        expect(subHeader).toEqual('R: 88.00h');
    });

    it("should return sum of remaining hours for a group and accumulate everything behind in time when it's the highlighted column", () => {
        const subHeader = getSubtitleHeader(groupedWorkOrder, 1, false, 'hwp');

        expect(subHeader).toEqual('R: 98.00h');
    });

    it(`should return sum of remaining hours for a group, and accumulate everything behind in time,
     	and show current group's summed estimated hours + the rest when it's the highlighted column and it's expanded`, () => {
        const subHeader = getSubtitleHeader(groupedWorkOrder, 1, true, 'hwp');

        expect(subHeader).toEqual('R: 10.00h + 88.00h');
    });
});
