import { SelectedRowCallback } from '../hooks/useGardenApi';

interface GardenStates {
    getCurrentGroupByKeys: () => string[];
    getCustomGroupByKeys: () => Record<string, unknown>;
    getCustomState: () => Record<string, unknown>;
    getGardenKey: () => string;
    getSelectedItem: () => string | null;
}
interface GardenMutations {
    setGroupKeys: (groupKeys: string[]) => void;
    setSelectedItem: (callback: SelectedRowCallback | string) => void;
    setCustomGroupKeys: (groupKeys: Record<string, unknown>) => void;
    setGardenKey: (groupeKey?: string | undefined) => void;
    setCustomState: (customState: Record<string, unknown>) => void;
}
export interface GardenApi {
    mutations: GardenMutations;
    states: GardenStates;
}
