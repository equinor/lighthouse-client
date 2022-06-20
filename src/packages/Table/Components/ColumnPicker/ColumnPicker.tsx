import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Checkbox } from '@equinor/eds-core-react';
import { TableAPI, TableData } from '@equinor/Table';
import { ColumnInstance } from 'react-table';

import { MenuItem } from './columnPicker.styles';
import { useWorkSpace } from '@equinor/WorkSpace';

export const DraggableHandleSelector = 'globalDraggableHandle';

interface ColumnMenuPickerProps {
    getApi: () => TableAPI;
}

export const ColumnMenuPicker = ({ getApi }: ColumnMenuPickerProps): JSX.Element | null => {
    const { tableOptions } = useWorkSpace();

    const tableApi = getApi();
    const updateList = (workflowSteps: ColumnInstance<TableData, TableData>[]) => {
        tableApi.setColumnOrder(workflowSteps.map((s) => s.id));
    };

    const hiddenCols = tableOptions?.hiddenColumns ?? ([] as string[]);
    const [list, setList] = useState<ColumnInstance<TableData, TableData>[]>(
        tableApi.getColumns().filter((s) => !hiddenCols?.includes(s.id ?? ''))
    );

    if (!tableOptions) return null;

    return (
        <>
            <ReactSortable
                animation={200}
                handle={`.${DraggableHandleSelector}`}
                list={list}
                setList={(s) => setList(s)}
                onEnd={() => {
                    updateList(list);
                }}
            >
                {list.map(({ id, Header }) => {
                    return (
                        <MenuItem className={DraggableHandleSelector} key={id}>
                            <div style={{ height: '48px', width: '20px' }}>
                                <Checkbox
                                    readOnly
                                    checked={getApi()
                                        .getVisibleColumns()
                                        .map((x) => x.id)
                                        .includes(id)}
                                    onChange={() => getApi().toggleHideColumn(id)}
                                />
                            </div>
                            <div>{Header?.toString()}</div>
                        </MenuItem>
                    );
                })}
            </ReactSortable>
        </>
    );
};
