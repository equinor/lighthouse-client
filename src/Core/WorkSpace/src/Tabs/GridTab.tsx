import { ColumnApi, GridApi, GridOptions, SideBarDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { WorkspaceFilter } from '../Components/WorkspaceFilter/WorkspaceFilter';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useMemo, useState } from 'react';
import { useFilterApiContext } from '@equinor/filter';
import { useWorkSpace } from '@equinor/WorkSpace';
import { useDataContext } from '../Context/DataProvider';

export const GridTab = (): JSX.Element => {
    const { data } = useDataContext();
    const { gridOptions = { columnDefs: [] } } = useWorkSpace();

    const [gridApi, setGridApi] = useState<GridApi | null>(null);

    const {
        listeners: { registerOnFilterChangedCallback },
        operations: { doesFilterPassForItem },
    } = useFilterApiContext();

    return (
        <div>
            <WorkspaceFilter />
            <WorkspaceGrid
                gridOptions={{
                    ...gridOptions,
                    rowData: data,
                    doesExternalFilterPass: ({ data }) => doesFilterPassForItem(data),
                }}
                onGridReady={(s) => {
                    setGridApi(s);
                    registerOnFilterChangedCallback(() => s.onFilterChanged());
                }}
            />
        </div>
    );
};

interface WorkspaceGridProps {
    gridOptions: GridOptions;
    onGridReady?: (gridApi: GridApi, columnApi: ColumnApi) => void;
}

export const WorkspaceGrid = ({ gridOptions, onGridReady }: WorkspaceGridProps): JSX.Element => {
    const sideBar = useMemo<SideBarDef | string | string[] | boolean | null>(() => {
        return {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                },
                {
                    id: 'filters',
                    labelDefault: 'Filters',
                    labelKey: 'filters',
                    iconKey: 'filter',
                    toolPanel: 'agFiltersToolPanel',
                },
            ],
            defaultToolPanel: 'columns',
        };
    }, []);

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
                        sideBar={sideBar}
                        onGridReady={(ev) => {
                            onGridReady && onGridReady(ev.api, ev.columnApi);
                        }}
                        gridOptions={gridOptions}
                    />
                </div>
            </div>
        </div>
    );
};
