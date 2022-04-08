import { ModelViewerContextProvider } from '@equinor/lighthouse-model-viewer';
import { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { WorkspaceFilterWrapper } from '../Components/WorkSpace/WorkspaceFilterWrapper';
import { DataProvider } from './DataProvider';
import { LocationProvider } from './LocationProvider';
import { ViewProvider } from './ViewProvider';

export const WorkspaceProviders = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    return (
        <>
            <DataProvider>
                <ModelViewerContextProvider>
                    <LocationProvider>
                        <ViewProvider>
                            <WorkspaceFilterWrapper>{children}</WorkspaceFilterWrapper>
                        </ViewProvider>
                    </LocationProvider>
                </ModelViewerContextProvider>
            </DataProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    );
};
