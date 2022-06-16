import { sortByNumber } from '@equinor/GardenUtils';
import { FieldSettings, GardenOptions } from '@equinor/ParkView';
import { LoopGroupBySelect } from '../../components';
import { CustomGroupByKeys } from '../../types';
import { Loop } from '../../types/loop';
import { getDateKey } from '../helpers/getGroupByKey';
export type ExtendedGardenFields = 'RFC' | 'RFO';
export const fieldSettings: FieldSettings<Loop, ExtendedGardenFields> = {
    responsible: {
        label: 'Reponsible',
    },
    functionalSystem: {
        label: 'Functional system',
    },
    RFC: {
        label: 'RFC',
        getKey: getDateKey,
        getColumnSort: sortByNumber,
    },
    RFO: {
        label: 'RFO',
        getKey: getDateKey,
        getColumnSort: sortByNumber,
    },
};
const customGroupByKeys: CustomGroupByKeys = {
    plannedForecast: 'Planned',
    weeklyDaily: 'Weekly',
};
export const gardenConfig: GardenOptions<Loop> = {
    gardenKey: 'RFC' as keyof Loop,
    itemKey: 'tagNo',
    objectIdentifier: 'checklistId',
    customGroupByKeys,
    fieldSettings,
    customViews: {
        customGroupByView: LoopGroupBySelect,
    },
};
