import { ModelViewerContextProvider } from '@equinor/lighthouse-model-viewer';
import { ReactQueryDevtools } from 'react-query/devtools';
import { WorkspaceEvents } from '../Components/WorkSpace/WorkSpaceView';
import { WorkSpaceConfig } from '../WorkSpaceApi/workspaceState';
import { BookmarkContextWrapper } from './BookmarkContext';
import { DataProvider } from './DataProvider';
import { LocationProvider } from './LocationProvider';
import { MasterApiProvider } from './TabApiProvider';
import { ViewProvider } from './ViewProvider';
import { WorkspaceFilterWrapper } from './WorkspaceFilterWrapper';

interface WorkspaceProvidersProps {
    options: WorkSpaceConfig<unknown>;
    events: WorkspaceEvents;
    children: React.ReactNode;
}

export const WorkspaceProviders = ({
    children,
    options,
    events,
}: WorkspaceProvidersProps): JSX.Element => {
    return (
        <>
            {/* ORDER MATTERS! */}
            <MasterApiProvider events={events}>
                <DataProvider>
                    <WorkspaceFilterWrapper filterOptions={options.filterOptions || []}>
                        <LocationProvider>
                            <BookmarkContextWrapper>
                                <ModelViewerContextProvider>
                                    <ViewProvider>{children}</ViewProvider>
                                </ModelViewerContextProvider>
                            </BookmarkContextWrapper>
                        </LocationProvider>
                    </WorkspaceFilterWrapper>
                </DataProvider>
            </MasterApiProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    );
};
