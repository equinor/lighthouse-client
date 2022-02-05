import styled from 'styled-components';
import { renderToStaticMarkup } from 'react-dom/server';

import 'ag-grid-enterprise/dist/styles/ag-grid.css';
import 'ag-grid-enterprise/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from '@ag-grid-community/react';

import { useEffect, useMemo, useState } from 'react';
import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { closeSidesheet, openSidesheet } from '../../../../packages/Sidesheet/Functions';
import { tokens } from '@equinor/eds-tokens';
import { TableOptions } from '../../../../Core/WorkSpace/src/WorkSpaceApi/State';
import { buildColumnDef } from '../Utils/buildColumnDef';
import { SidesheetListView } from './SideSheetListView';
import { IconMenu, MenuItem } from './IconMenu';
import {
    AllModules,
    ChartType,
    ColumnApi,
    GridApi,
    GridReadyEvent,
    RowClickedEvent,
    SelectionChangedEvent,
} from '@ag-grid-enterprise/all-modules';

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
        params.columnApi.autoSizeAllColumns();
    };

    const actions: () => MenuItem[] = () => {
        const actionBuilder: MenuItem[] = [];

        actionBuilder.push({ label: 'Export to csv', onClick: () => gridApi?.exportDataAsCsv() });
        actionBuilder.push({
            label: 'Export to excel',
            onClick: () => gridApi?.exportDataAsExcel(),
        });

        actionBuilder.push({
            label: 'Reset columns',
            onClick: () => gridColumnApi?.resetColumnState(),
        });

        actionBuilder.push({
            label: `${gridApi?.isSideBarVisible() ? 'Hide' : 'Show'} sidebar`,
            onClick: () => gridApi?.setSideBarVisible(!gridApi.isSideBarVisible()),
        });

        actionBuilder.push({
            label: "Autosize all columns",
            onClick: () => gridColumnApi?.autoSizeAllColumns(),
        })


        if (gridApi?.isAnyFilterPresent()) {
            actionBuilder.push({
                label: 'Reset filter',
                onClick: () => {
                    gridApi.setFilterModel({});
                },
            });
        }

        return actionBuilder;
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

    useEffect(() => {
        gridApi?.sizeColumnsToFit();
    }, [gridApi]);

    if (data.length === 0) {
        return null;
    }
    const columnDefs = buildColumnDef(data[0], options?.columnDefinition);

    function selectionChanged(props: SelectionChangedEvent) {
        // eslint-disable-next-line react/prop-types
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


    return (
        <GridContainer className="ag-theme-alpine">
            <Inline>
                <IconMenu items={actions} />
                <Button variant="outlined" onClick={() => setFloatingFilter((prev) => !prev)}>
                    Toggle floating filter
                </Button>
            </Inline>

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
                    initialHide: true,
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
    height: 82vh;
    width: 95vw;
`;

const Inline = styled.div`
    display: flex;
    align-items: center;
`;
