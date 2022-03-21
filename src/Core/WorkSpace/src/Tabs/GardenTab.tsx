import { useFilteredData } from '@equinor/filter';
import { Garden } from '../../../../components/ParkView/Components/Garden';
import { useDataContext } from '../Context/DataProvider';

export const GardenTab = (): JSX.Element => {
    const { data, isLoading } = useFilteredData();
    const { gardenOptions } = useDataContext();
    if (isLoading) return <h1>Loading</h1>;
    return <Garden data={data} gardenOptions={gardenOptions} />;
};
