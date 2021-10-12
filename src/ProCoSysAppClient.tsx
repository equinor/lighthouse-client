
import { authProvider, useAuthenticate } from "@equinor/authentication";
import { graphClint } from "@equinor/http-client";
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



export const graph = graphClint(authProvider)


const ProCoSysAppClient: React.FC = (): JSX.Element => {

    const isAuthenticated = useAuthenticate(authProvider)

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


