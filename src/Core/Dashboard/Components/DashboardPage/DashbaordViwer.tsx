import { FilterProvider, FilterView } from '@equinor/filter';
import { useEffect, useRef } from 'react';
import { useDashboardDataContext } from '../../Context/DataProvider';
import { Dashboard } from '../DashboardView/Dashboard';

interface DashboardViewerProps {
    isFilterActive: boolean;
}

export function DashboardViewer({ isFilterActive }: DashboardViewerProps): JSX.Element {
    const { data, instance, getData } = useDashboardDataContext();
    const isMounted = useRef(false);

    useEffect(() => {
        !isMounted.current && getData();
        isMounted.current = true;
    }, [getData]);

    return (
        <FilterProvider initialData={data} options={instance.filterOptions}>
            <FilterView isActive={isFilterActive} />
            <Dashboard {...instance} />
        </FilterProvider>
    );
}
