import { Column } from '@equinor/Table';
import { Job, WorkOrder } from '../mocData/mockData';
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
        Header: 'E10',
        Footer: () => <></>,
        columns: [
            columnGenerator(
                'W01-WOs',
                'WOs',
                'woNo',
                'count',
                {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W01',
                    columnId: 'W01-WOs',
                },
                'W01'
            ),
            columnGenerator(
                'W01-Est',
                'Est mhrs',
                'estimatedManHours',
                'sum',
                {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W01',
                    sumKey: 'estimatedManHours',
                },
                'W01',
                80
            ),
        ],
    },
    {
        Header: 'E20',
        Footer: () => <></>,
        columns: [
            columnGenerator(
                'W02-WOs',
                'WOs',
                'woNo',
                'count',
                {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W02',
                    columnId: 'W02-WOs',
                },
                'W02'
            ),
            columnGenerator(
                'W02-Est',
                'Est mhrs',
                'estimatedManHours',
                'sum',
                {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W02',
                    sumKey: 'estimatedManHours',
                },
                'W02'
            ),
        ],
    },
    {
        Header: 'E30',
        Footer: () => <></>,
        columns: [
            columnGenerator(
                'W03-WOs',
                'WOs',
                'woNo',
                'count',
                {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W03',
                    columnId: 'W03-WOs',
                },
                'W03'
            ),
            columnGenerator(
                'W03-Est',
                'Est mhrs',
                'estimatedManHours',
                'sum',
                {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W03',
                    sumKey: 'estimatedManHours',
                },
                'W03'
            ),
        ],
    },
    {
        Header: 'E35',
        Footer: () => <></>,
        columns: [
            columnGenerator(
                'W04-WOs',
                'WOs',
                'woNo',
                'count',
                {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W04',
                    columnId: 'W04-WOs',
                },
                'W04'
            ),
            columnGenerator(
                'W04-Est',
                'Est mhrs',
                'estimatedManHours',
                'sum',
                {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W04',
                    sumKey: 'estimatedManHours',
                },
                'W04'
            ),
        ],
    },
    {
        Header: 'E40',
        Footer: () => <></>,
        columns: [
            columnGenerator(
                'W05-WOs',
                'WOs',
                'woNo',
                'count',
                {
                    type: 'SumColumnFooterCount',
                    fieldKey: 'jobStatusCode',
                    value: 'W05',
                    columnId: 'W05-WOs',
                },
                'W05'
            ),
            columnGenerator(
                'W05-Est',
                'Est mhrs',
                'estimatedManHours',
                'sum',
                {
                    type: 'SumColumnFooterSum',
                    fieldKey: 'jobStatusCode',
                    value: 'W05',
                    sumKey: 'estimatedManHours',
                },
                'W05'
            ),
        ],
    },
    {
        Header: 'Total',
        Footer: () => <></>,
        columns: [
            columnGenerator(
                'Total-WOs',
                'WOs',
                'disciplineDescription',
                'count',
                { type: 'SumColumnFooter', columnId: 'Total-WOs' },
                ''
            ),
            columnGenerator(
                'Total-Est',
                'Est mhrs',
                'estimatedManHours',
                'sum',
                { type: 'SumColumnFooterCountTotal', fieldKey: 'estimatedManHours' },
                ''
            ),
        ],
    },
];
// export const tableColumns: Column<Job>[] = [
//     {
//         Header: '',
//         accessor: 'disciplineDescription',
//         Footer: () => <></>,
//         columns: [
//             {
//                 Header: 'Discipline',
//                 accessor: 'disciplineDescription',
//                 width: 250,
//                 maxWidth: 300,
//                 Footer: (data) => (
//                     <SumColumnFooter data={data} columnId={'disciplineDescription'} />
//                 ),
//             },
//         ],
//     },
//     {
//         Header: 'E10',
//         Footer: () => <></>,
//         // accessor: "jobStatus",
//         columns: [
//             {
//                 id: 'E10-WOs',
//                 Header: 'WOs',
//                 width: 80,
//                 accessor: (row) => row.job,
//                 aggregate: 'count',
//                 Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
//                     const count = row.subRows.reduce((acc, i) => {
//                         acc = i.original.jobStatus === 'E10' ? acc + 1 : acc;
//                         return acc;
//                     }, 0);

