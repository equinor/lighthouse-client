import { Atom, deref, swap } from '@dbeining/react-atom';
import { Garden } from '../../../../components/ParkView/Components/Garden';
import { GardenApi } from '../../../../components/ParkView/Components/VirtualGarden/Container';
import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';
import { useWorkSpaceKey } from '../Components/DefaultView/Hooks/useWorkspaceKey';
import { WorkspaceFilter } from '../Components/WorkspaceFilter/WorkspaceFilter';
import { useDataContext } from '../Context/DataProvider';
import { useWorkSpace } from '../WorkSpaceApi/useWorkSpace';
import { CoreContext } from '../WorkSpaceApi/workspaceState';

export const GardenTab = (): JSX.Element => {
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();
    const data = getFilteredData();

    const { name } = useWorkSpace();

    return (
        <>
            <WorkspaceFilter />
            <Garden
                data={data}
                gardenOptions={deref(CoreContext)[name].gardenOptions}
                onGardenReady={(api) => swap(gardenApiAtom, () => api)}
            />
        </>
    );
};

export const gardenApiAtom = Atom.of<GardenApi | null>(null);
