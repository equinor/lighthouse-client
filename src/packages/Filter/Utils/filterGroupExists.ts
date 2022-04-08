import { FilterGroup } from '../Hooks/useFilterApi';

export const filterGroupExists = (groupName: string, filterState: FilterGroup[]): boolean =>
    filterState.findIndex(({ name }) => name === groupName) !== -1;
