import { useFilter } from './useFilter';

interface FilteredData<T> {
    data: T[];
    isLoading: boolean;
}

export function useFilteredData<T>(): FilteredData<T> {
    const { filteredData, isLoading } = useFilter<T>();
    return { data: filteredData, isLoading };
}
