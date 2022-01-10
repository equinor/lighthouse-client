import { ClientApi } from '@equinor/app-builder';
import { useEffect } from 'react';
import { useSidesheetCleanup } from '../../PopoutSidesheet/Hooks/useSidesheetCleanup';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { DataProvider } from './Context/DataProvider';

export type WorkspaceProps = Omit<ClientApi, 'createWorkSpace' | 'createPageViewer'>;

export const WorkSpace = (props: WorkspaceProps): JSX.Element => {
    const { closeSidesheet } = useSidesheetCleanup();
    useEffect(() => {
        closeSidesheet();
    }, []);

    return (
        <DataProvider>
            <WorkSpaceView {...props} />
        </DataProvider>
    );
};
