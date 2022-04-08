import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { ModelViewerContextProvider } from '@equinor/lighthouse-model-viewer';
import { ClientApi } from '@equinor/portal-client';
import { ReactQueryDevtools } from 'react-query/devtools';
import ErrorFallback from '../../ErrorBoundary/Components/ErrorFallback';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { DataProvider } from './Context/DataProvider';
import { PowerBIViewContextProvider } from './Context/ViewProvider';

export type WorkspaceProps = Omit<
    ClientApi,
    'createWorkSpace' | 'createPageViewer' | 'createPowerBiViewer'
>;

export const WorkSpace = (props: WorkspaceProps): JSX.Element => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} routeName={props.title}>
            <DataProvider>
                <ModelViewerContextProvider>
                    <PowerBIViewContextProvider>
                        <WorkSpaceView {...props} />
                    </PowerBIViewContextProvider>
                </ModelViewerContextProvider>
            </DataProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </ErrorBoundary>
    );
};
