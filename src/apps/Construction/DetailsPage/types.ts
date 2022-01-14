import { TableInstance } from '@equinor/Table';

export type FooterProps<T extends Record<string, unknown>> = {
    data: TableInstance<T>;
    columnId: string;
};

export type FooterPropsCount<T extends Record<string, unknown>> = {
    data: TableInstance<T>;
    fieldKey: keyof T;
    value: string;
    columnId: string;
};

export type FooterPropsCountTotal<T extends Record<string, unknown>> = {
    data: TableInstance<T>;
    fieldKey: keyof T;
};

export type FooterPropsSum<T extends Record<string, unknown>> = {
    data: TableInstance<T>;
    fieldKey: keyof T;
    sumKey: keyof T;
    value: string;
};

export type SumColumnFooterType<T extends Record<string, unknown>> = Omit<
    FooterProps<T>,
    'data'
> & {
    type: 'SumColumnFooter';
};

export type SumColumnFooterCountType<T extends Record<string, unknown>> = Omit<
    FooterPropsCount<T>,
    'data'
> & {
    type: 'SumColumnFooterCount';
};

export type SumColumnFooterCountTotalType<T extends Record<string, unknown>> = Omit<
    FooterPropsCountTotal<T>,
    'data'
> & {
    type: 'SumColumnFooterCountTotal';
};

export type SumColumnFooterSumType<T extends Record<string, unknown>> = Omit<
    FooterPropsSum<T>,
    'data'
> & {
    type: 'SumColumnFooterSum';
};
