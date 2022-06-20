import { Button } from '@equinor/eds-core-react';
import { isProduction } from '@equinor/lighthouse-portal-client';
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
    const getProcosysUrl = (id: string): string => {
        const url = `https://procosys.equinor.com/JOHAN_CASTBERG/WorkOrders/WorkOrder#id=${id}`;
        return isProduction() ? url : url.replace('procosys', 'procosystest');
    };

    const someColumns: Column<any>[] = [
        generateColumn(
            'WO',
            ({ workOrderNo, sourceIdentity }) => {
                return (
                    <LinkContent
                        target="_BLANK"
                        href={getProcosysUrl(sourceIdentity)}
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
        <div>{workOrders && <Table data={workOrders} columns={someColumns} options={{}} />}</div>
    );
}
