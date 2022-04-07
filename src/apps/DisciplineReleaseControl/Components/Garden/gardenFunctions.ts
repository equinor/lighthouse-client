import { DateTime } from 'luxon';
import { GetKeyFunction } from '../../../../components/ParkView/Models/fieldSettings';
import { getPipetestStatus, getPipetestStatusEnumByValue } from '../../Functions/statusHelpers';
import { PipetestCompletionStatusColors } from '../../Styles/ReleaseControlColors';
import { PipetestStep, PipetestStatusOrder, PipetestCompletionStatus } from '../../Types/drcEnums';
import { Pipetest } from '../../Types/pipetest';

export const getStatusKey: GetKeyFunction<Pipetest> = (item) => {
    const pipetestStatusFieldKey = getPipetestStatus(item);
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

export const sortByNumber = (a: string, b: string): number =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });

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

export const getGardenItemColor = (step: string | undefined): string => {
    let color = '#D3D3D3';

    switch (step) {
        case PipetestStep.PressureTest:
            color = '#a8c8de';
            break;
        case PipetestStep.ChemicalCleaning:
            color = '#A8C8DE';
            break;
        case PipetestStep.HotOilFlushing:
            color = '#D9E9F2';
            break;
        case PipetestStep.Bolttensioning:
            color = '#6d889a';
            break;
        case PipetestStep.Painting:
            color = '#dcdcdc';
            break;
        case PipetestStep.HtTest:
            color = '#ffe7d6';
            break;
        case PipetestStep.Insulation:
            color = '#73b1b5';
            break;
        case PipetestStep.BoxInsulation:
            color = '#A8CED1';
            break;
        case PipetestStep.HtRetest:
            color = '#ffc67a';
            break;
        case PipetestStep.HtCTest:
            color = '#DCAB6A';
            break;
        case PipetestStep.Marking:
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

export const getGardenItemCompletionColor = (item: Pipetest): string => {
    let color = '#DCDCDC';

    switch (item.completionStatus) {
        case PipetestCompletionStatus.Outstanding:
            color = PipetestCompletionStatusColors.OS;
            break;
        case PipetestCompletionStatus.Complete:
            color = PipetestCompletionStatusColors.OK;
            break;
        case PipetestCompletionStatus.PunchBError:
            color = PipetestCompletionStatusColors.PB;
            break;
        case PipetestCompletionStatus.PunchAError:
            color = PipetestCompletionStatusColors.PA;
            break;
    }

    return color;
};
