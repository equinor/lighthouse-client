import styled from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';

import {
    AllModules,
    ColumnApi,
    GridApi,
    GridReadyEvent,
    RowClickedEvent,
    SelectionChangedEvent,
} from '@ag-grid-enterprise/all-modules';
import 'ag-grid-enterprise/dist/styles/ag-grid.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-alpine.css';

import { useEffect, useState } from 'react';
import { Button, Icon } from '@equinor/eds-core-react';
import { closeSidesheet, openSidesheet } from '../../../../packages/Sidesheet/Functions';
import { AgGridReact } from '@ag-grid-community/react';
import { tokens } from '@equinor/eds-tokens';
import { TableOptions } from '../../../../Core/WorkSpace/src/WorkSpaceApi/State';
import { buildColumnDef } from '../Utils/buildColumnDef';
import { SidesheetListView } from './SideSheetListView';

interface GridProps<T> {
    data: T[];
    options?: TableOptions<T>;
}

export function Grid<T>({ data, options }: GridProps<T>): JSX.Element | null {
    const [gridApi, setGridApi] = useState<GridApi | null>(null);
    const [gridColumnApi, setGridColumnApi] = useState<ColumnApi | null>(null);
    const [floatingFilter, setFloatingFilter] = useState(true);

    const onGridReady = (params: GridReadyEvent) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
    };

    useEffect(() => {
        if (gridApi) {
            gridApi.refreshCells();
            gridApi.redrawRows();
        }
    }, [data]);

    useEffect(() => {
        if (floatingFilter) {
            gridApi?.setFloatingFiltersHeight(40);
        } else {
            gridApi?.setFloatingFiltersHeight(0);
        }
    }, [floatingFilter]);

    if (data.length === 0) {
        return null;
    }
    const columnDefs = buildColumnDef(data[0], options?.columnDefinition);

    function selectionChanged(props: SelectionChangedEvent) {
        const selectedNodes = props.api.getSelectedRows();
        if (selectedNodes.length === 0) {
            closeSidesheet();
            return;
        }

        if (selectedNodes.length === 1) {
            options?.onSelect && options.onSelect(selectedNodes[0]);
            return;
        }
        openSidesheet(SidesheetListView, { data: selectedNodes });
    }

    function filterIcon() {
        const element = renderToStaticMarkup(
            <Icon name="filter_alt" color={tokens.colors.interactive.primary__resting.hex} />
        );
        return `<div>${element}</div>`;
    }

    function sortIcon() {
        return renderToStaticMarkup(
            <Icon name="sort" color={tokens.colors.interactive.primary__resting.hex} />
        );
    }

    function sortDescendingIcon() {
        return renderToStaticMarkup(<Icon name="chevron_down" />);
    }

    function sortAscendingIcon() {
        return renderToStaticMarkup(<Icon name="chevron_up" />);
    }

    // sortDescending;

    return (
        <GridContainer className="ag-theme-alpine">
            <Button variant="outlined" onClick={() => setFloatingFilter((prev) => !prev)}>
                Toggle floating filter
            </Button>
            <Button variant="outlined" onClick={() => gridApi?.exportDataAsCsv()}>
                Export to csv
            </Button>
            <Button variant="outlined" onClick={() => gridApi?.exportDataAsExcel()}>
                Export to excel
            </Button>
            <AgGridReact
                onRowClicked={(props: RowClickedEvent) =>
                    options?.onSelect
                        ? options?.onSelect(props.data)
                        : openSidesheet(undefined, props.data)
                }
                rowSelection="multiple"
                onSelectionChanged={selectionChanged}
                icons={{
                    filter: filterIcon,
                    sortUnSort: sortIcon,
                    sortDescending: sortDescendingIcon,
                    sortAscending: sortAscendingIcon,
                }}
                alwaysShowVerticalScroll
                onFilterChanged={(props) => console.log(props)}
                onFilterModified={(props) => console.log(props)}
                columnDefs={columnDefs as any}
                groupSelectsChildren={true}
                animateRows={true}
                enableRangeSelection={true}
                defaultColDef={{
                    flex: 1,
                    minWidth: 100,
                    enableValue: true,
                    enableRowGroup: true,
                    enablePivot: true,
                    sortable: true,
                    filter: true,
                    floatingFilter: true,
                }}
                sideBar={true}
                pagination={true}
                masterDetail={true}
                paginationPageSize={30}
                modules={AllModules}
                onGridReady={onGridReady}
                rowModelType={'clientSide'}
                rowData={data}
            >
                {/* {Object.keys(data[0]).map((x) => {
                   return <AgGridColumn key={x} field={x} sortable={true} filter={true}  />
                 })} */}
            </AgGridReact>
        </GridContainer>
    );
}

const GridContainer = styled.div`
    height: 88vh;
    width: 80vw;
`;
