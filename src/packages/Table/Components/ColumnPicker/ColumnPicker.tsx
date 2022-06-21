import { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { Checkbox, Icon } from '@equinor/eds-core-react';
import { TableAPI, TableData } from '@equinor/Table';
import { ColumnInstance } from 'react-table';

import { MenuItem } from './columnPicker.styles';
import { useWorkSpace } from '@equinor/WorkSpace';
import styled from 'styled-components';
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
                        <WrapperDiv className={DraggableHandleSelector} key={id}>
                            <div>
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
                            <Icon
                                id={'dragIcon'}
                                name="drag_handle"
                                color={tokens.colors.interactive.primary__resting.hex}
                            />
                        </WrapperDiv>
                    );
                })}
            </ReactSortable>
        </>
    );
};

const WrapperDiv = styled.div`
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    height: 48px;
    width: 200px;
    cursor: grab;
    #dragIcon {
        visibility: hidden;
    }

    &:hover #dragIcon {
        visibility: visible;
    }
`;
