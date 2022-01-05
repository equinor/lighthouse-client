import { useFilteredData } from '@equinor/filter';
import { defaultGroupByFn, Table, TableData, useColumns } from '@equinor/Table';
import styled from 'styled-components';
import { PopupFilter } from '../../../../packages/Filter/Components/PopoutFilter/PopupFilter';
import { useDataContext } from '../Context/DataProvider';

const Wrapper = styled.section`
    /* overflow: scroll; */
`;

export const ListTab = (): JSX.Element => {
    const { data } = useFilteredData<TableData>();
    const { tableOptions, setSelected } = useDataContext();
    const columns = useColumns(data[0], {
        customCellView: tableOptions?.customCellView,
        headers: tableOptions?.headers,
        customColumns: tableOptions?.customColumns,
    });
    const hiddenCols = tableOptions?.hiddenColumns === undefined ? [] : tableOptions.hiddenColumns;
    return (
        <Wrapper>
            <Table<TableData>
                options={{
                    data,
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
                FilterComponent={PopupFilter}
            />
        </Wrapper>
    );
};
