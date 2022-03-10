import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { ClientApi } from '@equinor/portal-client';
import { QueryClient, QueryClientProvider } from 'react-query';
import ErrorFallback from '../../ErrorBoundary/Components/ErrorFallback';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { DataProvider } from './Context/DataProvider';
import { ReactQueryDevtools } from 'react-query/devtools';

export type WorkspaceProps = Omit<ClientApi, 'createWorkSpace' | 'createPageViewer'>;

export const WorkSpace = (props: WorkspaceProps): JSX.Element => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 3,
                retryDelay: 1000,
            },
            mutations: {
                retry: 3,
                retryDelay: 1000,
            },
        },
    });

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} routeName={props.title}>
            <QueryClientProvider client={queryClient}>
                <DataProvider>
                    <WorkSpaceView {...props} />
                </DataProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ErrorBoundary>
    );
};
