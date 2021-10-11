
import { Configuration } from "@azure/msal-browser";
import { authenticationProvider, useAuthenticate } from "@equinor/authentication";
import { graphClint } from "@equinor/httpClient";
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import AppsPanel from './components/AppPanel/AppPanel';
import LoadingPage from './components/Loading/LoadingPage';
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

const Wrapper = styled.div`
    position: fixed;
    width: 100%;
    margin-top: 64px;
    overflow: auto;
    height: calc(100vh - 64px);
`

const clientId = "3becc69f-510a-411b-92a4-c0bf8d5ca588"
const tenant = "3aa4a235-b6e2-48d5-9195-7fcf05b459b0"
const authority = `https://login.microsoftonline.com/${tenant}`;

export const authConfig: Configuration = {

    auth: {
        authority: authority,
        clientId,
        redirectUri: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        navigateToLoginRequestUrl: true
    },
    cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: true
    }

};


export const provider = authenticationProvider(authConfig)

export const graph = graphClint(provider)


const ProCoSysAppClient: React.FC = (): JSX.Element => {

    const isAuthenticated = useAuthenticate(provider)

    return isAuthenticated ? (
        <ClientContextProvider>
            <Router>
                <GlobalStyle />
                <ProCoSysTopBar />
                <AppsPanel />
                <Wrapper>
                    <Routes />
                </Wrapper>
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


