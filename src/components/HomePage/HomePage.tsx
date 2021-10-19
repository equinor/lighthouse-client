import styled from "styled-components";
import { CompletionView } from "../CompletionView/src/CompletionView";


const Wrapper = styled.div`
 
`

export const HomePage = (props) => {

    return (
        <>
            <Wrapper>
                {/* <NavigationView /> */}
                {/* <Dashboard /> */}
                {/* <DataView /> */}
                {/* <Garden /> */}
                {/* {<PowerBI />} */}
                <CompletionView {...props} />
            </Wrapper>

        </>
    );
}


