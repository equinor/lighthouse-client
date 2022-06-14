import { AnalyticsView } from '@equinor/Diagrams';

import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';

import { useDataContext } from '../Context/DataProvider';
import { TabProps } from './tabProps';

export const AnalyticsTab = ({ isActive }: TabProps): JSX.Element => {
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
