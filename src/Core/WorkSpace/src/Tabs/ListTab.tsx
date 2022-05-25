import { useSideSheet } from '@equinor/sidesheet';
import { defaultGroupByFn, Table, TableAPI, TableData, useColumns } from '@equinor/Table';
import { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useFilterApiContext } from '../../../../packages/Filter/Hooks/useFilterApiContext';
import { useElementData } from '../../../../packages/Utils/Hooks/useElementData';
import { WorkspaceFilter } from '../Components/WorkspaceFilter/WorkspaceFilter';
import { useDataContext } from '../Context/DataProvider';
import { useWorkspaceBookmarks } from '../Util/bookmarks/hooks';

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
    useWorkspaceBookmarks();

    const [ref, { awaitableHeight }] = useElementData();

    const columns = useColumns(data[0], {
        customCellView: tableOptions?.customCellView,
        headers: tableOptions?.headers,
        customColumns: tableOptions?.customColumns,
        hiddenColumnsCount: tableOptions?.hiddenColumns?.length,
    });
    const hiddenCols = tableOptions?.hiddenColumns === undefined ? [] : tableOptions.hiddenColumns;

    const getApi = useRef<(() => TableAPI) | null>(null);

    const initApi = (a: () => TableAPI) => (getApi.current = a);

    const onSelect = useCallback(
        (item: any, id: string) => {
            tableOptions?.onSelect && tableOptions.onSelect(item, id);
            getApi.current && getApi.current().setSelectedRowId(id);
        },
        [getApi, tableOptions]
    );

    useClearSelectedOnSidesheetClose(getApi.current);

    return (
        <>
            <WorkspaceFilter />
            <Wrapper ref={ref}>
                <Table<TableData>
                    onTableReady={initApi}
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
                        onSelect: onSelect,
                    }}
                    height={awaitableHeight - 58}
                    itemSize={tableOptions?.itemSize}
                />
            </Wrapper>
        </>
    );
};

const useClearSelectedOnSidesheetClose = (getApi: (() => TableAPI) | null): void => {
    const { SidesheetComponent } = useSideSheet();

    useEffect(() => {
        if (!SidesheetComponent) {
            if (getApi !== null) {
                getApi().setSelectedRowId(() => null);
            }
        }
    }, [SidesheetComponent]);
};
