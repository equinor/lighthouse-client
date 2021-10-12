import { NavigationView } from "@equinor/lighthouse-components";
import styled from "styled-components";
import { PowerBI } from "../../modules/powerBI";


const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    /* padding: 16px; */
    width: 100%;
    height: calc(100vh - 64px);
    align-items: flex-start;
`

export const HomePage = () => {

    return (<>
        <Wrapper>
            <NavigationView />
            {/* <Dashboard /> */}
            {/* <DataView /> */}
            {/* <Garden /> */}
            {<PowerBI />}
        </Wrapper>

    </>
    );
}


