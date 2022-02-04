import { FilterProvider, FilterView } from '@equinor/filter';
import { useEffect, useRef } from 'react';
import { useDashboardDataContext } from '../../Context/DataProvider';
import { Dashboard } from '../DashboardView/Dashboard';
import styled from 'styled-components';
import { Progress } from '@equinor/eds-core-react';

const Circular = styled(Progress.Circular)`
    padding: 1rem;
`;
const Loading = styled.p`
    width: 100%;
    height: 350px;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
interface DashboardViewerProps {
    isFilterActive: boolean;
}

export function DashboardViewer({ isFilterActive }: DashboardViewerProps): JSX.Element {
    const { data, instance, getData, isLoading } = useDashboardDataContext();
    const isMounted = useRef(false);

    useEffect(() => {
        !isMounted.current && getData();
        isMounted.current = true;
    }, [getData]);

    if (isLoading) {
        return (
            <Loading>
                <Circular />
                Loading..
            </Loading>
        );
    }
    return (
        <FilterProvider initialData={data} options={instance.filterOptions}>
            <FilterView isActive={isFilterActive} />
            <Dashboard {...instance} />
        </FilterProvider>
    );
}
