import { AnalyticsOptions } from '@equinor/Diagrams';
import { ClientApi } from '@equinor/portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { ScopeChangeSideSheet } from './Components/Sidesheet/ScopeChangeSidesheet';
import { ScopeChangeRequestForm } from './Components/Form/ScopeChangeRequestForm';
import { WorkflowCompact } from './Components/Workflow/WorkflowCompact';
import { statusBarData } from './Sections/AnalyticsConfig';
import { ScopeChangeRequest, WorkflowStep } from './Types/scopeChangeRequest';

export function setup(appApi: ClientApi): void {
    const request = appApi.createWorkSpace<ScopeChangeRequest>({
        CustomSidesheet: ScopeChangeSideSheet,
    });

    request.registerDataCreator({
        title: 'Scope change',
        component: ScopeChangeRequestForm,
    });

    request.registerDataSource(async () => {
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
            'currentWorkflowStep',
            'attachments',
            'systems',
            'tags',
            'commissioningPackages',
            'documents',
            'description',
            'guesstimateDescription',
            'createdBy',
            'createdAtUtc',
            'modifiedBy',
            'originSourceId',
        ],
        columnOrder: [
            'title',
            'phase',
            'workflowSteps',
            'guesstimateHours',
            'estimatedChangeHours',
            'actualChangeHours',
            'category',
            'originSource',
            'lastModified',
        ],
        headers: [
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
        ],
        customCellView: [
            {
                key: 'createdBy',
                type: {
                    Cell: ({ cell }: any) => {
                        return <div>{cell.value.content.createdBy?.firstName}</div>;
                    },
                },
            },
            {
                key: 'modifiedAtUtc',
                type: 'Date',
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
                key: 'isVoided',
                type: {
                    Cell: ({ cell }) => {
                        return <div>{cell.value.content.isVoided.toString()}</div>;
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
