import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { ClientApi } from '@equinor/portal-client';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ModelViewerContextProvider } from '../../../packages/ModelViewer/context/modelViewerContext';
import ErrorFallback from '../../ErrorBoundary/Components/ErrorFallback';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { DataProvider } from './Context/DataProvider';

export type WorkspaceProps = Omit<
    ClientApi,
    'createWorkSpace' | 'createPageViewer' | 'createPowerBiViewer'
>;

export const WorkSpace = (props: WorkspaceProps): JSX.Element => {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} routeName={props.title}>
            <DataProvider>
                <ModelViewerContextProvider>
                    <WorkSpaceView {...props} />
                </ModelViewerContextProvider>
            </DataProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </ErrorBoundary>
    );
};
