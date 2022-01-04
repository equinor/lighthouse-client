import { createDataViewer } from '../../components/CompletionView/src/DataViewerApi/DataViewerApi';
import { AppApi } from '../apps';
import { ScopeChangeRequest, WorkflowStep } from './Types/scopeChangeRequest';
import { baseClient } from '@equinor/http-client';
import { statusBarData } from './Sections/AnalyticsConfig';
import { CustomSidesheet } from './Components/CustomSidesheet';
import { createDataFactory } from '@equinor/DataFactory';
import { FormWrapper } from './Components/Form/ScopeChangeRequestForm';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { WorkflowCompact } from './Components/Workflow/WorkflowCompact';

export function setup(appApi: AppApi): void {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.procosys]);
    const request = createDataViewer<ScopeChangeRequest>({
        initialState: [],
        primaryViewKey: 'id',
        viewerId: appApi.shortName,
        dataFactoryCreator: createDataFactory,
    });

    request.registerDataCreator({
        title: 'Scope change',
        component: FormWrapper,
    });

    request.registerDataSource(async () => {
        // const plantId = 'PCS$JOHAN_CASTBERG';
        // const project = 'L.O532C.002';
        const response = await api.fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests`
        );

        return JSON.parse(await response.text());
    });

    const scopeChangeExcludeKeys: (keyof ScopeChangeRequest)[] = [
        'createdBy',
        'created',
        'lastModified',
        'lastModifiedBy',
        'description',
        'id',
        'currentWorkflowStep',
        'workflowSteps',
    ];

    request.registerFilterOptions({
        excludeKeys: scopeChangeExcludeKeys,
        typeMap: {},
        groupValue: {
            signedAtDate: (item: ScopeChangeRequest): string => {
                if (item.created === '') return 'unknown';
                switch (new Date(item.created).getMonth()) {
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

    request.registerViewOptions({
        objectIdentifierKey: 'id',
        title: {
            key: 'id',
            label: 'Request id',
        },
    });

    request.registerTableOptions({
        objectIdentifierKey: 'id',
        enableSelectRows: true,
        hiddenColumns: [
            'currentWorkflowStep',
            'createdBy',
            'lastModifiedBy',
            'id',
            'state',
            'created',
            'description',
        ],
        columnOrder: [
            'title',
            'phase',
            'workflowSteps',
            'estimatedChangeHours',
            'actualChangeHours',
            'category',
            'origin',
            'lastModified',
        ],
        headers: [
            { key: 'title', title: 'Title' },
            { key: 'phase', title: 'Phase' },
            { key: 'workflowSteps', title: 'Workflow' },
            { key: 'estimatedChangeHours', title: 'Estimate hours' },
            { key: 'actualChangeHours', title: 'Actual' },
            { key: 'category', title: 'Change category' },
            { key: 'origin', title: 'Change origin' },
            { key: 'lastModified', title: 'Last updated' },
            // { key: 'createdBy', title: 'Created by' },
            // { key: 'state', title: 'State' },
            // { key: 'description', title: 'Description' },
            // { key: 'id', title: 'Id' },
            // { key: 'created', title: 'Created' },
            // { key: 'lastModifiedBy', title: 'Last modified by' },
        ],
        customCellView: [
            {
                key: 'lastModified',
                type: 'Date',
            },

            {
                key: 'workflowSteps',
                type: {
                    Cell: ({ cell }) => {
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
    request.registerGardenOptions({ gardenKey: 'origin', itemKey: 'title' });

    request.registerAnalyticsOptions(analyticsOptions);

    request.registerStatusItems(statusBarData);

    request.registerDataViewSideSheetOptions({ CustomComponent: CustomSidesheet });

    // const workflowId = '6752c4c4-214d-4aae-ff2d-08d9bb10809e';
    // request.registerVisualEditorOptions({
    //     endpoint: `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/workflows/${workflowId}/templates`,
    // });
}

export const analyticsOptions: AnalyticsOptions<ScopeChangeRequest> = {
    section1: {
        chart1: {
            type: 'barChart',
            options: {
                categoryKey: 'origin',
                nameKey: 'category',
                stacked: true,
            },
        },
    },
};
