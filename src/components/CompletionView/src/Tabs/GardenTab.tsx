import { useFilter } from '../../../Filter/Hooks/useFilter';
import { Garden } from '../../../ParkView/Components/Garden';
import { useDataContext } from '../Context/DataProvider';

export const GardenTab = (): JSX.Element => {
    const { filteredData } = useFilter();
    const { gardenOptions } = useDataContext();

    return <Garden data={filteredData} gardenOptions={gardenOptions} />;
};
