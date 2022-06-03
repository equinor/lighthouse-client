import { deref, swap } from '@dbeining/react-atom';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Garden } from '../../../../components/ParkView/Components/Garden';
import { GardenApi } from '../../../../components/ParkView/Models/gardenApi';
import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';
import { WorkspaceFilter } from '../Components/WorkspaceFilter/WorkspaceFilter';
import { useDataContext } from '../Context/DataProvider';
import { tabApis } from '../Context/LocationProvider';
import { useMasterApiContext } from '../Context/TabApiProvider';
import {
    gardenApiAtom,
    gardenStateSnapshotAtom,
    generateGardenSnapshot,
    interceptGardenOptions,
} from '../Util/bookmarks/gardenBookmarks';
import { useWorkspaceBookmarks } from '../Util/bookmarks/hooks';
import { useWorkSpace } from '../WorkSpaceApi/useWorkSpace';
const GardenTabWrapper = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
    width: 100%;
`;
export const GardenTab = (): JSX.Element => {
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();
    const data = getFilteredData();
    useWorkspaceBookmarks();
    const { gardenOptions } = useDataContext();

    const { name } = useWorkSpace();
    useEffect(
        () => () => {
            const api = deref(gardenApiAtom);
            if (!api) return;
            saveGardenSnapshot(api, name);
        },
        []
    );
    const setGardenApi = useMasterApiContext(({ setters }) => setters.setGardenApi);

    if (!gardenOptions) return <></>;
    return (
        <GardenTabWrapper>
            <WorkspaceFilter />
            <Garden
                data={data}
                gardenOptions={interceptGardenOptions(gardenOptions, name)}
                onGardenReady={(api) => {
                    setGardenApi(api);
                    tabApis.updateAtom({ garden: api });
                    swap(gardenApiAtom, () => api);
                }}
            />
        </GardenTabWrapper>
    );
};

function saveGardenSnapshot(api: GardenApi, name: string) {
    swap(gardenStateSnapshotAtom, () => generateGardenSnapshot(api, name));
}
