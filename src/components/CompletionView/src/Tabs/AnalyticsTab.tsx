import { AnalyticsView } from '@equinor/Diagrams';
import { useFilter } from '../../../Filter/Hooks/useFilter';
import { useDataContext } from '../Context/DataProvider';

export const AnalyticsTab = (): JSX.Element => {
    const { filteredData, isFiltering: isLoading } = useFilter();
    const { analyticsOptions } = useDataContext();

    return analyticsOptions ? (
        <AnalyticsView data={filteredData} isLoading={isLoading} options={analyticsOptions} />
    ) : (
        <p> No options provided.</p>
    );
};
