import { FilterApiContext, FilterOptions, useFilterApi } from '@equinor/filter';
import { useEffect } from 'react';
import { useDataContext } from './DataProvider';

interface WorkspaceFilterWrapperProps {
    children: React.ReactNode;
    filterOptions: FilterOptions<unknown>;
}

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
    }, [shouldInitFilter]);

    useEffect(() => {
        filterApi.operations.filterAndRerender();
    }, [data]);

    return <FilterApiContext.Provider value={filterApi}>{children}</FilterApiContext.Provider>;
}
