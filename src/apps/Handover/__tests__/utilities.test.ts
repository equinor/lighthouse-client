import {
    getFieldKeyBasedOnPlannedForecast,
    getYearAndWeekAndDayFromString,
    getYearAndWeekFromDate,
    getYearAndWeekFromString,
} from '../Garden/utility';

describe('Get key functions', () => {
    test('getFieldKeyBasedOnPlannedForecast should return plannedFinishDate when no valid parameter', () => {
        const fieldKey = getFieldKeyBasedOnPlannedForecast('invalid', 'invalid');
        expect(fieldKey).toEqual('plannedFinishDate');
    });

    test('getFieldKeyBasedOnPlannedForecast should return forecast dates when second param is equal to forecast', () => {
        const rfocForecast = getFieldKeyBasedOnPlannedForecast('RFOC', 'Forecast');
        const rfccForecast = getFieldKeyBasedOnPlannedForecast('RFCC', 'Forecast');
        const tacForecast = getFieldKeyBasedOnPlannedForecast('TAC', 'Forecast');
        const dccForecast = getFieldKeyBasedOnPlannedForecast('DCC', 'Forecast');
        const rfrcForecast = getFieldKeyBasedOnPlannedForecast('RFRC', 'Forecast');

        expect(rfocForecast).toEqual('forecastFinishDate');
        expect(rfccForecast).toEqual('forecastStartDate');
        expect(tacForecast).toEqual('forecastTacDate');
        expect(dccForecast).toEqual('demolitionForecastStartDate');
        expect(rfrcForecast).toEqual('demolitionForecastFinishDate');
    });
    test('getFieldKeyBasedOnPlannedForecast should return planned dates when second param is equal to planned', () => {
        const rfocPlanned = getFieldKeyBasedOnPlannedForecast('RFOC', 'Planned');
        const rfccPlanned = getFieldKeyBasedOnPlannedForecast('RFCC', 'Planned');
        const tacPlanned = getFieldKeyBasedOnPlannedForecast('TAC', 'Planned');
        const dccPlanned = getFieldKeyBasedOnPlannedForecast('DCC', 'Planned');
        const rfrcPlanned = getFieldKeyBasedOnPlannedForecast('RFRC', 'Planned');

        expect(rfocPlanned).toEqual('plannedFinishDate');
        expect(rfccPlanned).toEqual('plannedStartDate');
        expect(tacPlanned).toEqual('plannedTacDate');
        expect(dccPlanned).toEqual('demolitionPlannedStartDate');
        expect(rfrcPlanned).toEqual('demolitionPlannedFinishDate');
    });

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
