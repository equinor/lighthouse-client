import { FilterView } from '@equinor/filter';
import { Garden } from '../../../../components/ParkView/Components/Garden';
import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';
import { useDataContext } from '../Context/DataProvider';
import { useViewerContext } from '../Context/ViewProvider';

export const GardenTab = (): JSX.Element => {
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();
    const data = getFilteredData();
    const { gardenOptions } = useDataContext();

    const { isFilterActive } = useViewerContext();

    return (
        <>
            <FilterView isActive={isFilterActive} />
            <Garden data={data} gardenOptions={gardenOptions} />;
        </>
    );
};
