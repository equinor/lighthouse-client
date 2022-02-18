import { AnalyticsOptions } from '@equinor/Diagrams';
import { ClientApi } from '@equinor/portal-client';
import { ScopeChangeSideSheet } from './Components/Sidesheet/ScopeChangeSidesheet';
import { ScopeChangeRequestForm } from './Components/Form/ScopeChangeRequestForm';
import { WorkflowCompact } from './Components/Workflow/Components/WorkflowCompact';
import { statusBarData } from './Sections/AnalyticsConfig';
import { ScopeChangeRequest, WorkflowStep } from './Types/scopeChangeRequest';
import { OriginLink } from './Components/DetailView/Components/OriginLink';
import { Icon } from '@equinor/eds-core-react';
import { httpClient } from '../../Core/Client/Functions/HttpClient';

export function setup(appApi: ClientApi): void {
    const request = appApi.createWorkSpace<ScopeChangeRequest>({
        CustomSidesheet: ScopeChangeSideSheet,
    });

    request.registerDataCreator({
        title: 'Scope change',
        component: ScopeChangeRequestForm,
    });

    request.registerDataSource(async (): Promise<ScopeChangeRequest[]> => {
        // const plantId = 'PCS$JOHAN_CASTBERG';
        // const projectName = 'L.O532C.002';
        // const projectId = 177433
        const { scopeChange } = httpClient();
        const response = await scopeChange.fetch(`api/scope-change-requests`);

        return JSON.parse(await response.text());
    });

    const scopeChangeExcludeFilterKeys: (keyof ScopeChangeRequest)[] = [
        'id',
        'currentWorkflowStep',
        'workflowSteps',
        'isVoided',
        'state',
        'originSource',
        'originSourceId',
    ];

    request.registerFilterOptions({
        excludeKeys: scopeChangeExcludeFilterKeys,
        typeMap: {},
        initialFilters: ['State', 'phase', 'category', 'Origin', 'Step', 'NextToSign'],
        groupValue: {
            NextToSign: (item: ScopeChangeRequest): string => {
                if (item.state !== 'Open') {
                    return 'Closed';
                }
                return (
                    item.currentWorkflowStep?.criterias.find((x) => x.signedAtUtc === null)
                        ?.valueDescription ?? 'null'
                );
            },
            State: (item: ScopeChangeRequest): string => {
                if (item.isVoided) {
                    return 'Voided';
                }
                return item.state;
            },
            Origin: (item: ScopeChangeRequest) => {
                return item.originSource;
            },
            Step: (item: ScopeChangeRequest) => {
                return item?.currentWorkflowStep?.name ?? '(Blank)';
            },
        },
    });

    request.registerTableOptions({
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
        ],
        hiddenColumns: [
            'id',
            'description',
            'guesstimateDescription',
            'createdBy',
            'createdAtUtc',
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
            // {
            //     key: 'commissioningPackages',
            //     title: 'Comm Pkgs',
            //     width: 120,
            // },
            // {
            //     key: 'systems',
            //     title: 'Systems',
            //     width: 120,
            // },
            // {
            //     key: 'attachments',
            //     title: {
            //         Custom: () => <Icon name="attach_file" />,
            //     },
            //     width: 80,
            // },
            // {
            //     key: 'disciplines',
            //     title: {
            //         Custom: () => <Icon name="school" />,
            //     },
            //     width: 80,
            // },
            // {
            //     key: 'areas',
            //     title: {
            //         Custom: () => <Icon name="pin_drop" />,
            //     },
            //     width: 80,
            // },
            {
                key: 'hasComments',
                title: {
                    Custom: () => <Icon name="comment_chat" />,
                },
                width: 80,
            },
            // {
            //     key: 'documents',
            //     title: {
            //         Custom: () => <Icon name="file_copy" />,
            //     },
            //     width: 80,
            // },
            // {
            //     key: 'tags',
            //     title: {
            //         Custom: () => <Icon name="tag" />,
            //     },
            //     width: 80,
            // },
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
                key: 'estimatedChangeHours',
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
                        return <div>{request.isVoided ? 'VOIDED' : request.state}</div>;
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
            // {
            //     key: 'tags',
            //     type: 'Array',
            // },
            // {
            //     key: 'systems',
            //     type: 'Array',
            // },
            // {
            //     key: 'attachments',
            //     type: 'Array',
            // },
            // {
            //     key: 'documents',
            //     type: 'Array',
            // },
            // {
            //     key: 'areas',
            //     type: 'Array',
            // },
            // {
            //     key: 'disciplines',
            //     type: 'Array',
            // },
            // {
            //     key: 'commissioningPackages',
            //     type: 'Array',
            // },
            {
                key: 'hasComments',
                type: {
                    Cell: ({ cell }: any) => {
                        return (
                            <Icon
                                name={cell.value.content.hasComments ? 'comment_chat' : 'comment'}
                                color={cell.value.content.hasComments ? 'black' : 'grey'}
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
    });

    const statusDotFunc = (item: WorkflowStep) => {
        if (item.isCurrent) {
            return 'Active';
        }

        switch (item.isCompleted) {
            case true:
                return 'Completed';

            case false:
                return 'Inactive';
        }
    };
    request.registerGardenOptions({
        gardenKey: 'originSource',
        itemKey: 'sequenceNumber',
        fieldSettings: {},
    });

    // request.registerAnalyticsOptions(analyticsOptions);

    request.registerStatusItems(statusBarData);
}

export const analyticsOptions: AnalyticsOptions<ScopeChangeRequest> = {
    section1: {
        chart1: {
            type: 'lineChart',
            options: { categoryKey: 'originSource', nameKey: 'category' },
        },
    },
};
