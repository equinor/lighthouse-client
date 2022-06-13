import { useState, useRef, MutableRefObject } from 'react';
import { Checkbox } from '@equinor/eds-core-react';
import { useOutsideClick } from '@equinor/hooks';

import { useRefresh } from '../../../../../components/ParkView/hooks/useRefresh';
import { ClickableIcon } from '../../../../Components/Icon';
import { ColumnLabel, MenuItem, WrapperDiv } from './columnPicker.styles';
import { TableAPI } from '@equinor/Table';
import { useWorkSpace } from '../../../../../Core/WorkSpace/src';

interface ColumnPickerProps {
    getApi: () => TableAPI;
}

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

    if (!tableOptions) return null;

    const hiddenColumns = tableOptions.hiddenColumns as string[];

    return (
        <WrapperDiv>
            {getApi()
                .getColumns()
                .filter((s) => !hiddenColumns?.includes(s.id ?? ''))
                .sort(
                    (a, b) => a.Header?.toString().localeCompare(b.Header?.toString() ?? 'a') ?? 0
                )
                .map(({ id, Header }) => {
                    return (
                        <MenuItem
                            onClick={() => {
                                getApi().toggleHideColumn(id);
                                refresh();
                            }}
                            key={id}
                        >
                            <Checkbox
                                readOnly
                                checked={getApi()
                                    .getVisibleColumns()

                                    .map((x) => x.id)
                                    .includes(id)}
                            />
                            <div>{Header?.toString()}</div>
                        </MenuItem>
                    );
                })}
        </WrapperDiv>
    );
};
