import { CellProps, TableInstance } from '@equinor/Table';
import {
    SumColumnFooter,
    SumColumnFooterCount,
    SumColumnFooterCountTotal,
    SumColumnFooterSum,
} from './components';
import { ColumnGeneratorArgs } from './types';

/**
 * Function that will generate columns for Table component based on arguments passed.
 * Will have predefined Footer components,
 * Aggregated requires a field, jobStatusCode, to be present on T
 *
 */
export const columnGenerator = <T extends Record<string, unknown>>(
    args: ColumnGeneratorArgs<T>
) => {
    const { id, header, accessorKey, aggregate, footerType, jobStatus, width = 100 } = args;
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
                    acc = acc + Number(i.original[accessorKey]) || 0;
                    return acc;
                } else if (aggregate === 'count') {
                    acc = i.original.jobStatusCode === jobStatus ? acc + 1 : acc;

                    return acc;
                } else {
                    acc =
                        i.original.jobStatusCode === jobStatus
                            ? acc + Number(i.original[accessorKey]) || 0
                            : acc;
                    return acc;
                }
            }, 0);
            return count;
        },
        aggregate,
        Footer: (data: React.PropsWithChildren<TableInstance<T>>) => {
            switch (footerType.type) {
                case 'SumColumnFooterCount':
                    return (
                        <SumColumnFooterCount
                            data={data}
                            columnId={id}
                            fieldKey={footerType.fieldKey}
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
                            fieldKey={footerType.fieldKey}
                            value={footerType.value}
                            sumKey={footerType.sumKey}
                        />
                    );
            }
        },
    };
};
