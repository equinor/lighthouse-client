import { useAuthenticate } from '@equinor/authentication';
import { tokens } from '@equinor/eds-tokens';
import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { Client as ClientProps, ClientContextProvider } from '@equinor/portal-client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { MainLayout } from './components/Layouts/MainLayout';
import LoadingPage from './components/Loading/LoadingPage';
import { MenuProvider } from './components/Menu';
import { ServiceMessageBanner, useServiceMessage } from './components/Messages';
import { ServiceMessagePost } from './components/Messages/Service/Components/ServiceMessagePost';
import { ClientRoutes } from './components/Routes/Routes';
import ClientTopBar from './components/TopBar/TopBar';
import { ConfirmationDialog } from './Core/ConfirmationDialog/Components/ConfirmationDialog';
import { FactoryComponent } from './Core/DataFactory';
import ErrorFallback from './Core/ErrorBoundary/Components/ErrorFallback';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Equinor;
        font-size: 13px;
        margin: 0;
    };

    p {
        font-family: Equinor;
        font-size: 13px !important;
    }
    button {
        font-family: Equinor;
    }
    pre {
        font-family: Equinor;
        font-size: 13px !important;
        font-weight: 400;
        line-height: 1.250em;
        text-align: left;
    }

    ::-webkit-scrollbar {
        height: 0.3rem;
        width: 0.5rem;
    }

        /* Track */
        ::-webkit-scrollbar-track {
        background: none; 
        }
        
        /* Handle */
        ::-webkit-scrollbar-thumb {
        background: ${tokens.colors.interactive.primary__resting.rgba}; 
        border-radius: 5px;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
        background:${tokens.colors.interactive.primary__hover.rgba}; 
        }
`;

const Client: React.FC<ClientProps> = ({ authProvider }: ClientProps): JSX.Element => {
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
                <GlobalStyle />
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
                    <FactoryComponent />
                </ClientContextProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    ) : (
        <>
            <GlobalStyle />
            <LoadingPage />
        </>
    );
};

export default Client;
