import { useEffect } from 'react';
import { FilterApiContext } from '../../../../../packages/Filter/Context/FilterContext';
import { useFilterApi } from '../../../../../packages/Filter/Hooks/useFilterApi';
import { FilterOptions } from '../../../../../packages/Filter/Types';
import { useDataContext } from '../../Context/DataProvider';

interface WorkspaceFilterWrapperProps {
    filterConfiguration: FilterOptions<unknown>;
    children: React.ReactNode;
}

/** Wrapper for workspace filter api */
export function WorkspaceFilterWrapper({
    children,
    filterConfiguration,
}: WorkspaceFilterWrapperProps): JSX.Element {
    const { data } = useDataContext();
    const filterApi = useFilterApi({ data: data, filterConfiguration: filterConfiguration });

    const shouldInitFilter = data && data.length > 0;
    //HACK: architectural flaw
    useEffect(() => {
        filterApi.operations.init();
    }, [shouldInitFilter]);

    return <FilterApiContext.Provider value={filterApi}>{children}</FilterApiContext.Provider>;
}
