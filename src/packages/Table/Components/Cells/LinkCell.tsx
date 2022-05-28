import React, { useCallback } from 'react';
import { CellProps } from 'react-table';
import { CellRenderProps, TableData } from '../../Types/types';
import { Icon } from '@equinor/eds-core-react';
export const LinkCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content },
    } = props;

    const handleOnClick = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            window.open(content as unknown as string);
        },
        [content]
    );

    return (
        <Icon
            onClick={(e) => handleOnClick(e)}
            name="external_link"
            style={{ cursor: 'pointer' }}
        ></Icon>
    );
};
