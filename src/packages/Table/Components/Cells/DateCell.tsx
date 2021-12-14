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
    return <div {...attr}>{new Date(content[currentKey] as Date).toLocaleDateString()}</div>;
};
