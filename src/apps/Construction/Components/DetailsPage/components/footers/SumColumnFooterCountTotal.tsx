import { useMemo } from 'react';
import { FooterPropsCountTotal } from '../../types';

export const SumColumnFooterCountTotal = <T extends Record<string, unknown>>({
    data,
    fieldKey,
}: FooterPropsCountTotal<T>): JSX.Element => {
    const total = useMemo(
        () =>
            data.data.reduce((sum, row) => {
                return sum + Number(row[fieldKey] || 0);
            }, 0),
        [data.data, fieldKey]
    );

    return <div>{total}</div>;
};
export default SumColumnFooterCountTotal;
