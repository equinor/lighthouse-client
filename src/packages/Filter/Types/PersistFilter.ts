import { FilterData } from './FilterItem';

export interface FilterSave {
    filterData: FilterData;
    name: string;
}
/**Options to persist filter */
export interface FilterPersistOptions {
    getFilter(): FilterData | undefined;
    setFilter(filterData: FilterData): void;
}

export interface PersistCustomFilters {
    saveFilterItem(filterItem: FilterSave): void;
    getFilterByName(name: string): FilterSave | undefined;
    getAllFiltersNames(): string[];
}
