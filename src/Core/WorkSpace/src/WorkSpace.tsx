import { ErrorBoundary, ErrorFallback } from '@equinor/ErrorBoundary';
import { ClientApi } from '@equinor/portal-client';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { WorkspaceProviders } from './Context/WorkspaceProviders';

export type WorkspaceProps = Omit<
    ClientApi,
    'createWorkSpace' | 'createPageViewer' | 'createPowerBiViewer'
>;

export const WorkSpace = (props: WorkspaceProps): JSX.Element => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} routeName={props.title}>
            <WorkspaceProviders>
                <WorkSpaceView {...props} />
            </WorkspaceProviders>
        </ErrorBoundary>
    );
};
