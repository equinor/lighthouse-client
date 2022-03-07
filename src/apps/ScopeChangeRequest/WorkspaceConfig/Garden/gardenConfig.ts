import { GardenOptions } from '../../../../components/ParkView/Models/gardenOptions';
import { ScopeChangeItemView } from './ScopeChangeGardenItem';
import { ScopeChangeRequest } from '../../Types/scopeChangeRequest';

export const gardenConfig: GardenOptions<ScopeChangeRequest> = {
    gardenKey: 'originSource',
    itemKey: 'sequenceNumber',
    fieldSettings: {},
    customViews: {
        customItemView: ScopeChangeItemView,
    },
};
