import { FilterApiContext, FilterGroup, FilterOptions, useFilterApi } from '@equinor/filter';
import { useEffect } from 'react';
import { useDataContext } from './DataProvider';

type WorkspaceFilterWrapperProps = {
    children: React.ReactNode;
    filterOptions: FilterOptions<Record<PropertyKey, unknown>>;
};

/** Wrapper for workspace filter api */
export function WorkspaceFilterWrapper({
    children,
    filterOptions,
}: WorkspaceFilterWrapperProps): JSX.Element {
    const { data } = useDataContext();
    const filterApi = useFilterApi({ data: data, filterConfiguration: filterOptions || [] });

    const shouldInitFilter = data && data.length > 0;
    //HACK: architectural flaw
    useEffect(() => {
        filterApi.operations.init();
        const filterState = parseSearchParams(filterOptions.map((s) => s.name));
        if (filterState.length > 0) {
            const allFilterGroups = filterApi.filterState.getAllFilterGroups();
            filterApi.operations.setFilterState(generateFilterState(filterState, allFilterGroups));
            filterApi.operations.filterAndRerender();
        }
    }, [shouldInitFilter]);

    useEffect(() => {
        filterApi.operations.filterAndRerender();
    }, [data]);

    return <FilterApiContext.Provider value={filterApi}>{children}</FilterApiContext.Provider>;
}

const parseSearchParams = (validGroups: string[]) => {
    const s = new URL(window.location.toString()).searchParams;
    const filters = s
        .getAll('filter')
        .map((s) => ({ name: s.split(':')[0], values: s.split(':')[1].split(',') }))
        .filter((r) => validGroups.includes(r.name));
    return filters;
};

function generateFilterState(
    filterState: {
        name: string;
        values: string[];
    }[],
    allFilterGroups: FilterGroup[]
) {
    return filterState.map((s) => {
        const group = allFilterGroups.find((R) => R.name === s.name);

        return {
            name: s.name,
            values: group!.values.filter((x) => !s.values.includes(typeof x == 'string' ? x : '')),
        };
    });
}
