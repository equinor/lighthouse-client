
import { TreeRoot } from '@equinor/lighthouse-components';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import AppsPanel from './components/AppPanel/AppPanel';
import LoadingPage from './components/Loading/LoadingPage';
import { Routes } from './components/Routes/Routes';
import ProCoSysTopBar from "./components/TopBar/TopBar";
import { ClientContextProvider } from './context/clientContext';


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
`

const ProCoSysAppClient: React.FC = (): JSX.Element => {

    const [auth, setAuth] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setAuth(true);
        }, 300);
    })


    return auth ? (
        <ClientContextProvider>
            <Router>
                <GlobalStyle />
                <ProCoSysTopBar />
                <AppsPanel />
                <Wrapper>
                    <TreeRoot />
                    <div style={{ paddingLeft: "150px" }}>
                        <Routes />
                    </div>
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