//                     return count;
//                 },
//                 Footer: (data) => (
//                     <SumColumnFooterCount
//                         data={data}
//                         fieldKey={'jobStatus'}
//                         value={'E10'}
//                         columnId={'E10-WOs'}
//                     />
//                 ),
//             },

//             {
//                 id: 'E10-Est',
//                 Header: 'Est mhrs',
//                 width: 80,
//                 accessor: (row) => row.jobEstimatedHours,
//                 aggregate: 'sum',
//                 Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
//                     const count = row.subRows.reduce((acc, i) => {
//                         acc =
//                             i.original.jobStatus === 'E10'
//                                 ? acc + i.original.jobEstimatedHours
//                                 : acc;
//                         return acc;
//                     }, 0);

//                     return count;
//                 },
//                 Footer: (data) => (
//                     <SumColumnFooterSum
//                         data={data}
//                         fieldKey={'jobStatus'}
//                         value={'E10'}
//                         sumKey={'jobEstimatedHours'}
//                     />
//                 ),
//             },
//         ],
//     },
//     {
//         Header: 'E20',
//         Footer: () => <></>,
//         columns: [
//             {
//                 id: 'E20-WOs',
//                 Header: 'WOs',
//                 width: 80,
//                 accessor: (item: Job): string => {
//                     return item.job;
//                 },
//                 Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
//                     const count = row.subRows.reduce((acc, i) => {
//                         acc = i.original.jobStatus === 'E20' ? acc + 1 : acc;
//                         return acc;
//                     }, 0);

//                     return count;
//                 },
//                 aggregate: 'count',
//                 Footer: (data) => (
//                     <SumColumnFooterCount
//                         data={data}
//                         fieldKey={'jobStatus'}
//                         value={'E20'}
//                         columnId={'E20-WOs'}
//                     />
//                 ),
//             },
//             {
//                 id: 'E20-Est',
//                 Header: 'Est mhrs',
//                 width: 80,
//                 accessor: (item: Job): number => {
//                     return item.jobEstimatedHours;
//                 },
//                 Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
//                     const count = row.subRows.reduce((acc, i) => {
//                         acc =
//                             i.original.jobStatus === 'E20'
//                                 ? acc + i.original.jobEstimatedHours
//                                 : acc;
//                         return acc;
//                     }, 0);

//                     return count;
//                 },
//                 aggregate: 'sum',
//                 Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
//                     <SumColumnFooterSum
//                         data={data}
//                         fieldKey={'jobStatus'}
//                         value={'E20'}
//                         sumKey={'jobEstimatedHours'}
//                     />
//                 ),
//             },
//         ],
//     },
//     {
//         Header: 'E30',
//         Footer: () => <></>,
//         columns: [
//             {
//                 id: 'E30-WOs',
//                 Header: 'WOs',
//                 width: 80,
//                 accessor: (item: Job): string => {
//                     return item.job;
//                 },
//                 aggregate: 'count',
//                 Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
//                     const count = row.subRows.reduce((acc, i) => {
//                         acc = i.original.jobStatus === 'E30' ? acc + 1 : acc;
//                         return acc;
//                     }, 0);

//                     return count;
//                 },
//                 Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
//                     <SumColumnFooterCount
//                         data={data}
//                         fieldKey={'jobStatus'}
//                         value={'E30'}
//                         columnId={'E30-WOs'}
//                     />
//                 ),
//             },
//             {
//                 id: 'E30-Est',
//                 Header: 'Est mhrs',
//                 width: 80,
//                 accessor: (item: Job): number => {
//                     return item.jobEstimatedHours;
//                 },
//                 aggregate: 'sum',
//                 Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
//                     const count = row.subRows.reduce((acc, i) => {
//                         acc =
//                             i.original.jobStatus === 'E30'
//                                 ? acc + i.original.jobEstimatedHours
//                                 : acc;
//                         return acc;
//                     }, 0);

//                     return count;
//                 },
//                 Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
//                     <SumColumnFooterSum
//                         data={data}
//                         fieldKey={'jobStatus'}
//                         value={'E30'}
//                         sumKey={'jobEstimatedHours'}
//                     />
//                 ),
//             },
//         ],
//     },
//     {
//         Header: 'E35',
//         Footer: () => <></>,
//         columns: [
//             {
//                 id: 'E35-WOs',
//                 Header: 'WOs',
//                 width: 80,
//                 accessor: (item: Job): string => {
//                     return item.job;
//                 },
//                 Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
//                     const count = row.subRows.reduce((acc, i) => {
//                         acc = i.original.jobStatus === 'E35' ? acc + 1 : acc;
//                         return acc;
//                     }, 0);

