import { ColDef, GridOptions, SideBarDef } from 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
import { WorkspaceFilter } from '../Components/WorkspaceFilter/WorkspaceFilter';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { useMemo, useState } from 'react';
import { useFilterApiContext } from '@equinor/filter';
import { ScopeChangeRequest } from '../../../../apps/ScopeChangeRequest/types/scopeChangeRequest';
import { useWorkSpace } from '@equinor/WorkSpace';

function createColumnDef<T>(
    title: string,
    valueFormatter: (i: T) => string | number | boolean,
    onSelect?: (item: T) => void,
    options?: Omit<ColDef, 'field' | 'valueFormatter'>
): ColDef {
    return {
        resizable: true,
        onCellClicked: (s) => onSelect && onSelect(s.data),
        minWidth: 100,
        sortable: true,
        enableRowGroup: true,
        aggFunc: (s) => valueFormatter(s.data),
        ...options,
        field: title,
        valueGetter: (s) => valueFormatter(s.data),
    };
}

export const GridTab = (): JSX.Element => {
    return (
        <div>
            <WorkspaceFilter />
            <WorkspaceGrid />
        </div>
    );
};

const makeGridOptions = (data: unknown[], onSelect: (item: unknown) => void): GridOptions => ({
    rowData: data,
    columnDefs: [
        createColumnDef<ScopeChangeRequest>('ID', (s) => s?.sequenceNumber, onSelect, {
            sortable: true,
        }),
        createColumnDef<ScopeChangeRequest>('Title', (s) => s.title, onSelect, {
            sortable: true,
        }),
        createColumnDef<ScopeChangeRequest>('IsVoided', (s) => s.isVoided, onSelect, {
            sortable: true,
        }),
    ],
});

export const WorkspaceGrid = (): JSX.Element => {
    const {
        filterState: { getFilteredData },
    } = useFilterApiContext();

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

    const [gridApi, setGridApi] = useState<object | null>(null);
    const [columnApi, setColumnApi] = useState<object | null>(null);

    const { onSelect } = useWorkSpace();

    const containerStyle = useMemo(() => ({ width: '1400px', height: '1200px' }), []);
    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    if (!onSelect) {
        return <></>;
    }

    return (
        <div style={containerStyle}>
            <div style={{ height: '100%', boxSizing: 'border-box' }}>
                <div style={gridStyle} className="ag-theme-alpine">
                    <AgGridReact
                        headerHeight={32}
                        sideBar={sideBar}
                        setGridApi={(gridApi, columnApi) => {
                            setGridApi(gridApi);
                            setColumnApi(columnApi);
                        }}
                        gridOptions={makeGridOptions(getFilteredData(), onSelect)}
                    />
                </div>
            </div>
        </div>
    );
};
