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

    const scopeChangeExcludeKeys: (keyof ScopeChangeRequest)[] = [
        'id',
        'currentWorkflowStep',
        'workflowSteps',
    ];

    request.registerFilterOptions({
        excludeKeys: scopeChangeExcludeKeys,
        typeMap: {},
        initialFilters: ['state', 'phase', 'category', 'originSource', 'isVoided'],
        groupValue: {
            signedAtDate: (item: ScopeChangeRequest): string => {
                if (item.createdAtUtc === '') return 'unknown';
                switch (new Date(item.createdAtUtc).getMonth()) {
                    case 0:
                        return 'January';
                    case 1:
                        return 'February';
                    case 2:
                        return 'March';
                    case 3:
                        return 'April';
                    case 4:
                        return 'May';
                    case 5:
                        return 'June';
                    case 6:
                        return 'July';
                    case 7:
                        return 'August';
                    case 8:
                        return 'September';
                    case 9:
                        return 'October';
                    case 10:
                        return 'November';
                    case 11:
                        return 'December';
                    default:
                        return 'Unknown';
                }
            },
        },
    });

    request.registerTableOptions({
        objectIdentifierKey: 'id',
        enableSelectRows: true,
        hiddenColumns: [
            'id',
            // 'currentWorkflowStep',
            'description',
            'guesstimateDescription',
            'createdBy',
            'createdAtUtc',
            'modifiedBy',
            'originSourceId',
        ],
        columnOrder: [
            'sequenceNumber',
            'title',
            'hasComments',
            'phase',
            'workflowSteps',
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
            { key: 'sequenceNumber', title: 'Id' },
            { key: 'title', title: 'Title' },
            { key: 'phase', title: 'Phase' },
            { key: 'workflowSteps', title: 'Workflow' },
            { key: 'guesstimateHours', title: 'Guesstimate' },
            { key: 'estimatedChangeHours', title: 'Estimate hours' },
            { key: 'actualChangeHours', title: 'Actual' },
            { key: 'category', title: 'Change category' },
            { key: 'originSource', title: 'Change origin' },
            { key: 'createdAtUtc', title: 'Created at' },
            { key: 'createdBy', title: 'Created by' },
            { key: 'modifiedAtUtc', title: 'Last updated' },
            { key: 'modifiedBy', title: 'Modified by' },
            { key: 'description', title: 'Description' },
            { key: 'state', title: 'Status' },
            { key: 'guesstimateDescription', title: 'Guesstimate description' },
            { key: 'currentWorkflowStep', title: 'Next to sign' },
            {
                key: 'commissioningPackages',
                title: 'Comm Pkgs',
                width: 120,
            },
            {
                key: 'systems',
                title: 'Systems',
                width: 120,
            },
            {
                key: 'attachments',
                title: {
                    Custom: () => <Icon name="attach_file" />,
                },
                width: 80,
            },
            {
                key: 'disciplines',
                title: {
                    Custom: () => <Icon name="school" />,
                },
                width: 80,
            },
            {
                key: 'areas',
                title: {
                    Custom: () => <Icon name="pin_drop" />,
                },
                width: 80,
            },
            {
                key: 'hasComments',
                title: {
                    Custom: () => <Icon name="comment_chat" />,
                },
                width: 80,
            },
            {
                key: 'documents',
                title: {
                    Custom: () => <Icon name="file_copy" />,
                },
                width: 80,
            },
            {
                key: 'tags',
                title: {
                    Custom: () => <Icon name="tag" />,
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
                key: 'estimatedChangeHours',
                type: 'Description',
            },
            {
                key: 'createdAtUtc',
                type: 'Date',
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
                key: 'tags',
                type: 'Array',
            },
            {
                key: 'systems',
                type: 'Array',
            },
            {
                key: 'attachments',
                type: 'Array',
            },
            {
                key: 'documents',
                type: 'Array',
            },
            {
                key: 'commissioningPackages',
                type: 'Array',
            },
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
                key: 'isVoided',
                type: {
                    Cell: ({ cell }) => {
                        return <div>{cell.value.content.isVoided.toString()}</div>;
                    },
                },
            },
            {
                key: 'currentWorkflowStep',
                type: {
                    Cell: ({ cell }) => {
                        return (
                            <div>
                                {cell.value.content.currentWorkflowStep?.criterias.map((x) => {
                                    return <div key={x.id}>{x.value}</div>;
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
        itemKey: 'title',
        fieldSettings: {},
    });

    // request.registerAnalyticsOptions(analyticsOptions);

    request.registerStatusItems(statusBarData);

    // const workflowId = '6752c4c4-214d-4aae-ff2d-08d9bb10809e';
    // request.registerWorkflowEditorOptions({
    //     endpoint: `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows/${workflowId}/templates`,
    // });
}

export const analyticsOptions: AnalyticsOptions<ScopeChangeRequest> = {
    section1: {
        chart1: {
            type: 'lineChart',
            options: { categoryKey: 'originSource', nameKey: 'category' },
        },
    },
};
