import { NavigationView } from "@equinor/lighthouse-components";
import styled from "styled-components";
import { DataView } from "../DataView/DataView";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    /* padding: 16px; */
    align-items: flex-start;
`

export const HomePage = () => {

    return (<>
        <Wrapper>
            <NavigationView />
            {/* <Dashboard /> */}
            <DataView />
        </Wrapper>

    </>
    );
}