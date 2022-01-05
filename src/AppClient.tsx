import { AuthenticationProvider, useAuthenticate } from '@equinor/authentication';
import { tokens } from '@equinor/eds-tokens';
import { AppConfig } from '@equinor/lighthouse-conf';
<<<<<<< HEAD:src/HttpClient.tsx
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
=======
import { BrowserRouter } from 'react-router-dom';
>>>>>>> dev:src/AppClient.tsx
import { createGlobalStyle } from 'styled-components';
import { Manifests } from './apps/apps';
import { MainLayout } from './components/Layouts/MainLayout';
import LoadingPage from './components/Loading/LoadingPage';
import { ClientRoutes } from './components/Routes/Routes';
import ProCoSysTopBar from './components/TopBar/TopBar';
import { ClientContextProvider } from './context/clientContext';
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
<<<<<<< HEAD:src/HttpClient.tsx
interface HttpClientProps {
=======

interface ClientProps {
>>>>>>> dev:src/AppClient.tsx
    appConfig: AppConfig;
    authProvider: AuthenticationProvider;
    manifests: Manifests;
}

<<<<<<< HEAD:src/HttpClient.tsx
const HttpClient: React.FC<HttpClientProps> = ({
    appConfig,
    authProvider,
}: HttpClientProps): JSX.Element => {
=======
const Client: React.FC<ClientProps> = ({
    appConfig,
    authProvider,
    manifests,
}: ClientProps): JSX.Element => {
>>>>>>> dev:src/AppClient.tsx
    const isAuthenticated = useAuthenticate(authProvider);
    const queryClient = new QueryClient();

    return isAuthenticated ? (
        <ClientContextProvider {...{ appConfig, authProvider }}>
<<<<<<< HEAD:src/HttpClient.tsx
            <QueryClientProvider client={queryClient}>
                <Router>
                    <GlobalStyle />
                    <ProCoSysTopBar />
                    <MainLayout>
                        <Routes />
                    </MainLayout>
                </Router>
                <FactoryComponent />
            </QueryClientProvider>
=======
            <BrowserRouter>
                <GlobalStyle />
                <ProCoSysTopBar />
                <MainLayout>
                    <ClientRoutes manifests={manifests} />
                </MainLayout>
            </BrowserRouter>
            <FactoryComponent />
>>>>>>> dev:src/AppClient.tsx
        </ClientContextProvider>
    ) : (
        <>
            <GlobalStyle />
            <LoadingPage />
        </>
    );
};

<<<<<<< HEAD:src/HttpClient.tsx
export default HttpClient;
=======
export default Client;
>>>>>>> dev:src/AppClient.tsx
