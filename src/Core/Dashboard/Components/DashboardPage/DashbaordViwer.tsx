import { useEffect, useRef } from 'react';
import { FilterView } from '../../../../packages/Filter/Components/FilterView/FilterView';
import { FilterApiContext } from '../../../../packages/Filter/Context/FilterContext';
import { useFilterApi } from '../../../../packages/Filter/Hooks/useFilterApi';
import { FilterConfiguration } from '../../../../packages/Filter/Types';
import { useDashboardDataContext } from '../../Context/DataProvider';
import { Dashboard } from '../DashboardView/Dashboard';

interface DashboardViewerProps {
    isFilterActive: boolean;
}

export function DashboardViewer({ isFilterActive }: DashboardViewerProps): JSX.Element {
    const { data, instance, getData } = useDashboardDataContext();
    const isMounted = useRef(false);
    const filterApi = useFilterApi({
        data: data,
        filterConfiguration: (instance.filterOptions as FilterConfiguration<unknown>[]) ?? [],
    });
    useEffect(() => {
        !isMounted.current && getData();
        isMounted.current = true;
    }, [getData]);

    return (
        <FilterApiContext.Provider value={filterApi}>
            {/* <FilterView isActive={isFilterActive} /> */}
            <Dashboard {...instance} />
        </FilterApiContext.Provider>
    );
}
