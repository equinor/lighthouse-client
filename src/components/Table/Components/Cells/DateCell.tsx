import { useMemo } from 'react';
import { CellProps } from 'react-table';
import { CellRenderProps, TableData } from '../../types';

export const DateCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey, cellFn },
    } = props;

    const attr = useMemo(() => (cellFn ? cellFn(content) : undefined), [cellFn]);
    return <div {...attr}>{new Date(content[currentKey] as Date).toLocaleDateString()}</div>;
};
