

import { useApps } from "@equinor/lighthouse-hooks";
import styled from "styled-components";
import useClientContext from "../../context/clientContext";
import AppIcon from "../AppIcon/AppIcon";


interface AppsPanelWrapperProps {
    panelActive: boolean;
}

const AppsPanelWrapper = styled.div`
    margin-top: 64px;
    height: calc(100vh - 80px); 
    width: 372px;
    display: flex;
    flex-direction: column;
    border-right: 1.5px solid #efefef;
    padding: 8px;
    position: absolute;
    box-shadow: 4px 0px 10px rgba(0, 0, 0, 0.25);
    left:  ${({ panelActive }: AppsPanelWrapperProps) => panelActive ? "0px" : "-400px"};
    opacity:  ${({ panelActive }: AppsPanelWrapperProps) => panelActive ? 1 : 0};
    transition: all 0.5s ease;
    background: #ffffff;
    z-index: 1;
`

const Title = styled.h3`

    font-weight: 500;
`


const SectionTitle = styled.h4`
    margin: 8px;
    font-weight: 500;
`

const AppList = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
`

const AppsPanel = () => {
    const { appsAdministration, appsCompletionProcesses, appsSupportCapabilities } = useApps();
    const { appsPanelActive } = useClientContext()

    return (
        <AppsPanelWrapper panelActive={appsPanelActive}>
            <Title>Apps</Title>
            <SectionTitle>Completion processes</SectionTitle>
            <AppList>
                {appsCompletionProcesses.map((app) => <AppIcon key={app.title} {...app} label={app.title} />)}
            </AppList>
            <SectionTitle>Support capabilities</SectionTitle>
            <AppList>
                {appsSupportCapabilities.map((app) => <AppIcon key={app.title} {...app} label={app.title} />)}
            </AppList>

            <SectionTitle>Administration</SectionTitle>
            <AppList>
                {appsAdministration.map((app) => <AppIcon key={app.title} {...app} label={app.title} />)}
            </AppList>
        </AppsPanelWrapper>
    );


}

export default AppsPanel;