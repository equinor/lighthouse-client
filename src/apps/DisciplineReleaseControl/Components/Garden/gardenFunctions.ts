import { DateTime } from 'luxon';
import { GetKeyFunction } from '../../../../components/ParkView/Models/fieldSettings';
import { getPipetestStatus, getPipetestStatusEnumByValue } from '../../Functions/statusHelpers';
import { PipetestStep, PipetestStatusOrder } from '../../Types/drcEnums';
import { Pipetest } from '../../Types/pipetest';

export const getStatusKey: GetKeyFunction<Pipetest> = (item) => {
    const pipetestStatusFieldKey = getPipetestStatus(item.checkLists);
    return pipetestStatusFieldKey.toString();
};

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

export const getGardenItemColor = (item: Pipetest): string => {
    let color = '#D3D3D3';

    switch (item.step) {
        case PipetestStep.ReadyForBolttensioning:
            color = '#6d889a';
            break;
        case PipetestStep.ReadyForPressureTest:
            color = '#a8c8de';
            break;
        case PipetestStep.ReadyForPainting:
            color = '#dcdcdc';
            break;
        case PipetestStep.ReadyForHtTest:
            color = '#ffe7d6';
            break;
        case PipetestStep.ReadyForInsulation:
            color = '#73b1b5';
            break;
        case PipetestStep.ReadyForHtRetest:
            color = '#ffc67a';
            break;
        case PipetestStep.ReadyForMarking:
            color = '#e6faec';
            break;
        case PipetestStep.Complete:
            color = '#4bb748';
            break;
        case PipetestStep.Unknown:
            color = '#ff92a8';
            break;
    }

    return color;
};
