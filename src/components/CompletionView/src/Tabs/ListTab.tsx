import styled from "styled-components";
import { useFilteredData } from "../../../Filter";
import { ListView } from "../../../TableView/TableView";

const Wrapper = styled.section`
    overflow: scroll;
`


export const ListTab = () => {

    const data = useFilteredData();

    return (
        <Wrapper>
            <ListView data={data} />
        </Wrapper>
    );
}
