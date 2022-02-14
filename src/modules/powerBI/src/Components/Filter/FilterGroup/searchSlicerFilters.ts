import { PowerBiFilter } from '../../../Types';

export const searchSlicerFilters = (
    slicerFilters: PowerBiFilter[],
    filterValue: string | undefined
): PowerBiFilter[] => {
    if (!filterValue) return slicerFilters;

    return slicerFilters.reduce((acc, curr) => {
        curr.type.toLowerCase().includes(filterValue.toLowerCase()) && acc.push(curr);
        return acc;
    }, [] as PowerBiFilter[]);
};
