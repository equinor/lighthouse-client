import { ColumnApi, GridApi, GridOptions } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { WorkspaceFilter } from '../Components/WorkspaceFilter/WorkspaceFilter';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useMemo, useState } from 'react';
import { useFilterApiContext } from '@equinor/filter';
import { useWorkSpace } from '@equinor/WorkSpace';
import { useDataContext } from '../Context/DataProvider';
import { QueryClient, useQueryClient } from 'react-query';
import { Button } from '@equinor/eds-core-react';
import { TableConfigBar } from '../../../../packages/Table/Components/TableConfigBar/TableConfigBar';

export const GridTab = (): JSX.Element => {
    const { data } = useDataContext();
    const { gridOptions = { columnDefs: [] } } = useWorkSpace();

    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const [columnApi, setColumnApi] = useState<ColumnApi | null>(null);

    const {
        listeners: { registerOnFilterChangedCallback },
        operations: { doesFilterPassForItem },
    } = useFilterApiContext();

    const gridContext = useGridContext();

    return (
        <div>
            <Button
                onClick={() => {
                    // gridApi?.redrawRows();
                }}
            >
                Row data changed
            </Button>
            <WorkspaceFilter />

            <TableConfigBar columnApi={columnApi} />

            <WorkspaceGrid
                gridOptions={{
                    ...gridOptions,
                    rowData: data,
                    doesExternalFilterPass: ({ data }) => doesFilterPassForItem(data),
                    sideBar: true,
                }}
                onGridReady={(s, a) => {
                    a.autoSizeAllColumns();
                    setGridApi(s);
                    setColumnApi(a);
                    registerOnFilterChangedCallback(() => s.onFilterChanged());
                }}
                context={gridContext}
            />
        </div>
    );
};

interface WorkspaceGridProps {
    gridOptions: GridOptions;
    onGridReady?: (gridApi: GridApi, columnApi: ColumnApi) => void;
    context?: GridContext;
}

export const WorkspaceGrid = ({
    gridOptions,
    onGridReady,
    context,
}: WorkspaceGridProps): JSX.Element => {
    const containerStyle = useMemo(() => ({ width: '97vw', height: '1000px' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    return (
        <div style={containerStyle}>
            <div style={{ height: '100%', boxSizing: 'border-box' }}>
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        paginationAutoPageSize
                        pagination={true}
                        headerHeight={32}
                        isExternalFilterPresent={() => true}
                        onGridReady={(ev) => {
                            onGridReady && onGridReady(ev.api, ev.columnApi);
                        }}
                        context={context}
                        gridOptions={gridOptions}
                    />
                </div>
            </div>
        </div>
    );
};

export interface GridContext {
    workspaceName: string;
    refetchData: () => void;
    queryClient: QueryClient;
}

const useGridContext = (): GridContext => {
    const queryClient = useQueryClient();
    const { name } = useWorkSpace();

    return {
        queryClient,
        refetchData: () => queryClient.invalidateQueries(name),
        workspaceName: name,
    };
};
