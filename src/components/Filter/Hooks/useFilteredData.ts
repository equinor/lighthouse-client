import { useFilter } from './useFilter';

export function useFilteredData<T>(): T[] {
    const { filteredData } = useFilter<T>();
    return filteredData;
}
