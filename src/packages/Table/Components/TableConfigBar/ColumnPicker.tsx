import { useState, useRef, MutableRefObject } from 'react';
import { Checkbox } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

import { useRefresh } from '../../../../components/ParkView/hooks/useRefresh';
import { ClickableIcon } from '../../../Components/Icon';
import { TableAPI } from '../Table';
import { useOutsideClick } from '@equinor/hooks';

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
    return (
        <WrapperDiv>
            {getApi()
                .getColumns()
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

const MenuItem = styled.div`
    display: grid;
    height: 48px;
    text-overflow: ellipsis;
    white-space: nowrap;
    grid-template-columns: 2fr 8fr;
    margin: 5px 5px;
    align-items: center;
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
`;

const WrapperDiv = styled.div`
    position: absolute;
    right: 20px;
    top: 40px;
    height: 400px;
    width: 500px;
    padding: 20px;
    background-color: white;
    max-height: 500px;
    max-width: 150px;
    overflow-x: hidden;
    overflow-y: scroll;
    z-index: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    flex-direction: column;
    gap: 0.2em;
    border-radius: 5px;
    border: 1px solid ${tokens.colors.interactive.disabled__border.hex};
`;

const ColumnLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2em;
    color: ${tokens.colors.interactive.primary__resting.hex};
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    text-align: center;
    cursor: pointer;
`;
