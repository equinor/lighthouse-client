import { AuthenticationProvider, useAuthenticate } from '@equinor/authentication';
import { tokens } from '@equinor/eds-tokens';
import { AppConfig } from '@equinor/lighthouse-conf';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { MainLayout } from './components/Layouts/MainLayout';
import LoadingPage from './components/Loading/LoadingPage';
import { Routes } from './components/Routes/Routes';
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
interface HttpClientProps {
    appConfig: AppConfig;
    authProvider: AuthenticationProvider;
}

const HttpClient: React.FC<HttpClientProps> = ({
    appConfig,
    authProvider,
}: HttpClientProps): JSX.Element => {
    const isAuthenticated = useAuthenticate(authProvider);
    const queryClient = new QueryClient();

    return isAuthenticated ? (
        <ClientContextProvider {...{ appConfig, authProvider }}>
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
        </ClientContextProvider>
    ) : (
        <>
            <GlobalStyle />
            <LoadingPage />
        </>
    );
};

export default HttpClient;
