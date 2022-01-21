import { useMemo } from 'react';
import { FooterPropsCount } from '../../types';

export const SumColumnFooterCount = <T extends Record<string, unknown>>({
    data,
    fieldKey,
    value,
}: FooterPropsCount<T>): JSX.Element => {
    const total = useMemo(
        () =>
            data.data.reduce((sum, row) => {
                return row[fieldKey] === value ? sum + 1 : sum;
            }, 0),
        [data.data, fieldKey, value]
    );

    return <div>{total}</div>;
};
export default SumColumnFooterCount;
