import { ErrorBoundary, ErrorFallback } from '@equinor/ErrorBoundary';
import { ClientApi } from '@equinor/lighthouse-portal-client';
import { Route, Routes } from 'react-router-dom';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { WorkspaceProviders } from './Context/WorkspaceProviders';

export type WorkspaceProps = Omit<
    ClientApi,
    'createWorkSpace' | 'createPageViewer' | 'createPowerBiViewer'
>;

export const WorkSpace = (props: WorkspaceProps): JSX.Element => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} routeName={props.title}>
            <Routes>
                <Route
                    path={`/`}
                    element={
                        <WorkspaceProviders>
                            <WorkSpaceView {...props} />
                        </WorkspaceProviders>
                    }
                />
                <Route
                    path={`/:id`}
                    element={
                        <WorkspaceProviders>
                            <WorkSpaceView {...props} />
                        </WorkspaceProviders>
                    }
                />
            </Routes>
        </ErrorBoundary>
    );
};
