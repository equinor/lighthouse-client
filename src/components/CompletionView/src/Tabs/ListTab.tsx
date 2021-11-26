import styled from "styled-components";
// import { DataTable } from "../../../DataTable/Components/Table";
import { useFilteredData } from "../../../Filter";
import { PopupFilter } from "../../../Filter/Components/PopoutFilter/PopupFilter";
import { DataTable } from "../../../Table/Components/Table";
import { useColumns } from "../../../Table/Hooks/useColumns";
import { useDataContext } from "../Context/DataProvider";

const Wrapper = styled.section`
    /* overflow: scroll; */
`


export const ListTab = () => {

    const { data } = useFilteredData<Record<string, Object>>();
    const { setSelected } = useDataContext()
    const columns = useColumns(data[0])

    return (
        <Wrapper>
            <DataTable data={data} columns={columns} FilterComponent={PopupFilter} setSelected={setSelected} />
        </Wrapper>
    );
}
