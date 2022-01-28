import { Column } from '@equinor/Table';
import { WorkOrder } from '../../mocData/mockData';
import { SumColumnFooter } from './components';
import { columnGenerator } from './utils';

export const cols: Column<WorkOrder>[] = [
    {
        Header: '',
        accessor: 'disciplineDescription',
        Footer: () => <></>,
        columns: [
            {
                Header: 'Discipline',
                accessor: 'disciplineDescription',
                width: 250,
                maxWidth: 300,
                Footer: (data) => (
                    <SumColumnFooter data={data} columnId={'disciplineDescription'} />
                ),
            },
        ],
    },
    {
        Header: 'W01',
        Footer: () => <></>,
        columns: [
            columnGenerator({
                id: 'W01-WOs',
                header: 'WOs',
                accessorKey: 'woNo',
                aggregate: 'count',
                footerType: {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W01',
                    columnId: 'W01-WOs',
                },
                jobStatus: 'W01',
            }),
            columnGenerator({
                id: 'W01-Est',
                header: 'Est mhrs',
                accessorKey: 'estimatedManHours',
                aggregate: 'sum',
                footerType: {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W01',
                    sumKey: 'estimatedManHours',
                },
                jobStatus: 'W01',
                width: 80,
            }),
        ],
    },
    {
        Header: 'W02',
        Footer: () => <></>,
        columns: [
            columnGenerator({
                id: 'W02-WOs',
                header: 'WOs',
                accessorKey: 'woNo',
                aggregate: 'count',
                footerType: {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W02',
                    columnId: 'W02-WOs',
                },
                jobStatus: 'W02',
            }),
            columnGenerator({
                id: 'W02-Est',
                header: 'Est mhrs',
                accessorKey: 'estimatedManHours',
                aggregate: 'sum',
                footerType: {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W02',
                    sumKey: 'estimatedManHours',
                },
                jobStatus: 'W02',
                width: 80,
            }),
        ],
    },
    {
        Header: 'W03',
        Footer: () => <></>,
        columns: [
            columnGenerator({
                id: 'W03-WOs',
                header: 'WOs',
                accessorKey: 'woNo',
                aggregate: 'count',
                footerType: {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W03',
                    columnId: 'W03-WOs',
                },
                jobStatus: 'W03',
            }),
            columnGenerator({
                id: 'W03-Est',
                header: 'Est mhrs',
                accessorKey: 'estimatedManHours',
                aggregate: 'sum',
                footerType: {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W03',
                    sumKey: 'estimatedManHours',
                },
                jobStatus: 'W03',
                width: 80,
            }),
        ],
    },
    {
        Header: 'W04',
        Footer: () => <></>,
        columns: [
            columnGenerator({
                id: 'W04-WOs',
                header: 'WOs',
                accessorKey: 'woNo',
                aggregate: 'count',
                footerType: {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W04',
                    columnId: 'W04-WOs',
                },
                jobStatus: 'W04',
            }),
            columnGenerator({
                id: 'W04-Est',
                header: 'Est mhrs',
                accessorKey: 'estimatedManHours',
                aggregate: 'sum',
                footerType: {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W04',
                    sumKey: 'estimatedManHours',
                },
                jobStatus: 'W04',
                width: 80,
            }),
        ],
    },
    {
        Header: 'W05',
        Footer: () => <></>,
        columns: [
            columnGenerator({
                id: 'W05-WOs',
                header: 'WOs',
                accessorKey: 'woNo',
                aggregate: 'count',
                footerType: {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W05',
                    columnId: 'W05-WOs',
                },
                jobStatus: 'W05',
            }),
            columnGenerator({
                id: 'W05-Est',
                header: 'Est mhrs',
                accessorKey: 'estimatedManHours',
                aggregate: 'sum',
                footerType: {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W05',
                    sumKey: 'estimatedManHours',
                },
                jobStatus: 'W05',
                width: 80,
            }),
        ],
    },
    {
        Header: 'W06',
        Footer: () => <></>,
        columns: [
            columnGenerator({
                id: 'W06-WOs',
                header: 'WOs',
                accessorKey: 'woNo',
                aggregate: 'count',
                footerType: {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W06',
                    columnId: 'W06-WOs',
                },
                jobStatus: 'W06',
            }),

            columnGenerator({
                id: 'W06-Est',
                header: 'Est mhrs',
                accessorKey: 'estimatedManHours',
                aggregate: 'sum',
                footerType: {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W06',
                    sumKey: 'estimatedManHours',
                },
                jobStatus: 'W06',
                width: 80,
            }),
        ],
    },
    {
        Header: 'W07',
        Footer: () => <></>,
        columns: [
            columnGenerator({
                id: 'W07-WOs',
                header: 'WOs',
                accessorKey: 'woNo',
                aggregate: 'count',
                footerType: {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W07',
                    columnId: 'W07-WOs',
                },
                jobStatus: 'W07',
            }),

            columnGenerator({
                id: 'W07-Est',
                header: 'Est mhrs',
                accessorKey: 'estimatedManHours',
                aggregate: 'sum',
                footerType: {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W07',
                    sumKey: 'estimatedManHours',
                },
                jobStatus: 'W07',
                width: 80,
            }),
        ],
    },
    {
        Header: 'W08',
        Footer: () => <></>,
        columns: [
            columnGenerator({
                id: 'W08-WOs',
                header: 'WOs',
                accessorKey: 'woNo',
                aggregate: 'count',
                footerType: {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W08',
                    columnId: 'W08-WOs',
                },
                jobStatus: 'W08',
            }),

            columnGenerator({
                id: 'W08-Est',
                header: 'Est mhrs',
                accessorKey: 'estimatedManHours',
                aggregate: 'sum',
                footerType: {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W08',
                    sumKey: 'estimatedManHours',
                },
                jobStatus: 'W08',
                width: 80,
            }),
        ],
    },
    {
        Header: 'Total',
        Footer: () => <></>,
        columns: [
            columnGenerator({
                id: 'Total-WOs',
                header: 'WOs',
                accessorKey: 'disciplineDescription',
                aggregate: 'count',
                footerType: {
                    type: 'SumColumnFooter',
                    columnId: 'Total-WOs',
                },
                jobStatus: 'W08',
            }),
            columnGenerator({
                id: 'Total-Est',
                header: 'Est mhrs',
                accessorKey: 'estimatedManHours',
                aggregate: 'sum',
                footerType: {
                    type: 'SumColumnFooterCountTotal',
                    fieldKey: 'estimatedManHours',
                },
            }),
        ],
    },
];
