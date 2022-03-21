import { GetKeyFunction } from '../../../../components/ParkView/Models/fieldSettings';
import { getPipetestStatus } from '../../Functions/statusHelpers';
import { PipetestStatus, PipetestStatusOrder } from '../../Types/drcEnums';
import { Pipetest } from '../../Types/pipetest';

export function getPipetestStatusEnumByValue(enumValue: string): string {
    return Object.keys(PipetestStatus).filter((x) => PipetestStatus[x] == enumValue)[0];
}

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

export const getGardenItemColor = (item: Pipetest): string => {
    let color = '#D3D3D3';

    switch (item.status) {
        case PipetestStatus.ReadyForBolttensioning:
            color = '#6d889a';
            break;
        case PipetestStatus.ReadyForPressureTest:
            color = '#a8c8de';
            break;
        case PipetestStatus.ReadyForPainting:
            color = '#dcdcdc';
            break;
        case PipetestStatus.ReadyForHtTest:
            color = '#ffe7d6';
            break;
        case PipetestStatus.ReadyForInsulation:
            color = '#73b1b5';
            break;
        case PipetestStatus.ReadyForHtRetest:
            color = '#ffc67a';
            break;
        case PipetestStatus.ReadyForMarking:
            color = '#e6faec';
            break;
        case PipetestStatus.Complete:
            color = '#4bb748';
            break;
        case PipetestStatus.Unknown:
            color = '#ff92a8';
            break;
    }

    return color;
};
