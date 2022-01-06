import { useMemo } from 'react';
import { Job } from '../../../mocData/mockData';
import { FooterPropsSum } from '../../types';

export const SumColumnFooterSum = ({
    data,
    fieldKey,
    value,
    sumKey,
}: FooterPropsSum<Job>): JSX.Element => {
    const total = useMemo(
        () =>
            data.data.reduce((sum, row) => {
                return row[fieldKey] === value ? sum + Number(row[sumKey]) : sum;
            }, 0),
        [data.data, fieldKey, sumKey, value]
    );

    return <div> {total}</div>;
};
export default SumColumnFooterSum;
