import { Atom } from '@dbeining/react-atom';

export interface GardenState {
    groupByKeys: string[];
    gardenKey: string;
    customGroupByKeys: Record<string, unknown>;
}

export const gardenStateSnapshotAtom = Atom.of<GardenState | null>(null);
