import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import styled from 'styled-components';
import { Checkbox } from '@equinor/eds-core-react';
import { TableAPI, TableData } from '@equinor/Table';
import { ColumnInstance } from 'react-table';

import { MenuItem } from './columnPicker.styles';
import { useWorkSpace } from '@equinor/WorkSpace';
import { tokens } from '@equinor/eds-tokens';

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
                        <MenuItem key={id}>
                            <FilterItemWrap className={DraggableHandleSelector}>
                                <div style={{ height: '48px', width: '20px' }}>
                                    <Checkbox
                                        size={12}
                                        readOnly
                                        checked={getApi()
                                            .getVisibleColumns()
                                            .map((x) => x.id)
                                            .includes(id)}
                                        onChange={() => getApi().toggleHideColumn(id)}
                                    />
                                </div>
                                <div style={{ fontSize: '13px' }}>{Header?.toString()}</div>
                            </FilterItemWrap>
                        </MenuItem>
                    );
                })}
            </ReactSortable>
        </>
    );
};

export const FilterItemWrap = styled.div`
    grid-template-columns: 1fr 2fr;
    width: 200px;
    display: grid;
    align-items: center;
    /* padding-top: 2px;
    padding-bottom: 2px; */
    > span {
        padding: 0px;

        > svg {
            width: 18px;
            height: 18px;
        }

        :first-child {
            padding-right: 2px;
        }
    }
    :hover {
        cursor: grab;
        background-color: ${tokens.colors.interactive.primary__selected_hover.rgba};
    }
`;
