import { PopupFilter, useFilteredData } from '@equinor/filter';
import { defaultGroupByFn, Table, TableData, useColumns } from '@equinor/Table';
import styled from 'styled-components';
import { useElementData } from '../../../../packages/Utils/Hooks/useElementData';
import { useDataContext } from '../Context/DataProvider';

const Wrapper = styled.section`
    /* overflow: scroll; */
`;

export const ListTab = (): JSX.Element => {
    const { data } = useFilteredData<TableData>();
    const { tableOptions } = useDataContext();

    const [ref, { awaitableHeight }] = useElementData();

    const columns = useColumns(data[0], {
        customCellView: tableOptions?.customCellView,
        headers: tableOptions?.headers,
        customColumns: tableOptions?.customColumns,
        hiddenColumnsCount: tableOptions?.hiddenColumns?.length,
    });
    const hiddenCols = tableOptions?.hiddenColumns === undefined ? [] : tableOptions.hiddenColumns;

    return (
        <Wrapper ref={ref}>
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
                    groupByFn: defaultGroupByFn,
                    onSelect: tableOptions?.onSelect,
                }}
                FilterComponent={PopupFilter}
                height={awaitableHeight - 70}
            />
        </Wrapper>
    );
};
