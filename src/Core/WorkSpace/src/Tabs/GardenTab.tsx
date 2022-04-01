// import { useFilteredData } from '@equinor/filter';
import { Garden } from '../../../../components/ParkView/Components/Garden';
import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';
import { useDataContext } from '../Context/DataProvider';

export const GardenTab = (): JSX.Element => {
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();
    const data = getFilteredData();
    const { gardenOptions } = useDataContext();
    return <Garden data={data} gardenOptions={gardenOptions} />;
};
