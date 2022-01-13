import { useMemo } from 'react';
import { Job, WorkOrder } from '../../../mocData/mockData';
import { FooterPropsCount } from '../../types';

export const SumColumnFooterCount = ({
    data,
    fieldKey,
    value,
}: FooterPropsCount<WorkOrder>): JSX.Element => {
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
