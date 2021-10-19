import { useFilterData } from './useFilterData';

export function useFilterItemCount(type: string, key: string): number {
    const { filteredData } = useFilterData();

    // const itemsCountList = filteredData.filter((item) => (item[type] = key));
    // return;
    return 1;
}
