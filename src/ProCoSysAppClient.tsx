
import { authProvider, useAuthenticate } from "@equinor/authentication";
import { graphClint } from "@equinor/http-client";
import { BrowserRouter as Router } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { MainLayout } from "./components/Layouts/MainLayout";
import LoadingPage from './components/Loading/LoadingPage';
import AppsPanel from './components/Menu/AppPanel';
import { Routes } from './components/Routes/Routes';
import ProCoSysTopBar from "./components/TopBar/TopBar";
import { ClientContextProvider } from './context/clientContext';


async function getConfig() {
    const response = await fetch("https://pcs-config-non-prod-func.azurewebsites.net/api/MCWebApp/Auth?");
    const data = await response.json();
    console.log(data)
}



const GlobalStyle = createGlobalStyle`
body {
    font-family: Equinor;
    margin: 0;
  }
`



export const graph = graphClint(authProvider)


const ProCoSysAppClient: React.FC = (): JSX.Element => {

    const isAuthenticated = useAuthenticate(authProvider)

    return isAuthenticated ? (
        <ClientContextProvider>
            <Router>
                <GlobalStyle />
                <ProCoSysTopBar />
                <AppsPanel />
                <MainLayout>
                    <Routes />
                </MainLayout>
            </Router>
        </ClientContextProvider>
    ) : (
        <>
            <GlobalStyle />
            <LoadingPage />
        </>
    );
};

export default ProCoSysAppClient;


