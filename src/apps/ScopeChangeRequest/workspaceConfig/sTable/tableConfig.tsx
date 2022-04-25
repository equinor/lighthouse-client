import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { TableOptions } from '../../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { OriginLink } from '../../Components/DetailView/OriginLink';
import { WorkflowCompact } from './WorkflowCompact';
import { getLastSigned } from './getLastSigned';
import { Criteria, ScopeChangeRequest } from '../../types/scopeChangeRequest';
import { Fragment } from 'react';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import { Atom, deref, swap } from '@dbeining/react-atom';
import { EstimateBar } from '../../Components/WoProgressBars/EstimateBar';
import { ActualProgress } from '../../Components/WoProgressBars/ProgressBarContainer.styles';

export const tableConfig: TableOptions<ScopeChangeRequest> = {
    objectIdentifierKey: 'id',
    enableSelectRows: true,
    customColumns: [
        {
            Header: 'Current step',
            accessor: 'currentWorkflowStep',
            Cell: ({ cell }: any) => {
                return (
                    <>
                        {cell.row.original.currentWorkflowStep ? (
                            <>{cell.row.original.currentWorkflowStep.name}</>
                        ) : (
                            '-'
                        )}
                    </>
                );
            },
            id: 'CurrentStep',
            width: 180,
            Aggregated: () => null,
            aggregate: 'count',
        },
        {
            Header: 'Last signed',
            accessor: 'workflowSteps',
            Cell: ({ cell }: any) => {
                const request = cell.row.original as ScopeChangeRequest;

                const lastSigned = getLastSigned(request);
                if (!lastSigned) return '-';
                return <div>{lastSigned.toRelative({ locale: 'en-GB' })}</div>;
            },
            id: 'LastSigned',
            width: 180,
            Aggregated: () => null,
            aggregate: 'count',
        },
    ],
    hiddenColumns: [
        'id',
        'description',
        'guesstimateDescription',
        'createdBy',
        'modifiedBy',
        'originSourceId',
        'tags',
        'systems',
        'commissioningPackages',
        'areas',
        'documents',
        'attachments',
        'isVoided',
        'disciplines',
    ],
    columnOrder: [
        'sequenceNumber',
        'title',
        'hasComments',
        'hasPendingContributions',
        'phase',
        'workflowSteps',
        'CurrentStep',
        'currentWorkflowStep',
        'workflowStatus',
        'state',
        'guesstimateHours',
        'estimatedChangeHours',
        'actualChangeHours',
        'changeCategory',
        'originSource',
        'modifiedAtUtc',
        'systems',
        'areas',
        'commissioningPackages',
        'tags',
        'disciplines',
        'documents',
        'attachments',
    ],
    headers: [
        { key: 'sequenceNumber', title: 'Id', width: 60 },
        { key: 'title', title: 'Title' },
        { key: 'phase', title: 'Phase', width: 60 },
        { key: 'workflowSteps', title: 'Workflow' },
        { key: 'guesstimateHours', title: 'Guesstimate', width: 120 },
        { key: 'estimatedChangeHours', title: 'Estimate hours', width: 120 },
        { key: 'actualChangeHours', title: 'Actual', width: 80 },
        { key: 'changeCategory', title: 'Change category' },
        { key: 'originSource', title: 'Change origin' },
        { key: 'createdAtUtc', title: 'Created at' },
        { key: 'workflowStatus', title: 'Status' },
        { key: 'createdBy', title: 'Created by' },
        { key: 'modifiedAtUtc', title: 'Last updated' },
        { key: 'modifiedBy', title: 'Modified by' },
        { key: 'description', title: 'Description' },
        { key: 'state', title: 'State', width: 80 },
        { key: 'guesstimateDescription', title: 'Guesstimate description' },
        { key: 'currentWorkflowStep', title: 'Next ' },
        {
            key: 'hasComments',
            title: {
                Custom: () => (
                    <Icon
                        color={tokens.colors.text.static_icons__default.hex}
                        name="comment_chat"
                    />
                ),
            },
            width: 80,
        },
        {
            key: 'hasPendingContributions',
            width: 70,
            title: {
                Custom: () => (
                    <Icon color={tokens.colors.text.static_icons__default.hex} name="group" />
                ),
            },
        },
    ],

    customCellView: [
        {
            key: 'createdAtUtc',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;
                    return (
                        <>
                            {request.createdAtUtc
                                ? DateTime.fromJSDate(new Date(request.createdAtUtc)).toRelative({
                                    locale: 'en-GB',
                                })
                                : '-'}
                        </>
                    );
                },
            },
        },

        {
            key: 'modifiedAtUtc',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;
                    return (
                        <>
                            {request.modifiedAtUtc
                                ? DateTime.fromJSDate(new Date(request.modifiedAtUtc)).toRelative({
                                    locale: 'en-GB',
                                })
                                : '-'}
                        </>
                    );
                },
            },
        },
        {
            key: 'guesstimateHours',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;

                    if (deref(guesstimateHoursAtom) === -1) {
                        console.log('Calculating max guesstimate hours');
                        const maxCount = Math.max(
                            ...cell.column.filteredRows.map((val) => val.original.guesstimateHours)
                        );
                        swap(guesstimateHoursAtom, () => maxCount);
                    }

                    const count = deref(guesstimateHoursAtom);

                    return (
                        <EstimateBar
                            percentWidth={(request.guesstimateHours / count) * 100}
                            number={request.guesstimateHours ?? 0}
                        />
                    );
                },
            },
        },
        {
            key: 'actualChangeHours',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;
                    return (
                        <Container>
                            {!request.actualChangeHours ? '-' : request.actualChangeHours}
                        </Container>
                    );
                },
            },
        },
        {
            key: 'estimatedChangeHours',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;
                    return (
                        <Container>
                            {!request.estimatedChangeHours ? '-' : request.estimatedChangeHours}
                        </Container>
                    );
                },
            },
        },

        {
            key: 'changeCategory',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;
                    return <>{request.changeCategory.name}</>;
                },
            },
        },
        {
            key: 'state',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;
                    return <>{request.isVoided ? 'Voided' : request.state}</>;
                },
            },
        },
        {
            key: 'hasPendingContributions',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;
                    return request.hasPendingContributions ? (
                        <Icon color={tokens.colors.text.static_icons__default.hex} name="group" />
                    ) : (
                        '-'
                    );
                },
            },
        },
        {
            key: 'workflowSteps',
            type: {
                Cell: ({ cell }: any) => {
                    return <WorkflowCompact steps={cell.value.content.workflowSteps} />;
                },
            },
        },
        {
            key: 'hasComments',
            type: {
                Cell: ({ cell }: any) => {
                    if (!cell.value.content.hasComments) {
                        return '-';
                    }

                    return (
                        <Icon
                            name={'comment_chat'}
                            color={`${tokens.colors.text.static_icons__default.hex}`}
                        />
                    );
                },
            },
        },
        {
            key: 'originSource',
            type: {
                Cell: ({ cell }: any) => {
                    return (
                        <>
                            <OriginLink
                                onlyUnderlineOnHover={true}
                                type={cell.value.content.originSource}
                                id={cell.value.content.originSourceId}
                            />
                        </>
                    );
                },
            },
        },
        {
            key: 'currentWorkflowStep',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;

                    if (!request.currentWorkflowStep) {
                        return '-';
                    }

                    return (
                        <>
                            {request.currentWorkflowStep?.criterias.map((x: Criteria) => {
                                return <Fragment key={x.id}>{x.valueDescription}</Fragment>;
                            })}
                        </>
                    );
                },
            },
        },
    ],
};

const Container = styled.div`
    text-align: end;
    font-variant-numeric: tabular-nums;
`;

const guesstimateHoursAtom = Atom.of<number>(-1);
