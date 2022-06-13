import { useState, useRef, MutableRefObject, useEffect } from 'react';
import { useOutsideClick } from '@equinor/hooks';

import { useRefresh } from '../../../../../components/ParkView/hooks/useRefresh';
import { ClickableIcon } from '../../../../Components/Icon';
import { ColumnLabel, MenuItem, WrapperDiv } from './columnPicker.styles';
import { TableAPI, TableData } from '@equinor/Table';
import { useWorkSpace } from '../../../../../Core/WorkSpace/src';
import { ReactSortable } from 'react-sortablejs';
import styled from 'styled-components';
import { ColumnInstance } from 'react-table';
import { Checkbox } from '@equinor/eds-core-react';

interface ColumnPickerProps {
    getApi: () => TableAPI;
}

export const DraggableHandleSelector = 'globalDraggableHandle';

export const ColumnPicker = ({ getApi }: ColumnPickerProps): JSX.Element => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={containerRef}>
            <ColumnLabel onClick={() => setShowMenu((s) => !s)}>
                Columns <ClickableIcon name="chevron_down" />
            </ColumnLabel>

            {showMenu && (
                <ColumnMenuPicker
                    getApi={getApi}
                    closeMenu={() => setShowMenu(false)}
                    containerRef={containerRef}
                />
            )}
        </div>
    );
};

interface ColumnMenuPickerProps {
    getApi: () => TableAPI;
    closeMenu: () => void;
    containerRef: MutableRefObject<HTMLDivElement | null>;
}

const ColumnMenuPicker = ({ getApi, closeMenu, containerRef }: ColumnMenuPickerProps) => {
    useOutsideClick(containerRef, closeMenu);

    const refresh = useRefresh();

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
        <WrapperDiv>
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
                            <DraggableIconWrapper className={DraggableHandleSelector}>
                                <DraggableIcon />
                            </DraggableIconWrapper>

                            <div style={{ height: '48px', width: '20px' }}>
                                <Checkbox
                                    readOnly
                                    checked={getApi()
                                        .getVisibleColumns()

                                        .map((x) => x.id)
                                        .includes(id)}
                                />
                            </div>
                            <div>{Header?.toString()}</div>
                        </MenuItem>
                    );
                })}
            </ReactSortable>
        </WrapperDiv>
    );
};

const DraggableIconWrapper = styled.div`
    cursor: grab;
`;

export function DraggableIcon(): JSX.Element {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4 8C4 7.44772 4.44772 7 5 7H19C19.5523 7 20 7.44772 20 8C20 8.55228 19.5523 9 19 9H5C4.44772 9 4 8.55228 4 8Z"
                fill="#BEBEBE"
            />
            <path
                d="M4 12C4 11.4477 4.44772 11 5 11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H5C4.44772 13 4 12.5523 4 12Z"
                fill="#BEBEBE"
            />
            <path
                d="M5 15C4.44772 15 4 15.4477 4 16C4 16.5523 4.44772 17 5 17H19C19.5523 17 20 16.5523 20 16C20 15.4477 19.5523 15 19 15H5Z"
                fill="#BEBEBE"
            />
        </svg>
    );
}
