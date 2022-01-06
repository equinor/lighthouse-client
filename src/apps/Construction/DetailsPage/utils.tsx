import { CellProps, TableInstance } from '@equinor/Table';
import { Job } from '../mocData/mockData';
import {
    SumColumnFooter,
    SumColumnFooterCount,
    SumColumnFooterCountTotal,
    SumColumnFooterSum,
} from './components';
import {
    SumColumnFooterCountTotalType,
    SumColumnFooterCountType,
    SumColumnFooterSumType,
    SumColumnFooterType,
} from './types';

export const columnGenerator = <T extends Record<string, unknown>>(
    id: string,
    header: string,
    accessorKey: keyof Job,
    aggregate: 'sum' | 'count',
    footerType:
        | SumColumnFooterType<T>
        | SumColumnFooterSumType<T>
        | SumColumnFooterCountType<T>
        | SumColumnFooterCountTotalType<T>,
    jobStatus: string,
    width = 100
) => {
    return {
        id,
        Header: header,
        width: width,
        accessor: (item: T) => {
            return item[accessorKey];
        },
        Aggregated: (data: React.PropsWithChildren<CellProps<T, any>>) => {
            if (footerType.type === 'SumColumnFooter') {
                return data.value;
            }
            const count = data.row.subRows.reduce((acc, i) => {
                if (footerType.type === 'SumColumnFooterCountTotal') {
                    acc = acc + (i.original[accessorKey] as number);
                    return acc;
                } else if (aggregate === 'count') {
                    acc = i.original.jobStatus === jobStatus ? acc + 1 : acc;

                    return acc;
                } else {
                    acc =
                        i.original.jobStatus === jobStatus
                            ? acc + (i.original[accessorKey] as number)
                            : acc;
                    return acc;
                }
            }, 0);
            return count;
        },
        aggregate,
        Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => {
            switch (footerType.type) {
                case 'SumColumnFooterCount':
                    return (
                        <SumColumnFooterCount
                            data={data}
                            columnId={id}
                            fieldKey={footerType.fieldKey as any}
                            value={footerType.value}
                        />
                    );

                case 'SumColumnFooter':
                    return <SumColumnFooter data={data} columnId={id} />;

                case 'SumColumnFooterCountTotal':
                    return <SumColumnFooterCountTotal data={data} fieldKey={accessorKey} />;
                case 'SumColumnFooterSum':
                    return (
                        <SumColumnFooterSum
                            data={data}
                            fieldKey={footerType.fieldKey as any}
                            value={footerType.value}
                            sumKey={footerType.sumKey as any}
                        />
                    );
            }
        },
    };
};
