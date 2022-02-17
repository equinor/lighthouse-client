import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { ClientApi } from '@equinor/portal-client';
import { useQuery } from 'react-query';
import { getSystems } from '../../../apps/ScopeChangeRequest/Api/PCS/getSystems';
import { QueryKeys } from '../../../apps/ScopeChangeRequest/Api/ScopeChange/queryKeys';
import ErrorFallback from '../../ErrorBoundary/Components/ErrorFallback';
import { WorkSpaceView } from './Components/WorkSpace/WorkSpaceView';
import { DataProvider } from './Context/DataProvider';

export type WorkspaceProps = Omit<ClientApi, 'createWorkSpace' | 'createPageViewer'>;

export const WorkSpace = (props: WorkspaceProps): JSX.Element => {
    useQuery(QueryKeys.Systems, getSystems, {
        staleTime: Infinity,
        cacheTime: Infinity,
    });

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback} routeName={props.title}>
            <DataProvider>
                <WorkSpaceView {...props} />
            </DataProvider>
        </ErrorBoundary>
    );
};
