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
    intercepters: {
        postGroupSorting: (data) =>
            data.map((group) => ({
                ...group,
                items: group.items.sort((a, b) => a.sequenceNumber - b.sequenceNumber),
            })),
        preGroupFiltering: (data, key) =>
            key === 'originSource'
                ? data.filter(({ sequenceNumber }) => sequenceNumber > 200)
                : data,
    },
};
