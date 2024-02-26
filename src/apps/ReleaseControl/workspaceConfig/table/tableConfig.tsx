import { generateCommaSeperatedStringArrayColumn } from '@equinor/Table';
import { WorkflowCompact } from '@equinor/Workflow';
import { TableOptions } from '@equinor/WorkSpace';
import { Monospace } from '../../Styles/WrapperStyles';
import { ReleaseControl } from '../../types/releaseControl';

export const tableConfig: TableOptions<ReleaseControl> = {
    objectIdentifierKey: 'id',
    enableSelectRows: true,
    preventAutoGenerateColumns: true,
    customColumns: [
        {
            id: 'sequenceNumber',
            Header: 'Id',
            accessor: (rc) => rc.sequenceNumber,
            Aggregated: () => null,
            aggregate: 'count',
            width: 75,
            Cell: (cell) => {
                return <>{'RC' + cell.row.values.sequenceNumber}</>;
            },
        },
        {
            id: 'title',
            Header: 'Title',
            accessor: (rc) => rc.title,
            Aggregated: () => null,
            aggregate: 'count',
            width: 550,
        },
        {
            id: 'workflowSteps',
            Header: 'Workflow',
            accessor: (rc) => rc.workflowSteps,
            Aggregated: () => null,
            aggregate: 'count',
            width: 300,
            Cell: (cell) => {
                return <WorkflowCompact steps={cell.row.values.workflowSteps as any[]} />;
            },
        },
        {
            id: 'currentStep',
            Header: 'Current step',
            accessor: (rc) => rc.currentWorkflowStep,
            Aggregated: () => null,
            aggregate: 'count',
            width: 300,
            Cell: (cell) => {
                return <>{cell.row.values.currentStep?.name}</>;
            },
        },
        {
            id: 'timeOnStep',
            Header: 'Time on step',
            accessor: (rc) => `${rc.timeOnLastStep} days`,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
        },
        // { Adjust width when reimplementing this column
        //     id: 'rcSystems',
        //     accessor: 'systems',
        //     Header: 'Systems',
        //     Aggregated: () => null,
        //     width: 300,
        //     aggregate: 'count',
        //     Cell: (cell) => {
        //         return (
        //             <Monospace>
        //                 {generateCommaSeperatedStringArrayColumn(
        //                     cell.row.values.rcSystems ?? '',
        //                     8
        //                 )}
        //             </Monospace>
        //         );
        //     },
        // },
        // { Adjust width when reimplementing this column
        //     id: 'rcSwitchboards',
        //     accessor: 'switchboards',
        //     Header: 'Switchboards',
        //     Aggregated: () => null,
        //     width: 300,
        //     aggregate: 'count',
        //     Cell: (cell) => {
        //         return (
        //             <Monospace>
        //                 {generateCommaSeperatedStringArrayColumn(cell.row.values.rcSwitchboards, 4)}
        //             </Monospace>
        //         );
        //     },
        // },
        // { Adjust width when reimplementing this column
        //     id: 'rcCircuits',
        //     accessor: 'circuits',
        //     Header: 'Circuits',
        //     Aggregated: () => null,
        //     width: 300,
        //     aggregate: 'count',
        //     Cell: (cell) => {
        //         return (
        //             <Monospace>
        //                 {generateCommaSeperatedStringArrayColumn(cell.row.values.rcCircuits, 3)}
        //             </Monospace>
        //         );
        //     },
        // },
        {
            id: 'tags',
            Header: 'Tags',
            accessor: (rc) => `${rc.scopeTags?.map((scopeTag) => scopeTag.tagNo).join(', ')}`,
            Aggregated: () => null,
            aggregate: 'count',
            width: 200,
            Cell: (cell) => {
                return <Monospace>{cell.row.values.tags}</Monospace>;
            },
        },
        {
            id: 'heattraceTags',
            Header: 'HT tags',
            accessor: (rc) => `${rc.scopeHTTags?.map((heattrace) => heattrace.tagNo).join(', ')}`,
            Aggregated: () => null,
            aggregate: 'count',
            width: 200,
            Cell: (cell) => {
                return <Monospace>{cell.row.values.heattraceTags}</Monospace>;
            },
        },
        // { Adjust width when reimplementing this column
        //     id: 'rcAreas',
        //     accessor: 'areas',
        //     Header: 'Areas',
        //     Aggregated: () => null,
        //     width: 300,
        //     aggregate: 'count',
        //     Cell: (cell) => {
        //         return (
        //             <Monospace>
        //                 {generateCommaSeperatedStringArrayColumn(cell.row.values.rcAreas ?? '', 5)}
        //             </Monospace>
        //         );
        //     },
        // },
        // { Adjust width when reimplementing this column
        //     id: 'rcCommPks',
        //     accessor: 'commPkNos',
        //     Header: 'CommPks',
        //     Aggregated: () => null,
        //     width: 300,
        //     aggregate: 'count',
        //     Cell: (cell) => {
        //         return (
        //             <Monospace>
        //                 {generateCommaSeperatedStringArrayColumn(cell.row.values.rcCommPks, 3)}
        //             </Monospace>
        //         );
        //     },
        // },
        {
            id: 'phase',
            Header: 'Phase',
            accessor: (rc) => rc.phase,
            Aggregated: () => null,
            aggregate: 'count',
            width: 75,
        },
        {
            id: 'dueDate',
            Header: 'Due date',
            accessor: (rc) => rc.plannedDueDate,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
            Cell: (cell) => {
                return (
                    <>
                        {cell.row.values.dueDate &&
                            new Date(cell.row.values.dueDate).toLocaleDateString('en-gb')}
                    </>
                );
            },
        },
        {
            id: 'state',
            Header: 'State',
            accessor: (rc) => rc.state,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
            Cell: (cell) => {
                return <>{cell.row.values.state.isVoided ? 'Voided' : cell.row.values.state}</>;
            },
        },
        {
            id: 'lastModified',
            Header: 'Last modified',
            accessor: (rc) => rc.modifiedAtUtc,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
            Cell: (cell) => {
                return (
                    <>
                        {cell.row.values.lastModified &&
                            new Date(cell.row.values.lastModified).toLocaleDateString('en-gb')}
                    </>
                );
            },
        },
        {
            id: 'createdAt',
            Header: 'Created at',
            accessor: (rc) => rc.createdAtUtc,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
            Cell: (cell) => {
                return (
                    <>
                        {cell.row.values.createdAt &&
                            new Date(cell.row.values.createdAt).toLocaleDateString('en-gb')}
                    </>
                );
            },
        },
    ],
};
