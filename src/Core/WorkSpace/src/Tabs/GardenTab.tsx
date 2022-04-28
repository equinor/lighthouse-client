import { Garden } from '../../../../components/ParkView/Components/Garden';
import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';
import { WorkspaceFilter } from '../Components/WorkspaceFilter/WorkspaceFilter';
import { useDataContext } from '../Context/DataProvider';

export const GardenTab = (): JSX.Element => {
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();
    const data = getFilteredData();
    const { gardenOptions } = useDataContext();

    return (
        <>
            <WorkspaceFilter />
            <Garden data={data} gardenOptions={gardenOptions} />;
        </>
    );
};
