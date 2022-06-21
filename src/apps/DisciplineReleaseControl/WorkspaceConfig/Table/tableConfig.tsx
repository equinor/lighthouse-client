import { tokens } from '@equinor/eds-tokens';
import { TableOptions } from '@equinor/WorkSpace';
import { WorkflowCompact } from '../../Components/Workflow/Components/WorkflowCompact';
import { WorkflowWarningTriangle } from '../../Components/Workflow/Components/WorkflowWarningTriangle';
import { CurrentStepContainer } from '../../Components/Workflow/Styles/styles';
import { getYearAndWeekFromString } from '../../Functions/statusHelpers';
import { createChecklistSteps, checklistTagFunc, getHTList } from '../../Functions/tableHelpers';
import { Monospace } from '../../Styles/Monospace';
import { Pipetest } from '../../Types/pipetest';

export const tableConfig: TableOptions<Pipetest> = {
    objectIdentifierKey: 'name',
    itemSize: 32,
    columnOrder: ['name', 'description', 'commPkPriority1', 'step'],
    hiddenColumns: [
        'rfccPlanned',
        'dueDateTimePeriod',
        'heatTraces',
        'overdue',
        'completionStatus',
        'insulationBoxes',
        'shortformCompletionStatus',
        'circuits',
        'pipetestProcessDoneInRightOrder',
        'step',
        'steps',
        'pipeInsulationBoxes',
        'htCableRfc',
        'lineNos',
        'mcPkgId',
    ],
    enableSelectRows: true,
    headers: [
        { key: 'name', title: 'Pipetest', width: 100 },
        { key: 'description', title: 'Description', width: 600 },
        { key: 'commPkPriority1', title: 'Priority', width: 90 },
        { key: 'checkLists', title: 'Checklist status', width: 260 },
        { key: 'commPkPriority1', title: 'Priority', width: 200 },
        { key: 'location', title: 'Location', width: 200 },
    ],
    customCellView: [
        {
            key: 'name',
            type: {
                Cell: ({ cell }: any) => {
                    return <Monospace>{cell.value.content.name}</Monospace>;
                },
            },
        },
        {
            key: 'checkLists',
            type: {
                Cell: ({ cell }: any) => {
                    return (
                        <WorkflowCompact
                            steps={createChecklistSteps(cell.value.content)}
                            statusDotFunc={checklistTagFunc}
                            spanDirection={'horizontal'}
                            dotSize={16}
                        />
                    );
                },
            },
        },
    ],
    customColumns: [
        {
            id: 'currentStep',
            accessor: 'step',
            Header: 'Current step',
            Aggregated: () => null,
            width: 210,
            aggregate: 'count',
            Cell: (cell) => {
                return (
                    <CurrentStepContainer>
                        {cell.row.values.step}
                        {!cell.row.values.pipetestProcessDoneInRightOrder && (
                            <WorkflowWarningTriangle
                                popoverText={
                                    'Some steps in this process has been done in the wrong order'
                                }
                                color={tokens.colors.text.static_icons__default.hex}
                            />
                        )}
                    </CurrentStepContainer>
                );
            },
        },
        {
            id: 'dueByWeek',
            accessor: 'rfccPlanned',
            Header: 'Piping RFC',
            Aggregated: () => null,
            width: 120,
            aggregate: 'count',
            Cell: (cell) => {
                return (
                    <Monospace>{getYearAndWeekFromString(cell.row.values.rfccPlanned)}</Monospace>
                );
            },
        },
        {
            id: 'htList',
            accessor: 'heatTraces',
            Header: 'HT cables',
            Aggregated: () => null,
            width: 935,
            aggregate: 'count',
            Cell: (cell) => {
                return (
                    <Monospace>
                        {getHTList(cell.row.values.checkLists.content.checkLists)}
                    </Monospace>
                );
            },
        },
    ],
};
