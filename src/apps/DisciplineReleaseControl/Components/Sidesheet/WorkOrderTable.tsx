import { Button } from '@equinor/eds-core-react-old';
import { proCoSysUrls } from '@equinor/procosys-urls';
import { Column, EstimateBar, ExpendedProgressBar, ProgressBar, Table } from '@equinor/Table';
import styled from 'styled-components';
import { WorkOrder } from '../../Types/workOrder';
import { generateColumn, highestEstimate, highestExpended } from './workOrderHelpers';

interface WorkOrderTableProps {
    workOrders: WorkOrder[];
}

const LinkContent = styled.a`
    text-decoration: none;
`;

export function WorkOrderTable({ workOrders }: WorkOrderTableProps): JSX.Element {
    //Remove duplicates
    workOrders = workOrders.filter(
        (v, i, a) => a.findIndex((wo) => wo.workOrderNo === v.workOrderNo) === i
    );

    const rowHeight = 35;

    const someColumns: Column<any>[] = [
        generateColumn(
            'WO',
            ({ workOrderNo, workOrderUrlId }) => {
                return (
                    <LinkContent
                        target="_BLANK"
                        href={proCoSysUrls.getWorkOrderUrl(workOrderUrlId ?? '')}
                        rel="noreferrer"
                    >
                        <Button key="linkToProcosys" variant="ghost">
                            {workOrderNo}
                        </Button>
                    </LinkContent>
                );
            },
            170
        ),
        generateColumn('Title', ({ title }) => title, 310),
        generateColumn('Discipline', ({ discipline }) => discipline, 80),
        generateColumn('Status', ({ jobStatus }) => jobStatus, 80),
        generateColumn(
            'Plan. finish',
            ({ plannedCompletionDate }) =>
                plannedCompletionDate === null
                    ? 'No date'
                    : new Date(plannedCompletionDate).toLocaleDateString('EN-GB'),
            100
        ),
        generateColumn(
            'Act. finish',
            ({ actualCompletionDate }) =>
                actualCompletionDate === null
                    ? ''
                    : new Date(actualCompletionDate).toLocaleDateString('EN-GB'),
            100
        ),
        generateColumn(
            'Progress',
            ({ projectProgress }) => <ProgressBar percentWidth={parseInt(projectProgress)} />,
            100
        ),
        generateColumn(
            'Estimated',
            ({ estimatedManHours }) => (
                <EstimateBar
                    current={parseInt(estimatedManHours)}
                    max={highestEstimate(workOrders)}
                />
            ),
            100
        ),
        generateColumn(
            'Expended',
            ({ expendedManHours, estimatedManHours }) => (
                <ExpendedProgressBar
                    actual={Number(expendedManHours) ?? 0}
                    estimate={parseInt(estimatedManHours)}
                    highestExpended={highestExpended(workOrders)}
                />
            ),
            100
        ),
    ];

    return (
        <div>
            {workOrders && (
                <Table
                    data={workOrders}
                    columns={someColumns}
                    options={{}}
                    height={rowHeight + workOrders?.length * rowHeight}
                />
            )}
        </div>
    );
}
