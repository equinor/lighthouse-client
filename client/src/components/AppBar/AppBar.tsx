import { useApps } from "@equinor/lighthouse-hooks";
import styled from "styled-components";
import AppIcon from "../AppIcon/AppIcon";



const AppsWrapper = styled.div`
    height: calc(100vh - 80px); 
    width: min-content;
    display: flex;
    flex-direction: column;
    border-right: 1.5px solid #efefef;
    padding: 8px;
    position: absolute;
`

const AppsBar = () => {
    const { appsCompletionProcesses } = useApps();

    return (
        <AppsWrapper>
            {appsCompletionProcesses.map(({ ...app }, index) => <AppIcon key={`${app.title}-${index}`} {...app} />)}
        </AppsWrapper>
    );


}

export default AppsBar;