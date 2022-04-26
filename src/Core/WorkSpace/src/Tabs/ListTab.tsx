import { defaultGroupByFn, Table, TableData, useColumns } from '@equinor/Table';
import styled from 'styled-components';
import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';
import { useElementData } from '../../../../packages/Utils/Hooks/useElementData';
import { useDataContext } from '../Context/DataProvider';

const Wrapper = styled.section`
    margin: 16px;
    overflow-y: auto;
`;

export const ListTab = (): JSX.Element => {
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();

    const data = getFilteredData() as TableData[];
    const { tableOptions } = useDataContext();

    const [ref, { awaitableHeight,  }] = useElementData();

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
                height={awaitableHeight - 58}
                itemSize={tableOptions?.itemSize}
            />
        </Wrapper>
    );
};
