import { GardenApi } from '../../../../../../components/ParkView/Models/gardenApi';
import { GardenState } from './gardenStateSnapshotAtom';

export function generateGardenSnapshot(api: GardenApi, name: string): GardenState {
    const { getCurrentGroupByKeys, getCustomGroupByKeys, getGardenKey } = api.states;
    return {
        appKey: name,
        customGroupByKeys: getCustomGroupByKeys(),
        gardenKey: getGardenKey(),
        groupByKeys: getCurrentGroupByKeys(),
    };
}
