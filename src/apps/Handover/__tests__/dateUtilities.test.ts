import {
    getYearAndWeekAndDayFromString,
    getYearAndWeekFromDate,
    getYearAndWeekFromString,
} from '../Garden/utility';

describe('Date utilities', () => {
    test('getYearAndWeekAndDayFromString should return given date in correct format', () => {
        const dateString = 'Wed Aug 24 2022';
        const expected = '2022-8-24';

        const result = getYearAndWeekAndDayFromString(dateString);
        expect(result).toEqual(expected);
    });

    test('getYearAndWeekAndDayFromString should return N/A when given date is invalid', () => {
        const invalidDate = '';
        const expected = 'N/A';

        const result = getYearAndWeekAndDayFromString(invalidDate);
        expect(result).toEqual(expected);
    });

    test('getYearAndWeekFromDate should return given date in correct format', () => {
        const inputDate = new Date(
            'Wed Aug 24 2022 10:34:33 GMT+0200 (Central European Summer Time)'
        );
        const expected = '2022-34';

        const result = getYearAndWeekFromDate(inputDate);
        expect(result).toEqual(expected);
    });

    test('getYearANdWeekFromString should return given date in correct format', () => {
        const inputDate = 'Wed Aug 24 2022 10:34:33 GMT+0200 (Central European Summer Time)';
        const expected = '2022-34';
        const result = getYearAndWeekFromString(inputDate);
        expect(result).toEqual(expected);
    });

    test('getYearAndWeekFromString should return N/A if given date is invalid', () => {
        const invalidDate = '';
        const expected = 'N/A';
        const result = getYearAndWeekAndDayFromString(invalidDate);
        expect(result).toEqual(expected);
    });
});
