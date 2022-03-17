import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { ClientApi } from '@equinor/portal-client';
import { ModelViewerContextProvider } from '../../../packages/ModelViewer/context/modelViewerContext';
import ErrorFallback from '../../ErrorBoundary/Components/ErrorFallback';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { DataProvider } from './Context/DataProvider';
import { ReactQueryDevtools } from 'react-query/devtools';

export type WorkspaceProps = Omit<ClientApi, 'createWorkSpace' | 'createPageViewer'>;

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
