import { useMemo } from 'react';
import { FooterPropsSum } from '../../types';

export const SumColumnFooterSum = <T extends Record<string, unknown>>({
    data,
    fieldKey,
    value,
    sumKey,
}: FooterPropsSum<T>): JSX.Element => {
    const total = useMemo(
        () =>
            data.data.reduce((sum, row) => {
                return row[fieldKey] === value ? sum + Number(row[sumKey] || 0) : sum;
            }, 0),
        [data.data, fieldKey, sumKey, value]
    );

    return <div> {total}</div>;
};
export default SumColumnFooterSum;
