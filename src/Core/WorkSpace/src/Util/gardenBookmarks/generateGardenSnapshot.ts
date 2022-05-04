import { GardenApi } from '../../../../../components/ParkView/Components/VirtualGarden/Container';
import { GardenState } from './gardenStateSnapshotAtom';

export function generateGardenSnapshot(api: GardenApi): GardenState {
    const { getCurrentGroupByKeys, getCustomGroupByKeys, getGardenKey } = api.states;
    return {
        customGroupByKeys: getCustomGroupByKeys(),
        gardenKey: getGardenKey(),
        groupByKeys: getCurrentGroupByKeys(),
    };
}
