import { generateCommaSeperatedStringArrayColumn } from '@equinor/Table';
import { TableOptions } from '@equinor/WorkSpace';
import { WorkflowCompact } from '../../../ScopeChangeRequest/workspaceConfig/sTable/WorkflowCompact';
import { Monospace } from '../../Styles/WrapperStyles';
import { ReleaseControl } from '../../types/releaseControl';

const customCellView = (render: (req: ReleaseControl) => JSX.Element | null) => ({
    Cell: ({ cell }: any) => <>{render(cell.value.content)}</>,
});

export const tableConfig: TableOptions<ReleaseControl> = {
    objectIdentifierKey: 'id',
    enableSelectRows: true,
    hiddenColumns: [
        'id',
        'description',
        'isVoided',
        'hasComments',
        'hasPendingContributions',
        'createdBy',
        'modifiedBy',
        'scopeTags',
        'scopeHTTags',
        'documents',
        'punchListItems',
        'attachments',
        'scopeChangeRequestReferences',
        'circuits',
        'switchboards',
        'systems',
        'areas',
        'commPkIds',
        'commPkNos',
    ],
    columnOrder: ['sequenceNumber', 'title', 'workflowSteps'],
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
    customCellView: [
        {
            key: 'sequenceNumber',
            type: customCellView((rc) => <>{'RC' + rc.sequenceNumber}</>),
        },
        {
            key: 'plannedDueDate',
            type: customCellView((rc) => (
                <>{rc.plannedDueDate && new Date(rc.plannedDueDate).toLocaleDateString('en-gb')}</>
            )),
        },
        {
            key: 'workflowSteps',
            type: customCellView((rc) => <WorkflowCompact steps={rc.workflowSteps as any[]} />),
        },
        {
            key: 'createdAtUtc',
            type: customCellView((rc) => (
                <>{rc.createdAtUtc && new Date(rc.createdAtUtc).toLocaleDateString('en-gb')}</>
            )),
        },
        {
            key: 'state',
            type: customCellView((rc) => <>{rc.isVoided ? 'Voided' : rc.state}</>),
        },
        {
            key: 'modifiedAtUtc',
            type: customCellView((rc) => (
                <>{rc.modifiedAtUtc && new Date(rc.modifiedAtUtc).toLocaleDateString('en-gb')}</>
            )),
        },
        {
            key: 'currentWorkflowStep',
            type: customCellView((rc) => <>{rc?.currentWorkflowStep?.name}</>),
        },
    ],
    customColumns: [
        {
            id: 'rcSystems',
            accessor: 'systems',
            Header: 'Systems',
            Aggregated: () => null,
            width: 300,
            aggregate: 'count',
            Cell: (cell) => {
                console.log(cell);
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
