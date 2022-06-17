import { getWorkspaceDb } from '../workspaceDB';

const { getValue, put } = getWorkspaceDb();

export const FilterStore = {
    name: 'UiFilterState',
    isExpanded: 'isExpanded',
    getIsExpanded: (): Promise<boolean> => getValue(FilterStore.name, FilterStore.isExpanded),
    updateIsExpanded: async (value: boolean): Promise<void> => {
        await put(FilterStore.name, FilterStore.isExpanded, value);
    },
};
