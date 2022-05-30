import { deref } from '@dbeining/react-atom';
import { GardenOptions } from '@equinor/ParkView';
import { gardenStateSnapshotAtom } from './gardenStateSnapshotAtom';

export function interceptGardenOptions(
    gardenOptions: GardenOptions<unknown>,
    name: string
): GardenOptions<unknown> {
    const oldGardenState = deref(gardenStateSnapshotAtom);
    if (oldGardenState !== null && name === oldGardenState.appKey) {
        return {
            ...gardenOptions,
            customGroupByKeys: oldGardenState.customGroupByKeys,
            groupByKeys: oldGardenState.groupByKeys,
            gardenKey: oldGardenState.gardenKey,
        } as GardenOptions<unknown>;
    } else {
        return gardenOptions as GardenOptions<unknown>;
    }
}
