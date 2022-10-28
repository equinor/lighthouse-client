import { deref, swap } from '@dbeining/react-atom';
import { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Garden } from '../../../../components/ParkView/Components/Garden';
import { GardenApi } from '../../../../components/ParkView/Models/gardenApi';
import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';
import { WorkspaceFilter } from '../Components/WorkspaceFilter/WorkspaceFilter';
import { tabApis } from '../Context/LocationProvider';
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
    gap: 8px;
    height: 100%;
    width: 100%;
`;
export const GardenTab = (): JSX.Element => {
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();
    useWorkspaceBookmarks();
    const { gardenOptions, name } = useWorkSpace();

    const data = getFilteredData();

    const onGardenReady = useCallback((api) => {
        tabApis.updateAtom({ garden: api });
        swap(gardenApiAtom, () => api);
    }, []);

    useEffect(
        () => () => {
            const api = deref(gardenApiAtom);
            if (!api) return;
            saveGardenSnapshot(api, name);
        },
        [name]
    );

    if (!gardenOptions) return <></>;

    return (
        <GardenTabWrapper>
            <WorkspaceFilter />
            <Garden
                data={data}
                gardenOptions={interceptGardenOptions(gardenOptions, name)}
                onGardenReady={onGardenReady}
            />
        </GardenTabWrapper>
    );
};

function saveGardenSnapshot(api: GardenApi, name: string) {
    swap(gardenStateSnapshotAtom, () => generateGardenSnapshot(api, name));
}
