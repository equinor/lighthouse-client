import { useEffect } from 'react';
import { FilterApiContext } from '../../../../../packages/Filter/Context/FilterContext';
import { useFilterApi } from '../../../../../packages/Filter/Hooks/useFilterApi';
import { useDataContext } from '../../Context/DataProvider';
import { useWorkSpace } from '../../WorkSpaceApi/useWorkSpace';

interface WorkspaceFilterWrapperProps {
    children: React.ReactNode;
}

/** Wrapper for workspace filter api */
export function WorkspaceFilterWrapper({ children }: WorkspaceFilterWrapperProps): JSX.Element {
    const { filterOptions = [] } = useWorkSpace();
    const { data } = useDataContext();
    const filterApi = useFilterApi({ data: data, filterConfiguration: filterOptions });

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
