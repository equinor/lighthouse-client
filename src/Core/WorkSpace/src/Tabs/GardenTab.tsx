import { deref, swap } from '@dbeining/react-atom';
import { useEffect } from 'react';
import { Garden } from '../../../../components/ParkView/Components/Garden';
import { GardenApi } from '../../../../components/ParkView/Models/gardenApi';
import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';
import { WorkspaceFilter } from '../Components/WorkspaceFilter/WorkspaceFilter';
import { useWorkspaceBookmarks } from '../Context/BookmarkContext';
import { useDataContext } from '../Context/DataProvider';
import { gardenApiAtom } from '../Util/gardenBookmarks/gardenApiAtom';
import { gardenStateSnapshotAtom } from '../Util/gardenBookmarks/gardenStateSnapshotAtom';
import { generateGardenSnapshot } from '../Util/gardenBookmarks/generateGardenSnapshot';
import { interceptGardenOptions } from '../Util/gardenBookmarks/interceptGardenOptions';

export const GardenTab = (): JSX.Element => {
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();
    const data = getFilteredData();
    useWorkspaceBookmarks();
    const { gardenOptions } = useDataContext();

    useEffect(
        () => () => {
            const api = deref(gardenApiAtom);
            if (!api) return;
            saveGardenSnapshot(api);
        },
        []
    );

    if (!gardenOptions) return <></>;
    return (
        <>
            <WorkspaceFilter />
            <Garden
                data={data}
                gardenOptions={interceptGardenOptions(gardenOptions)}
                onGardenReady={(api) => {
                    swap(gardenApiAtom, () => api);
                }}
            />
        </>
    );
};

function saveGardenSnapshot(api: GardenApi) {
    swap(gardenStateSnapshotAtom, () => generateGardenSnapshot(api));
}
