import { AnalyticsView } from "../../../../packages/Diagrams/src/Components/AnalyticsView";
import { useFilteredData } from "../../../Filter";
import { useDataContext } from "../Context/DataProvider";

export const AnalyticsTab = () => {
    const { data, isLoading } = useFilteredData()
    const { analyticsOptions } = useDataContext();

    return (
        analyticsOptions ? <AnalyticsView data={data} isLoading={isLoading} options={analyticsOptions} /> : <p> No options provided.</p>
    );
}

