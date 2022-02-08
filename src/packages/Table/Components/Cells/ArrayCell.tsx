import { CellProps } from 'react-table';
import { CellRenderProps, TableData } from '../../types';

export const ArrayCell = <T extends TableData>(props: CellProps<T, CellRenderProps<T>>) => {
    const {
        value: { content, currentKey },
    } = props;

    const value = Array.isArray(content[currentKey]) ? (content[currentKey] as Array<unknown>) : [];

    return <>{value.length === 0 ? '-' : value.length}</>;
};
