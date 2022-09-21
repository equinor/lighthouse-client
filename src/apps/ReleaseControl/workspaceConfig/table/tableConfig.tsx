import { generateCommaSeperatedStringArrayColumn } from '@equinor/Table';
import { TableOptions } from '@equinor/WorkSpace';
import { WorkflowCompact } from '../../../ScopeChangeRequest/workspaceConfig/sTable/WorkflowCompact';
import { Monospace } from '../../Styles/WrapperStyles';
import { ReleaseControl } from '../../types/releaseControl';

export const tableConfig: TableOptions<ReleaseControl> = {
    objectIdentifierKey: 'id',
    enableSelectRows: true,
    preventAutoGenerateColumns: true,
    headers: [
        { key: 'sequenceNumber', title: 'Id' },
        { key: 'title', title: 'Title' },
        { key: 'workflowSteps', title: 'Workflow' },
        { key: 'currentWorkflowStep', title: 'Current step' },
        { key: 'workflowStatus', title: 'Status' },
        { key: 'phase', title: 'Phase' },
        { key: 'state', title: 'State' },
        { key: 'plannedDueDate', title: 'Due date' },
        { key: 'createdAtUtc', title: 'Created at' },
        { key: 'modifiedAtUtc', title: 'Last modified' },
    ],
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
            width: 300,
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
            id: 'status',
            Header: 'Status',
            accessor: (rc) => rc.workflowStatus,
            Aggregated: () => null,
            aggregate: 'count',
            width: 100,
        },
        {
            id: 'currentStep',
            Header: 'Current step',
            accessor: (rc) => rc.currentWorkflowStep,
            Aggregated: () => null,
            aggregate: 'count',
            width: 200,
            Cell: (cell) => {
                return <>{cell.row.values.currentStep?.name}</>;
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
            id: 'rcSystems',
            accessor: 'systems',
            Header: 'Systems',
            Aggregated: () => null,
            width: 300,
            aggregate: 'count',
            Cell: (cell) => {
                return (
                    <Monospace>
                        {generateCommaSeperatedStringArrayColumn(cell.row.values.rcSystems, 8)}
                    </Monospace>
                );
            },
        },
        {
            id: 'rcAreas',
            accessor: 'areas',
            Header: 'Areas',
            Aggregated: () => null,
            width: 300,
            aggregate: 'count',
            Cell: (cell) => {
                return (
                    <Monospace>
                        {generateCommaSeperatedStringArrayColumn(cell.row.values.rcAreas, 5)}
                    </Monospace>
                );
            },
        },
        {
            id: 'rcCommPks',
            accessor: 'commPkNos',
            Header: 'CommPks',
            Aggregated: () => null,
            width: 300,
            aggregate: 'count',
            Cell: (cell) => {
                return (
                    <Monospace>
                        {generateCommaSeperatedStringArrayColumn(cell.row.values.rcCommPks, 3)}
                    </Monospace>
                );
            },
        },
        {
            id: 'rcSwitchboards',
            accessor: 'switchboards',
            Header: 'Switchboards',
            Aggregated: () => null,
            width: 300,
            aggregate: 'count',
            Cell: (cell) => {
                return (
                    <Monospace>
                        {generateCommaSeperatedStringArrayColumn(cell.row.values.rcSwitchboards, 4)}
                    </Monospace>
                );
            },
        },
        {
            id: 'rcCircuits',
            accessor: 'circuits',
            Header: 'Circuits',
            Aggregated: () => null,
            width: 300,
            aggregate: 'count',
            Cell: (cell) => {
                return (
                    <Monospace>
                        {generateCommaSeperatedStringArrayColumn(cell.row.values.rcCircuits, 3)}
                    </Monospace>
                );
            },
        },
    ],
};
