
import { AuthenticationProvider, useAuthenticate } from "@equinor/authentication";
import { AppConfig } from "@equinor/lighthouse-conf";
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { MainLayout } from "./components/Layouts/MainLayout";
import { Routes } from "./components/Routes/Routes";
import ProCoSysTopBar from "./components/TopBar/TopBar";
import { ClientContextProvider } from './context/clientContext';







const GlobalStyle = createGlobalStyle`
body {
    font-family: Equinor;
    margin: 0;
  }
`

interface ProCoSysAppClientProps {
    appConfig: AppConfig;
    authProvider: AuthenticationProvider
}





const ProCoSysAppClient: React.FC<ProCoSysAppClientProps> = ({ appConfig, authProvider }: ProCoSysAppClientProps): JSX.Element => {


    const isAuthenticated = useAuthenticate(authProvider)

    return isAuthenticated ? (
        <ClientContextProvider {...{ appConfig, authProvider }}>
            <Router>
                <GlobalStyle />
                <ProCoSysTopBar />
                {/* <AppsPanel /> */}
                <MainLayout>
                    <Routes />
                </MainLayout>
            </Router>
        </ClientContextProvider>
    ) : (
        <>
            Hello
            {/* <GlobalStyle />
            <LoadingPage /> */}
        </>
    );
};

export default ProCoSysAppClient;


