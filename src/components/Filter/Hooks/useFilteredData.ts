import { useFilter } from './useFilter';

export function useFilteredData<T>(): { data: T[]; isLoading: boolean } {
    const { filteredData, isLoading } = useFilter<T>();
    return { data: filteredData, isLoading };
}
