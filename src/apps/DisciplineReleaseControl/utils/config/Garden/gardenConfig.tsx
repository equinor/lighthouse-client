import { FieldSettings, GardenOptions } from '@equinor/ParkView';

import ReleaseControlGardenGroupView from '../../../Components/Garden/ReleaseControlGardenGroupView';
import ReleaseControlGardenItem from '../../../Components/Garden/ReleaseControlGardenItem';
import { Pipetest } from '../../../Types/pipetest';
import {
    getSystemKey,
    groupBySystem,
    sortByNumber,
    sortByPipetestStatus,
} from '../../helpers/gardenFunctions';
import { getYearAndWeekFromDate, getYearAndWeekFromString } from '../../helpers/statusHelpers';
type ExtendedGardenFields = 'system' | 'dueAtDate' | 'priority';

export const drcGardenKeys = {
    defaultGardenKey: 'dueAtDate' as keyof Pipetest,
    electroGardenKey: 'htCableRfc' as keyof Pipetest,
};

export const fieldSettings: FieldSettings<Pipetest, ExtendedGardenFields> = {
    step: {
        label: 'Current step',
        getKey: (item) => item.step,
        getColumnSort: sortByPipetestStatus,
    },
    htStep: {
        label: 'Current step (HT)',
        getKey: (item) => item.htStep,
        getColumnSort: sortByPipetestStatus,
    },
    system: { label: 'System', getKey: getSystemKey, getColumnSort: groupBySystem },
    heatTraces: {
        label: 'HT cable',
        key: 'tagNo',
    },
    dueAtDate: {
        label: 'Piping RFC',
        getKey: (item) => getYearAndWeekFromString(item.rfccPlanned),
        getColumnSort: sortByNumber,
    },
    priority: { label: 'Priority', getKey: (item) => item.commPkPriority1 },
    dueDateTimePeriod: { label: 'Time period', getKey: (item) => item.dueDateTimePeriod },
    htCableRfc: {
        label: 'HT cable RFC',
        getKey: (item) => getYearAndWeekFromString(item.htCableRfc),
        getColumnSort: sortByNumber,
    },
};

export const getHighlightedColumn = (groupByKey: string) => {
    switch (groupByKey) {
        case 'dueAtDate':
            return getYearAndWeekFromDate(new Date());
        default:
            return undefined;
    }
};
export const gardenConfig: GardenOptions<Pipetest> = {
    gardenKey: drcGardenKeys.defaultGardenKey,
    itemKey: 'name',
    objectIdentifier: 'name',
    fieldSettings: fieldSettings,
    collapseSubGroupsByDefault: true,
    customViews: {
        customItemView: ReleaseControlGardenItem,
        customGroupView: ReleaseControlGardenGroupView,
    },
    highlightColumn: getHighlightedColumn,
    itemWidth: () => 170,
    rowHeight: 26,
};
