import { useAuthenticate } from '@equinor/authentication';
import { tokens } from '@equinor/eds-tokens';
import { Client as ClientProps, ClientContextProvider } from '@equinor/portal-client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { MainLayout } from './components/Layouts/MainLayout';
import LoadingPage from './components/Loading/LoadingPage';
import { ClientRoutes } from './components/Routes/Routes';
import ProCoSysTopBar from './components/TopBar/TopBar';
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

const Client: React.FC<ClientProps> = ({ authProvider, registry }: ClientProps): JSX.Element => {
    const isAuthenticated = useAuthenticate(authProvider);
    const queryClient = new QueryClient();

    return isAuthenticated ? (
        <QueryClientProvider client={queryClient}>
            <GlobalStyle />
            <ConfirmationDialog />
            <ClientContextProvider>
                <BrowserRouter>
                    <ProCoSysTopBar />
                    <MainLayout manifests={registry}>
                        <ClientRoutes manifests={registry} />
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
