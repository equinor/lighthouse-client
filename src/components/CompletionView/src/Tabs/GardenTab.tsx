import { useFilteredData } from '../../../Filter';
import { GardenView } from '../../../Garden/Components/GardenView';
import { GardenProvider } from '../../../Garden/Context/GardenProvider';
import { useDataContext } from '../Context/DataProvider';
import { NoGardenOptions } from '../Components/NoGardenOptions';

export const GardenTab = (): JSX.Element => {
    const data = useFilteredData();
    const { gardenOptions } = useDataContext();

    return gardenOptions ? (
        <GardenProvider gardenOptions={gardenOptions} data={data}>
            <GardenView />
        </GardenProvider>
    ) : (
        <NoGardenOptions />
    );
};
