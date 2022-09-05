import { deref } from '@dbeining/react-atom';
import { GardenOptions } from '@equinor/ParkView';
import { gardenStateSnapshotAtom } from './gardenStateSnapshotAtom';

export const interceptGardenOptions = <
    T extends Record<PropertyKey, unknown> = Record<PropertyKey, unknown>
>(
    gardenOptions: GardenOptions<T>,
    name: string
): GardenOptions<T> => {
    const oldGardenState = deref(gardenStateSnapshotAtom);
    if (oldGardenState !== null && name === oldGardenState.appKey) {
        return {
            ...gardenOptions,
            customGroupByKeys: oldGardenState.customGroupByKeys,
            groupByKeys: oldGardenState.groupByKeys,
            gardenKey: oldGardenState.gardenKey,
        };
    } else {
        return gardenOptions;
    }
};
