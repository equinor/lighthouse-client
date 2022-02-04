import { useFilteredData } from '@equinor/filter';
import { Garden } from '../../../../components/ParkView/Components/Garden';
import { useDataContext } from '../Context/DataProvider';

export const GardenTab = (): JSX.Element => {
    const { data } = useFilteredData();
    const { gardenOptions } = useDataContext();

    return <Garden data={data} gardenOptions={gardenOptions} />;
};
