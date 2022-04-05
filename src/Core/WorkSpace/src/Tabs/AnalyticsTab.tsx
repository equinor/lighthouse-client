import { AnalyticsView } from '@equinor/Diagrams';

import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';

import { useDataContext } from '../Context/DataProvider';

export const AnalyticsTab = (): JSX.Element => {
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();

    const data = getFilteredData();

    const { analyticsOptions } = useDataContext();

    return analyticsOptions ? (
        <AnalyticsView data={data} isLoading={false} options={analyticsOptions} />
    ) : (
        <p> No options provided.</p>
    );
};
