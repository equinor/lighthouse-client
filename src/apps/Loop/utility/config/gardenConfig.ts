import { sortByNumber } from '@equinor/GardenUtils';
import { FieldSettings, GardenOptions } from '@equinor/ParkView';
import { LoopGroupBySelect } from '../../components';
import { CustomGroupByKeys } from '../../types';
import { Loop } from '../../types/loop';
import { getDateKey } from '../helpers/getGroupByKey';
export type ExtendedGardenFields = 'c01' | 'c07';
export const fieldSettings: FieldSettings<Loop, ExtendedGardenFields> = {
    responsible: {
        label: 'Reponsible',
    },
    functionalSystem: {
        label: 'Functional system',
    },
    c01: {
        label: 'C01',
        getKey: getDateKey,
        getColumnSort: sortByNumber,
    },
    c07: {
        label: 'C07',
        getKey: getDateKey,
        getColumnSort: sortByNumber,
    },
};
const customGroupByKeys: CustomGroupByKeys = {
    plannedForecast: 'Planned',
    weeklyDaily: 'Weekly',
};
export const gardenConfig: GardenOptions<Loop> = {
    gardenKey: 'responsible',
    itemKey: 'loopNo',
    objectIdentifier: 'sourceIdentity',
    customGroupByKeys,
    fieldSettings,
    customViews: {
        customGroupByView: LoopGroupBySelect,
    },
};
