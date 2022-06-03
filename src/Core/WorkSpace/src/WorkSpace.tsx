import { ErrorBoundary, ErrorFallback } from '@equinor/ErrorBoundary';
import { ClientApi } from '@equinor/lighthouse-portal-client';
import { Route, Routes } from 'react-router-dom';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { useWorkSpace } from './WorkSpaceApi/useWorkSpace';

export type WorkspaceProps = Omit<
    ClientApi,
    'createWorkSpace' | 'createPageViewer' | 'createPowerBiViewer'
>;

export const WorkSpace = (props: WorkspaceProps): JSX.Element => {
    const options = useWorkSpace();

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} routeName={props.title}>
            <Routes>
                <Route
                    path={`/`}
                    element={<WorkSpaceView {...props} workspaceOptions={options} />}
                />
                <Route
                    path={`/:id`}
                    element={<WorkSpaceView {...props} workspaceOptions={options} />}
                />
            </Routes>
        </ErrorBoundary>
    );
};
