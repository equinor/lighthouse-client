import { ActiveFilter } from '..';

export function getActiveFilterGroupArray(activeFilters: Record<string, ActiveFilter[]>) {
    let activeFilterGroups: string[] = [];
    Object.keys(activeFilters).forEach((key) => {
        if (activeFilters[key].length !== 0) {
            activeFilterGroups.push(key);
        }
    });
    return activeFilterGroups;
}
