import { deref } from '@dbeining/react-atom';
import { GardenOptions } from '@equinor/ParkView';
import { gardenStateSnapshotAtom } from './gardenStateSnapshotAtom';

export function interceptGardenOptions(
    gardenOptions: GardenOptions<unknown>
): GardenOptions<unknown> {
    const oldGardenState = deref(gardenStateSnapshotAtom);
    if (oldGardenState !== null) {
        return {
            ...gardenOptions,
            ...oldGardenState,
        } as GardenOptions<unknown>;
    } else {
        return gardenOptions as GardenOptions<unknown>;
    }
}
