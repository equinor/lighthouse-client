import { ErrorBoundary, ErrorFallback } from '@equinor/ErrorBoundary';
import { ModelViewerContextProvider } from '@equinor/lighthouse-model-viewer';
import { ClientApi } from '@equinor/portal-client';
import { ReactQueryDevtools } from 'react-query/devtools';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { DataProvider } from './Context/DataProvider';
import { ViewProvider } from './Context/ViewProvider';

export type WorkspaceProps = Omit<
    ClientApi,
    'createWorkSpace' | 'createPageViewer' | 'createPowerBiViewer'
>;

export const WorkSpace = (props: WorkspaceProps): JSX.Element => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} routeName={props.title}>
            <DataProvider>
                <ModelViewerContextProvider>
                    <ViewProvider>
                        <WorkSpaceView {...props} />
                    </ViewProvider>
                </ModelViewerContextProvider>
            </DataProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </ErrorBoundary>
    );
};
