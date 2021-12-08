import styled from 'styled-components';
// import { DataTable } from "../../../DataTable/Components/Table";
import { useFilteredData } from '../../../Filter';
import { PopupFilter } from '../../../Filter/Components/PopoutFilter/PopupFilter';
import { DataTable } from '../../../Table/Components/Table';
import { useColumns } from '../../../Table/Hooks/useColumns';
import { TableData } from '../../../Table/types';
import { useDataContext } from '../Context/DataProvider';

const Wrapper = styled.section`
    /* overflow: scroll; */
`;

export const ListTab = () => {
    const { data } = useFilteredData<TableData>();
    const { tableOptions, setSelected } = useDataContext();
    const columns = useColumns(data[0], tableOptions?.customColumns);
    const hiddenCols = tableOptions?.hiddenColumns === undefined ? [] : tableOptions.hiddenColumns;
    return (
        <Wrapper>
            <DataTable
                options={{
                    data,
                    columns,
                    enableSelectRow: tableOptions?.enableSelectRows,
                    onCellClick: tableOptions?.onCellClick,
                    initialState: {
                        hiddenColumns: hiddenCols,
                    },
                    setSelected,
                }}
                FilterComponent={PopupFilter}
            />
        </Wrapper>
    );
};
