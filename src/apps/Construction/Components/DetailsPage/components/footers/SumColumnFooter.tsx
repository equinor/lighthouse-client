import { useMemo } from 'react';
import { FooterProps } from '../../types';

export const SumColumnFooter = <T extends Record<string, unknown>>({
    data,
    columnId,
}: FooterProps<T>): JSX.Element => {
    const total = useMemo(
        () =>
            data.rows.reduce((sum, row) => {
                return row.values[columnId] + sum;
            }, 0),
        [data.rows, columnId]
    );

    return (data.state as any)?.groupBy?.includes(columnId) ? (
        <div>Total: </div>
    ) : (
        <div> {total}</div>
    );
};
export default SumColumnFooter;