//                     return count;
//                 },
//                 aggregate: 'count',
//                 Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
//                     <SumColumnFooterCount
//                         data={data}
//                         fieldKey={'jobStatus'}
//                         value={'E35'}
//                         columnId={'E35-WOs'}
//                     />
//                 ),
//             },
//             {
//                 id: 'E35-Est',
//                 Header: 'Est mhrs',
//                 width: 80,
//                 accessor: (item: Job): number => {
//                     return item.jobEstimatedHours;
//                 },
//                 Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
//                     const count = row.subRows.reduce((acc, i) => {
//                         acc =
//                             i.original.jobStatus === 'E35'
//                                 ? acc + i.original.jobEstimatedHours
//                                 : acc;
//                         return acc;
//                     }, 0);

//                     return count;
//                 },
//                 aggregate: 'sum',
//                 Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
//                     <SumColumnFooterSum
//                         data={data}
//                         fieldKey={'jobStatus'}
//                         value={'E35'}
//                         sumKey={'jobEstimatedHours'}
//                     />
//                 ),
//             },
//         ],
//     },
//     {
//         Header: 'E40',
//         Footer: () => <></>,
//         columns: [
//             {
//                 id: 'E40-WOs',
//                 Header: 'WOs',
//                 width: 80,
//                 accessor: (item: Job): string => {
//                     return item.job;
//                 },
//                 Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
//                     const count = row.subRows.reduce((acc, i) => {
//                         acc = i.original.jobStatus === 'E40' ? acc + 1 : acc;
//                         return acc;
//                     }, 0);

//                     return count;
//                 },
//                 aggregate: 'count',
//                 Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
//                     <SumColumnFooterCount
//                         data={data}
//                         fieldKey={'jobStatus'}
//                         value={'E40'}
//                         columnId={'E40-WOs'}
//                     />
//                 ),
//             },
//             {
//                 id: 'E40-Est',
//                 Header: 'Est mhrs',
//                 width: 80,
//                 accessor: (item: Job): number => {
//                     return item.jobEstimatedHours;
//                 },
//                 Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
//                     const count = row.subRows.reduce((acc, i) => {
//                         acc =
//                             i.original.jobStatus === 'E40'
//                                 ? acc + i.original.jobEstimatedHours
//                                 : acc;
//                         return acc;
//                     }, 0);

//                     return count;
//                 },
//                 aggregate: 'sum',
//                 Footer: (data) => (
//                     <SumColumnFooterSum
//                         data={data}
//                         fieldKey={'jobStatus'}
//                         value={'E40'}
//                         sumKey={'jobEstimatedHours'}
//                     />
//                 ),
//             },
//         ],
//     },
//     {
//         Header: 'Total',
//         Footer: () => <></>,
//         columns: [
//             {
//                 id: 'Total-WOs',
//                 Header: 'WOs',
//                 width: 100,
//                 accessor: (item: Job): string => {
//                     return item.discipline;
//                 },
//                 aggregate: 'count',
//                 Footer: (data: React.PropsWithChildren<TableInstance<Job>>): JSX.Element => {
//                     return <SumColumnFooter data={data} columnId={'Total-WOs'} />;
//                 },
//             },
//             {
//                 id: 'Total-Est',
//                 Header: 'Est mhrs',
//                 width: 100,
//                 accessor: (item: Job): number => {
//                     return item.jobEstimatedHours;
//                 },
//                 Aggregated: ({ row }: React.PropsWithChildren<CellProps<Job, any>>): number => {
//                     const count = row.subRows.reduce((acc, i) => {
//                         acc = acc + i.original.jobEstimatedHours;
//                         return acc;
//                     }, 0);

//                     return count;
//                 },
//                 aggregate: 'sum',
//                 Footer: (data: React.PropsWithChildren<TableInstance<Job>>) => (
//                     <SumColumnFooterCountTotal data={data} fieldKey={'jobEstimatedHours'} />
//                 ),
//             },
//         ],
//     },
// ];
