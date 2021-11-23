import { useFilteredData } from '../../../Filter';
import { Garden } from '../../../Garden';
import { useDataContext } from '../Context/DataProvider';

export const GardenTab = (): JSX.Element => {
    const data = useFilteredData();
    const { gardenOptions } = useDataContext();

    return gardenOptions ? (
        <Garden
            customGroupView={gardenOptions.customGroupView}
            customItemView={gardenOptions.customItemView}
            statusFunc={gardenOptions.statusFunc}
            data={data}
            groupeKey={gardenOptions.groupeKey}
            itemKey={gardenOptions.itemKey}
        />
    ) : (
        <p> No options provided.</p>
    );
};
