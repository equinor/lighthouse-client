import { useAuthenticate } from '@equinor/authentication';
import { Client as ClientProps, ClientContextProvider } from '@equinor/lighthouse-portal-client';
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
import { Framework } from '@equinor/fusion-framework-react';
import EquinorLoader from './fusion-framework/EquinorLoader';
import { ErrorBoundary, ErrorFallback } from '@equinor/ErrorBoundary';

const Client: React.FC<ClientProps> = ({ authProvider, config }: ClientProps): JSX.Element => {
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
            <Framework fallback={<EquinorLoader text={'Loading portal'} />} configure={config}>
                <QueryClientProvider client={queryClient}>
                    <ServiceMessagePost />
                    <ConfirmationDialog />
                    <ClientContextProvider>
                        {messageData.isActive && <ServiceMessageBanner {...messageData} />}
                        <MenuProvider>
                            <BrowserRouter>
                                <ClientTopBar />
                                <MainLayout serviceMessageActive={messageData.isActive}>
                                    <ClientRoutes />
                                </MainLayout>
                            </BrowserRouter>
                        </MenuProvider>
                    </ClientContextProvider>
                </QueryClientProvider>
            </Framework>
        </ErrorBoundary>
    ) : (
        <LoadingPage />
    );
};

export default Client;
