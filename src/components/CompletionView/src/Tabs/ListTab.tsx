import styled from "styled-components";
import { ListView } from "../../../DataView/DataView";

const Wrapper = styled.section`
    overflow: scroll;
`

export const ListTab = () => {
    return (
        <Wrapper>
            <ListView />
        </Wrapper>
    );
}