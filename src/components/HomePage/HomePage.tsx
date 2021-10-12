import styled from "styled-components";
import { CompletionView } from "../CompletionView/src/CompletionView";


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
            {/* <NavigationView /> */}
            {/* <Dashboard /> */}
            {/* <DataView /> */}
            {/* <Garden /> */}
            {/* {<PowerBI />} */}
            <CompletionView />
        </Wrapper>

    </>
    );
}


