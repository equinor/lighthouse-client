import styled from "styled-components";
import { DataTable } from "../../../DataTable/Components/Table";
import { useFilteredData } from "../../../Filter";
import { useDataContext } from "../Context/DataProvider";

const Wrapper = styled.section`
    overflow: scroll;
`


export const ListTab = () => {

    const data = useFilteredData();
    const { setSelected, tableOptions } = useDataContext()

    return (
        <Wrapper>
            <DataTable data={data} setSelected={setSelected} tableOptions={tableOptions} />
        </Wrapper>
    );
}
