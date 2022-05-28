import { useState, useRef, MutableRefObject } from 'react';
import { Checkbox } from '@equinor/eds-core-react';
import { useOutsideClick } from '@equinor/hooks';

import { useRefresh } from '../../../../../components/ParkView/hooks/useRefresh';
import { ClickableIcon } from '../../../../Components/Icon';
import { ColumnLabel, MenuItem, WrapperDiv } from './columnPicker.styles';
import { ColumnApi } from 'ag-grid-community';

interface ColumnPickerProps {
    columnApi: ColumnApi;
}

export const ColumnPicker = ({ columnApi }: ColumnPickerProps): JSX.Element => {
    const [showMenu, setShowMenu] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div ref={containerRef}>
            <ColumnLabel onClick={() => setShowMenu((s) => !s)}>
                Columns <ClickableIcon name="chevron_down" />
            </ColumnLabel>

            {showMenu && (
                <ColumnMenuPicker
                    columnApi={columnApi}
                    closeMenu={() => setShowMenu(false)}
                    containerRef={containerRef}
                />
            )}
        </div>
    );
};

interface ColumnMenuPickerProps {
    columnApi: ColumnApi;
    closeMenu: () => void;
    containerRef: MutableRefObject<HTMLDivElement | null>;
}

const ColumnMenuPicker = ({ columnApi, closeMenu, containerRef }: ColumnMenuPickerProps) => {
    useOutsideClick(containerRef, closeMenu);

    const refresh = useRefresh();

    const columns = columnApi.getAllColumns() ?? [];

    return (
        <WrapperDiv>
            {columns.map((a) => {
                return (
                    <MenuItem
                        onClick={() => {
                            columnApi.setColumnVisible(a, !a.isVisible());
                            refresh();
                        }}
                        key={a.getColId()}
                    >
                        <Checkbox readOnly checked={a.isVisible()} />
                        <div>{a.getColDef().headerName}</div>
                    </MenuItem>
                );
            })}
        </WrapperDiv>
    );
};
