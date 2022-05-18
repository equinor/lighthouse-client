import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { TableOptions } from '../../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { OriginLink } from '../../Components/DetailView/OriginLink';
import { WorkflowCompact } from './WorkflowCompact';
import { getLastSigned } from './getLastSigned';
import { ScopeChangeRequest } from '../../types/scopeChangeRequest';
import { DateTime } from 'luxon';
import { Atom, deref, swap } from '@dbeining/react-atom';
import { EstimateBar } from '../../Components/WoProgressBars/EstimateBar';
import { ExpendedProgressBar } from '../../Components/WoProgressBars/ExpendedProgressBar';
import styled from 'styled-components';

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
                        {cell.row.original.currentWorkflowStep && (
                            <>{cell.row.original.currentWorkflowStep.name}</>
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
                if (!lastSigned) return <></>;
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
        'disciplineGuesstimates',
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
        { key: 'title', title: 'Title', width: 250 },
        { key: 'phase', title: 'Phase', width: 60 },
        { key: 'workflowSteps', title: 'Workflow', width: 110 },
        { key: 'disciplineGuesstimates', title: 'Guess mhrs', width: 120 },
        { key: 'estimatedChangeHours', title: 'Est mhrs', width: 120 },
        { key: 'actualChangeHours', title: 'Exp mhrs', width: 120 },
        { key: 'changeCategory', title: 'Change category' },
        { key: 'originSource', title: 'Change origin' },
        { key: 'createdAtUtc', title: 'Created at' },
        { key: 'workflowStatus', title: 'Status' },
        { key: 'createdBy', title: 'Created by' },
        { key: 'modifiedAtUtc', title: 'Last updated' },
        { key: 'modifiedBy', title: 'Modified by' },
        { key: 'description', title: 'Description' },
        { key: 'state', title: 'State', width: 80 },
        { key: 'currentWorkflowStep', title: 'Next', width: 220 },
        {
            key: 'hasComments',
            title: 'Comment',
            width: 80,
        },
        {
            key: 'hasPendingContributions',
            width: 70,
            title: 'Contr.',
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
                            {request.createdAtUtc &&
                                DateTime.fromJSDate(new Date(request.createdAtUtc)).toRelative({
                                    locale: 'en-GB',
                                })}
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
                            {request.modifiedAtUtc &&
                                DateTime.fromJSDate(new Date(request.modifiedAtUtc)).toRelative({
                                    locale: 'en-GB',
                                })}
                        </>
                    );
                },
            },
        },
        {
            key: 'disciplineGuesstimates',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;

                    if (deref(guesstimateHoursMaxAtom) === -1) {
                        const maxCount = Math.max(
                            ...cell.column.filteredRows.map((val) =>
                                val.original.disciplineGuesstimates.reduce(
                                    (count, curr) => curr.guesstimate + count,
                                    0
                                )
                            )
                        );
                        swap(guesstimateHoursMaxAtom, () => maxCount);
                    }

                    const count = deref(guesstimateHoursMaxAtom);

                    return (
                        <EstimateBar
                            current={request.disciplineGuesstimates.reduce(
                                (count, curr) => curr.guesstimate + count,
                                0
                            )}
                            max={count}
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

                    if (deref(actualHoursMaxAtom) === -1) {
                        const maxCount = Math.max(
                            ...cell.column.filteredRows.map((val) => val.original.actualChangeHours)
                        );
                        swap(actualHoursMaxAtom, () => maxCount);
                    }

                    const highestExpendedHours = deref(actualHoursMaxAtom);

                    return (
                        <ExpendedProgressBar
                            actual={request.actualChangeHours}
                            estimate={request.estimatedChangeHours}
                            highestExpended={highestExpendedHours}
                        />
                    );
                },
            },
        },
        {
            key: 'estimatedChangeHours',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;

                    if (deref(estimateHoursMaxAtom) === -1) {
                        const maxCount = Math.max(
                            ...cell.column.filteredRows.map(
                                (val) => val.original.estimatedChangeHours
                            )
                        );
                        swap(estimateHoursMaxAtom, () => maxCount);
                    }

                    const highestEstimateHours = deref(estimateHoursMaxAtom);

                    return (
                        <EstimateBar
                            current={request.estimatedChangeHours}
                            max={highestEstimateHours}
                        />
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
                    return (
                        request.hasPendingContributions && (
                            <CenterIcon>
                                <Icon
                                    color={tokens.colors.text.static_icons__default.hex}
                                    name="group"
                                />
                            </CenterIcon>
                        )
                    );
                },
            },
        },
        {
            key: 'workflowSteps',
            type: {
                Cell: ({ cell }: any): JSX.Element => {
                    return <WorkflowCompact steps={cell.value.content.workflowSteps} />;
                },
            },
        },
        {
            key: 'hasComments',
            type: {
                Cell: ({ cell }: any) => {
                    if (!cell.value.content.hasComments) {
                        return <></>;
                    }

                    return (
                        <CenterIcon>
                            <Icon
                                name={'comment_chat'}
                                color={`${tokens.colors.text.static_icons__default.hex}`}
                            />
                        </CenterIcon>
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
                        return <></>;
                    }

                    return (
                        <>
                            {request.currentWorkflowStep?.criterias.find(
                                (x) => x.signedAtUtc === null
                            )?.valueDescription ?? null}
                        </>
                    );
                },
            },
        },
    ],
};

const guesstimateHoursMaxAtom = Atom.of<number>(-1);
const estimateHoursMaxAtom = Atom.of<number>(-1);
const actualHoursMaxAtom = Atom.of<number>(-1);

const CenterIcon = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
`;
