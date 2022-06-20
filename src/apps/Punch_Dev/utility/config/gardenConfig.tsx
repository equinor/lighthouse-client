import { GardenOptions } from '@equinor/ParkView';
import { Punch } from '../../types/punch';

export const gardenConfig: GardenOptions<Punch> = {
    gardenKey: 'punchItemCategory',
    itemKey: 'punchItemNo',
    objectIdentifier: 'punchItemNo',
    fieldSettings: {},
};
