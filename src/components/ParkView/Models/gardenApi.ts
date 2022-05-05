interface GardenStates {
    getCurrentGroupByKeys: () => string[];
    getCustomGroupByKeys: () => Record<string, unknown>;
    getCustomState: () => Record<string, unknown>;
    getGardenKey: () => string;
}
interface GardenMutations {
    setGroupKeys: (groupKeys: string[]) => void;
    setCustomGroupKeys: (groupKeys: Record<string, unknown>) => void;
    setGardenKey: (groupeKey?: string | undefined) => void;
    setCustomState: (customState: Record<string, unknown>) => void;
}
export interface GardenApi {
    mutations: GardenMutations;
    states: GardenStates;
}
