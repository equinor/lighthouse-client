import styled from 'styled-components';
import { defaultGroupByFn, Table, TableData, useColumns } from '@equinor/Table';
import { PopupFilter } from '../../../Filter/Components/PopoutFilter/PopupFilter';
import { useDataContext } from '../Context/DataProvider';
import { useFilter } from '../../../Filter/Hooks/useFilter';

const Wrapper = styled.section`
    /* overflow: scroll; */
`;

export const ListTab = () => {
    const { filteredData } = useFilter();
    const { tableOptions, setSelected } = useDataContext();
    const columns = useColumns(filteredData[0] as TableData, {
        customCellView: tableOptions?.customCellView,
        headers: tableOptions?.headers,
        customColumns: tableOptions?.customColumns,
    });
    const hiddenCols = tableOptions?.hiddenColumns === undefined ? [] : tableOptions.hiddenColumns;
    return (
        <Wrapper>
            <Table<TableData>
                options={{
                    data: filteredData as TableData[],
                    columns,
                    enableSelectRow: tableOptions?.enableSelectRows,
                    onCellClick: tableOptions?.onCellClick,
                    initialState: {
                        hiddenColumns: hiddenCols,
                    },
                    columnOrder: tableOptions?.columnOrder,
                    setSelected,
                    groupByFn: defaultGroupByFn,
                }}
            /**
             * Temporary disabled
             */
            //FilterComponent={PopupFilter}
            />
        </Wrapper>
    );
};
