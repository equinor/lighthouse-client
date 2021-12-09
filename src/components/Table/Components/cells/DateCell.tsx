import { CellProps } from 'react-table';
import { TableData } from '../../types';

export const DateCell = <T extends TableData>(
    props: CellProps<T, { content: T; currentKey: string }>
) => {
    const {
        value: { content, currentKey },
    } = props;

    return <div>{new Date(content[currentKey] as Date).toLocaleDateString()}</div>;
};
