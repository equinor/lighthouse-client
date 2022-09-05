import { Atom } from '@dbeining/react-atom';

export interface GardenState {
    appKey: string;
    groupByKeys: string[];
    gardenKey: PropertyKey;
    customGroupByKeys: Record<string, unknown>;
}

export const gardenStateSnapshotAtom = Atom.of<GardenState | null>(null);
