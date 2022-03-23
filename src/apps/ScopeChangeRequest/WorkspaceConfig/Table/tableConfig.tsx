import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { TableOptions } from '../../../../Core/WorkSpace/src/WorkSpaceApi/workspaceState';
import { OriginLink } from '../../Components/DetailView/Components/OriginLink';
import { WorkflowCompact } from './WorkflowCompact';
import { getLastSigned } from './getLastSigned';
import { ScopeChangeRequest, WorkflowStep } from '../../Types/scopeChangeRequest';

export const tableConfig: TableOptions<ScopeChangeRequest> = {
    objectIdentifierKey: 'id',
    enableSelectRows: true,
    customColumns: [
        {
            Header: 'Current step',
            accessor: 'currentWorkflowStep',
            Cell: ({ cell }: any) => {
                return (
                    <div>
                        {cell.row.original.currentWorkflowStep ? (
                            <div>{cell.row.original.currentWorkflowStep.name}</div>
                        ) : (
                            ''
                        )}
                    </div>
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
                if (!lastSigned) return null;
                return <div>{lastSigned.toRelative()}</div>;
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
        'hasPendingContributions',
    ],
    columnOrder: [
        'sequenceNumber',
        'title',
        'hasComments',
        'phase',
        'workflowSteps',
        'CurrentStep',
        'currentWorkflowStep',
        'state',
        'guesstimateHours',
        'estimatedChangeHours',
        'actualChangeHours',
        'category',
        'originSource',
        'lastModified',
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
        { key: 'guesstimateHours', title: 'Guesstimate', width: 60 },
        { key: 'estimatedChangeHours', title: 'Estimate hours', width: 60 },
        { key: 'actualChangeHours', title: 'Actual', width: 60 },
        { key: 'category', title: 'Change category' },
        { key: 'originSource', title: 'Change origin' },
        { key: 'createdAtUtc', title: 'Created at' },
        { key: 'createdBy', title: 'Created by' },
        { key: 'modifiedAtUtc', title: 'Last updated' },
        { key: 'modifiedBy', title: 'Modified by' },
        { key: 'description', title: 'Description' },
        { key: 'state', title: 'State', width: 80 },
        { key: 'guesstimateDescription', title: 'Guesstimate description' },
        { key: 'currentWorkflowStep', title: 'Next to sign' },
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
    ],
    customCellView: [
        {
            key: 'modifiedAtUtc',
            type: 'RelativeDate',
        },
        {
            key: 'guesstimateHours',
            type: 'Description',
        },

        {
            key: 'createdAtUtc',
            type: 'Date',
        },
        {
            key: 'state',
            type: {
                Cell: ({ cell }: any) => {
                    const request: ScopeChangeRequest = cell.value.content;
                    return <div>{request.isVoided ? 'Voided' : request.state}</div>;
                },
            },
        },
        {
            key: 'workflowSteps',
            type: {
                Cell: ({ cell }: any) => {
                    return (
                        <div>
                            <WorkflowCompact
                                steps={cell.value.content.workflowSteps}
                                statusDotFunc={statusDotFunc}
                                spanDirection={'horizontal'}
                            />
                        </div>
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
                        <div>
                            {request.estimatedChangeHours > 0 ? (
                                request.estimatedChangeHours
                            ) : (
                                <></>
                            )}
                        </div>
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
                        <div>
                            {request.actualChangeHours > 0 ? request.actualChangeHours : <></>}
                        </div>
                    );
                },
            },
        },

        {
            key: 'hasComments',
            type: {
                Cell: ({ cell }: any) => {
                    if (!cell.value.content.hasComments) {
                        return null;
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
                        <div>
                            <OriginLink
                                onlyUnderlineOnHover={true}
                                type={cell.value.content.originSource}
                                id={cell.value.content.originSourceId}
                            />
                        </div>
                    );
                },
            },
        },
        {
            key: 'currentWorkflowStep',
            type: {
                Cell: ({ cell }: any) => {
                    return (
                        <div>
                            {cell.value.content.currentWorkflowStep?.criterias
                                .filter((x) => x.signedAtUtc === null)
                                .map((x) => {
                                    return <div key={x.id}>{x.valueDescription}</div>;
                                })}
                        </div>
                    );
                },
            },
        },
    ],
};

const statusDotFunc = (item: WorkflowStep) => {
    if (item.isCurrent) {
        return 'Active';
    }

    if (item.criterias.some((x) => x.signedState === 'Rejected')) {
        return 'Rejected';
    }
    switch (item.isCompleted) {
        case true:
            return 'Completed';

        case false:
            return 'Inactive';
    }
};
