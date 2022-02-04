import { useMemo } from 'react';
import { CellProps } from 'react-table';
import { CellRenderProps, TableData } from '../../types';

export const DateCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey, cellAttributeFn },
    } = props;

    const attr = useMemo(
        () => (cellAttributeFn ? cellAttributeFn(content) : undefined),
        [cellAttributeFn]
    );

    const dateDisplay = content[currentKey]
        ? new Date(content[currentKey] as string).toLocaleDateString()
        : '';
    return <div {...attr}>{dateDisplay}</div>;
};
