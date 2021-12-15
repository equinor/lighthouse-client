import { AnalyticsView } from '@equinor/Diagrams';
import { useFilteredData } from '@equinor/filter';
import { useDataContext } from '../Context/DataProvider';

export const AnalyticsTab = (): JSX.Element => {
    const { data, isLoading } = useFilteredData();
    const { analyticsOptions } = useDataContext();

    return analyticsOptions ? (
        <AnalyticsView data={data} isLoading={isLoading} options={analyticsOptions} />
    ) : (
        <p> No options provided.</p>
    );
};
