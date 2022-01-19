import { ClientApi } from '@equinor/portal-client';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { DataProvider } from './Context/DataProvider';


export type WorkspaceProps = Omit<ClientApi, 'createWorkSpace' | 'createPageViewer'>;

export const WorkSpace = (props: WorkspaceProps): JSX.Element => {
    return (
        <DataProvider>
            <WorkSpaceView {...props} />
        </DataProvider>
    );
};
