import { useAuthenticate } from '@equinor/authentication';
import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { Client as ClientProps, ClientContextProvider } from '@equinor/portal-client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/Layouts/MainLayout';
import LoadingPage from './components/Loading/LoadingPage';
import { MenuProvider } from './components/Menu';
import { ServiceMessageBanner, useServiceMessage } from './components/Messages';
import { ServiceMessagePost } from './components/Messages/Service/Components/ServiceMessagePost';
import { ClientRoutes } from './components/Routes/Routes';
import ClientTopBar from './components/TopBar/TopBar';
import { ConfirmationDialog } from './Core/ConfirmationDialog/Components/ConfirmationDialog';
import ErrorFallback from './Core/ErrorBoundary/Components/ErrorFallback';
import { DataCreatorProvider } from './FusionModules/DataCreatorReact/Context/DataCreatorProvider';

const Client: React.FC<ClientProps> = ({ authProvider, dataCreator }: ClientProps): JSX.Element => {
    const isAuthenticated = useAuthenticate(authProvider);
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // Default cachetime 2 minutes
                cacheTime: 2000 * 60,
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
    const messageData = useServiceMessage();

    return isAuthenticated ? (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <QueryClientProvider client={queryClient}>
                <ServiceMessagePost />
                <ConfirmationDialog />
                <ClientContextProvider>
                    {messageData.isActive && <ServiceMessageBanner {...messageData} />}
                    <MenuProvider>
                        <BrowserRouter>
                            <DataCreatorProvider dataCreator={dataCreator}>
                                <ClientTopBar />

                                <MainLayout serviceMessageActive={messageData.isActive}>
                                    <ClientRoutes />
                                </MainLayout>
                            </DataCreatorProvider>
                        </BrowserRouter>
                    </MenuProvider>
                </ClientContextProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    ) : (
        <LoadingPage />
    );
};

export default Client;
