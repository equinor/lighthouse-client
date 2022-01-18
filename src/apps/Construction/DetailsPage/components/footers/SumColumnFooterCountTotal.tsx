import { useMemo } from 'react';
import { Job, WorkOrder } from '../../../mocData/mockData';
import { FooterPropsCountTotal } from '../../types';

export const SumColumnFooterCountTotal = ({
    data,
    fieldKey,
}: FooterPropsCountTotal<WorkOrder>): JSX.Element => {
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
