import { Row } from 'react-table';
import styled from 'styled-components';
import { Table, TableData, useColumns } from '@equinor/Table';
import { useFilteredData } from '../../../Filter';
import { PopupFilter } from '../../../Filter/Components/PopoutFilter/PopupFilter';
import { useDataContext } from '../Context/DataProvider';

const Wrapper = styled.section`
    /* overflow: scroll; */
`;
/**
 * If the values property is not a primitive, the grouping will not work
 * as expected. Since the accessor in some cases returns complex objects
 * (which will be put in the values property) we need to access a primitive value
 * in order to group correctly.
 */
function defaultGroupByFn(rows: Row<TableData>[], columnId: string) {
    return rows.reduce((prev, row, _i) => {
        // TODO investigate if content[columnId] (original value) is good enough
        const resKey =
            typeof row.values[columnId] === 'object'
                ? `${row.values[columnId].content[columnId]}`
                : `${row.values[columnId]}`;
        prev[resKey] = Array.isArray(prev[resKey]) ? prev[resKey] : [];
        prev[resKey].push(row);
        return prev;
    }, {});
}
export const ListTab = () => {
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
                    setSelected,
                    groupByFn: defaultGroupByFn,
                }}
                FilterComponent={PopupFilter}
            />
        </Wrapper>
    );
};
