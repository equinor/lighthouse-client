import { AuthenticationProvider, useAuthenticate } from '@equinor/authentication';
import { tokens } from '@equinor/eds-tokens';
import { AppConfig } from '@equinor/lighthouse-conf';
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
interface ProCoSysAppClientProps {
    appConfig: AppConfig;
    authProvider: AuthenticationProvider;
}

const ProCoSysAppClient: React.FC<ProCoSysAppClientProps> = ({
    appConfig,
    authProvider,
}: ProCoSysAppClientProps): JSX.Element => {
    const isAuthenticated = useAuthenticate(authProvider);

    return isAuthenticated ? (
        <ClientContextProvider {...{ appConfig, authProvider }}>
            <Router>
                <GlobalStyle />
                <ProCoSysTopBar />
                <MainLayout>
                    <Routes />
                </MainLayout>
            </Router>
            <FactoryComponent />
        </ClientContextProvider>
    ) : (
        <>
            <GlobalStyle />
            <LoadingPage />
        </>
    );
};

export default ProCoSysAppClient;
