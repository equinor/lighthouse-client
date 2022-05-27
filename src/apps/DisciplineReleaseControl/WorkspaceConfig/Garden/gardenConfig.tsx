import { GardenOptions } from '@equinor/ParkView';
import {
    drcGardenKeys,
    fieldSettings,
    getHighlightedColumn,
} from '../../Components/Garden/gardenSetup';
import ReleaseControlGardenGroupView from '../../Components/Garden/ReleaseControlGardenGroupView';
import ReleaseControlGardenItem from '../../Components/Garden/ReleaseControlGardenItem';
import { Pipetest } from '../../Types/pipetest';

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
    itemWidth: () => 150,
    rowHeight: 25,
};
