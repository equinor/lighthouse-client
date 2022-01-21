import { TableInstance } from '@equinor/Table';
type UnknownRecord = Record<string, unknown>;
export type FooterProps<T extends UnknownRecord> = {
    data: TableInstance<T>;
    columnId: string;
};

export type FooterPropsCount<T extends UnknownRecord> = {
    data: TableInstance<T>;
    /** An accessor key on T */
    fieldKey: keyof T;
    /** Value which you want to compare with value of T[fieldKey] */
    value: string;
    /** Unique column identifier */
    columnId: string;
};

export type FooterPropsCountTotal<T extends UnknownRecord> = {
    data: TableInstance<T>;
    fieldKey: keyof T;
};

export type FooterPropsSum<T extends UnknownRecord> = {
    data: TableInstance<T>;
    /** An accessor key on T */
    fieldKey: keyof T;
    /** An accessor key on T with a value you want to sum */
    sumKey: keyof T;
    /** Value which you want to compare with value of T[fieldKey] */
    value: string;
};

export type SumColumnFooterType<T extends UnknownRecord> = Omit<FooterProps<T>, 'data'> & {
    type: 'SumColumnFooter';
};

export type SumColumnFooterCountType<T extends UnknownRecord> = Omit<
    FooterPropsCount<T>,
    'data'
> & {
    /** Type which results in aggregated being incremented by 1 */
    type: 'SumColumnFooterCount';
};

export type SumColumnFooterCountTotalType<T extends UnknownRecord> = Omit<
    FooterPropsCountTotal<T>,
    'data'
> & {
    type: 'SumColumnFooterCountTotal';
};

export type SumColumnFooterSumType<T extends UnknownRecord> = Omit<FooterPropsSum<T>, 'data'> & {
    /** Type which results in aggregated being summed */
    type: 'SumColumnFooterSum';
};

export type ColumnGeneratorArgs<T extends UnknownRecord> = {
    /** Unique identifier for column */
    id: string;
    /** Header display text for column */
    header: string;
    /** Accessor key */
    accessorKey: keyof T;
    /** Aggregated should either be sum or count */
    aggregate: 'sum' | 'count';
    /** Component to use for Aggregated view */
    footerType:
        | SumColumnFooterType<T>
        | SumColumnFooterSumType<T>
        | SumColumnFooterCountType<T>
        | SumColumnFooterCountTotalType<T>;
    /** Value used to calculate Aggregated and compared with original.jobStatusCode */
    jobStatus?: string;
    width?: number;
};
