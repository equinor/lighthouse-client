import { useResizeObserver } from '@equinor/hooks';
import { defaultGroupByFn, Table, TableAPI, TableData, useColumns } from '@equinor/Table';
import { MutableRefObject, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';

import { useFilterApiContext } from '../../../../../packages/Filter/Hooks/useFilterApiContext';
import { WorkspaceFilter } from '../../Components/WorkspaceFilter/WorkspaceFilter';
import { useDataContext } from '../../Context/DataProvider';
import { tabApis } from '../../Context/LocationProvider';
import { useWorkspaceBookmarks } from '../../Util/bookmarks/hooks';

const COLUMN_HEADER_HEIGHT = 32;
const Container = styled.div`
    display: grid;
    grid-template-rows: auto 1fr;
    height: 100%;
`;
const Wrapper = styled.section`
    margin: 16px;
    overflow-y: hidden;
    overflow-x: scroll;
`;
const getHiddenColumns = (
    getApi: MutableRefObject<GetTableApi | null>,
    hiddenColumns: PropertyKey[] | undefined
) => {
    if (getApi.current && getApi.current().getHiddenColumns().length > 0) {
        return getApi.current().getHiddenColumns();
    } else if (hiddenColumns) {
        return hiddenColumns;
    } else {
        return [];
    }
};
export type GetTableApi = () => TableAPI;

export const ListTab = (): JSX.Element => {
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();

    const data = getFilteredData() as TableData[];
    const { tableOptions } = useDataContext();

    useWorkspaceBookmarks();

    const ref = useRef<HTMLDivElement>(null);
    const [_width, height] = useResizeObserver(ref);

    const columns = useColumns(data[0], Boolean(tableOptions?.preventAutoGenerateColumns), {
        customCellView: tableOptions?.customCellView,
        headers: tableOptions?.headers,
        customColumns: tableOptions?.customColumns,
        hiddenColumnsCount: tableOptions?.hiddenColumns?.length,
    });

    const getApi = useRef<GetTableApi | null>(null);

    const initApi = (a: GetTableApi) => {
        getApi.current = a;
        tabApis.updateAtom({ table: { getApi: a } });
    };

    const onSelect = useCallback(
        (item: any, id: string) => {
            tableOptions?.onSelect && tableOptions.onSelect(item, id);
            getApi.current && getApi.current().setSelectedRowId(id);
        },
        [tableOptions]
    );

    const options = useMemo(
        () => ({
            columns: columns,
            enableSelectRow: tableOptions?.enableSelectRows,
            onCellClick: tableOptions?.onCellClick,
            initialState: {
                hiddenColumns: getHiddenColumns(getApi, tableOptions?.hiddenColumns) as string[],
            },
            columnOrder: tableOptions?.columnOrder,
            groupByFn: defaultGroupByFn,
            onSelect: onSelect,
        }),
        [
            columns,
            onSelect,
            tableOptions?.columnOrder,
            tableOptions?.enableSelectRows,
            tableOptions?.hiddenColumns,
            tableOptions?.onCellClick,
        ]
    );

    return (
        <Container>
            <WorkspaceFilter />

            <Wrapper ref={ref}>
                <Table<TableData>
                    data={data}
                    columns={options.columns}
                    onTableReady={initApi}
                    options={options}
                    height={height - COLUMN_HEADER_HEIGHT}
                    itemSize={tableOptions?.itemSize}
                />
            </Wrapper>
        </Container>
    );
};
