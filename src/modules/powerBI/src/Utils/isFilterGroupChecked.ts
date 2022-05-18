import { getActiveFilterGroupArray } from './getActiveFilterGroups';

type IsFilterGroupCheckedArgs = {
    filterGroupVisible: string[] | undefined;
    filterType: string;
    activeFilters: Record<string, (string | number | boolean)[]>;
};
export const isFilterGroupChecked = ({
    activeFilters,
    filterGroupVisible,
    filterType,
}: IsFilterGroupCheckedArgs): boolean => {
    return (
        filterGroupVisible?.find((a) => a === filterType) !== undefined ||
        getActiveFilterGroupArray(activeFilters).find((a) => a === filterType) !== undefined
    );
};
