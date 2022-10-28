import { getDateKey, getFieldKeyBasedOnPlannedForecast } from '../Garden/utility';
import { handoverPackage } from '../Mock/mockData';

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

    test('getDateKey should return N/A when given invalid arguments', () => {
        const invalidKey = getDateKey(handoverPackage, 'invalid', {
            plannedForecast: 'Planned',
            weeklyDaily: 'Weekly',
        });

        expect(invalidKey).toEqual('N/A');
    });

    test('getDateKey should return correct date when given valid grouping key as argument', () => {
        const result = getDateKey(handoverPackage, 'RFCC', {
            plannedForecast: 'Forecast',
            weeklyDaily: 'Weekly',
        });
        expect(result).toEqual('2022-52');
    });
});
