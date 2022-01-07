import { Manifests } from '@equinor/app-builder';
import { AuthenticationProvider, useAuthenticate } from '@equinor/authentication';
import { tokens } from '@equinor/eds-tokens';
import { AppConfig } from '@equinor/lighthouse-conf';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { MainLayout } from './components/Layouts/MainLayout';
import LoadingPage from './components/Loading/LoadingPage';
import { ClientRoutes } from './components/Routes/Routes';
import ProCoSysTopBar from './components/TopBar/TopBar';
import { ClientContextProvider } from './context/clientContext';
import { ConfirmationDialog } from './Core/ConfirmationDialog/Components/ConfirmationDialog';
import { FactoryComponent } from './Core/DataFactory';

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Equinor;
        margin: 0;
    };

    ::-webkit-scrollbar {
        width: .3rem;
        height: .3rem;
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

interface ClientProps {
    appConfig: AppConfig;
    authProvider: AuthenticationProvider;
    manifests: Manifests;
}

const Client: React.FC<ClientProps> = ({
    appConfig,
    authProvider,
    manifests,
}: ClientProps): JSX.Element => {
    const isAuthenticated = useAuthenticate(authProvider);
    const queryClient = new QueryClient();

    return isAuthenticated ? (
        <QueryClientProvider client={queryClient}>
            <ClientContextProvider {...{ appConfig, authProvider }}>
                <FactoryComponent />
                <ConfirmationDialog />
                <BrowserRouter>
                    <GlobalStyle />
                    <ProCoSysTopBar />
                    <MainLayout>
                        <ClientRoutes manifests={manifests} />
                    </MainLayout>
                </BrowserRouter>
                <FactoryComponent />
            </ClientContextProvider>
        </QueryClientProvider>
    ) : (
        <>
            <GlobalStyle />
            <LoadingPage />
        </>
    );
};

export default Client;
