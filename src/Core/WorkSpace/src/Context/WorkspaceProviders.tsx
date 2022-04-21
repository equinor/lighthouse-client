import { ModelViewerContextProvider } from '@equinor/lighthouse-model-viewer';
import { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools';
import { DataProvider } from './DataProvider';
import { LocationProvider } from './LocationProvider';
import { ViewProvider } from './ViewProvider';

export const WorkspaceProviders = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    return (
        <>
            <DataProvider>
                <LocationProvider>
                    <ModelViewerContextProvider>
                        <ViewProvider>{children}</ViewProvider>
                    </ModelViewerContextProvider>
                </LocationProvider>
            </DataProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </>
    );
};
