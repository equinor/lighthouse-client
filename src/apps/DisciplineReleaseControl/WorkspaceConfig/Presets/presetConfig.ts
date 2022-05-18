import { PresetOption } from '@equinor/WorkSpace';
import { drcGardenKeys } from '../../Components/Garden/gardenSetup';

export const presetConfig: PresetOption[] = [
    {
        name: 'HT cables',
        type: 'garden',
        filter: {
            filterGroups: [
                {
                    name: 'Switchboard',
                    values: [null, ''],
                },
                {
                    name: 'Circuit',
                    values: [null, ''],
                },
            ],
        },
        garden: {
            gardenKey: drcGardenKeys.electroGardenKey,
            groupByKeys: ['heatTraces'],
        },
    },
    {
        name: 'Pipetest',
        type: 'garden',
        filter: {
            filterGroups: [],
        },
        garden: {
            gardenKey: drcGardenKeys.defaultGardenKey,
        },
    },
];
