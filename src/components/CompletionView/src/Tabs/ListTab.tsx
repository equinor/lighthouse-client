import styled from "styled-components";
// import { DataTable } from "../../../DataTable/Components/Table";
import { useFilteredData } from "../../../Filter";
import { DataTable } from "../../../Table/Components/Table";
import { useColumns } from "../../../Table/Hooks/useColumns";

const Wrapper = styled.section`
    /* overflow: scroll; */
`


export const ListTab = () => {

    const data = useFilteredData<Record<string, Object>>();
    const columns = useColumns(data[0])

    return (
        <Wrapper>
            <DataTable data={data} columns={columns} />
        </Wrapper>
    );
}
