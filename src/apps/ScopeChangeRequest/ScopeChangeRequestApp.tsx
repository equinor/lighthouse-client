import { createDataViewer } from '../../components/CompletionView/src/DataViewerApi/DataViewerApi';
import { AppApi } from '../apps';
import { ScopeChangeRequest, WorkflowStep } from './Types/scopeChangeRequest';
import { baseClient } from '@equinor/http-client';
import { statusBarData } from './Sections/AnalyticsConfig';
import { CustomSidesheet } from './Components/CustomSidesheet';
import { createDataFactory } from '@equinor/DataFactory';
import { ScopeChangeRequestForm } from './Components/Form/ScopeChangeRequestForm';
import { AnalyticsOptions } from '@equinor/Diagrams';
import { Workflow } from './Components/Workflow/Workflow';

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
        component: ScopeChangeRequestForm,
    });

    request.registerDataSource(async () => {
        // const plantId = 'PCS$JOHAN_CASTBERG';
        // const project = 'L.O532C.002';
        const response = await api.fetch(
            `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests`
        );

        return JSON.parse(await response.text());

        // const a: ScopeChangeRequest = {
        //     id: '1',
        //     actualChangeHours: 2,
        //     category: 'IC',
        //     created: '',
        //     createdBy: '',
        //     description: '',
        //     estimatedChangeHours: 2,
        //     lastModified: '',
        //     lastModifiedBy: '',
        //     origin: '',
        //     phase: '',
        //     state: '',
        //     title: '',
        //     currentWorkflowStep: {
        //         id: '1',
        //         isCompleted: false,
        //         name: 'initiator',
        //         order: 1,
        //     },
        //     workflowSteps: [
        //         {
        //             id: '2',
        //             isCompleted: false,
        //             name: 'Coordinator',
        //             order: 2,
        //         },
        //         {
        //             id: '1',
        //             isCompleted: false,
        //             name: 'initiator',
        //             order: 14,
        //         },
        //         {
        //             id: '1',
        //             isCompleted: false,
        //             name: 'initiator',
        //             order: 1,
        //         },
        //     ],
        // };
        // return [a];
    });

    request.registerFilterOptions({
        excludeKeys: ['currentWorkflowStep', 'workflowSteps'],
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
        hiddenColumns: ['currentWorkflowStep', 'createdBy', 'lastModified', 'lastModifiedBy'],
        headers: [
            { key: 'id', title: 'Id' },
            { key: 'actualChangeHours', title: 'Actual hours' },
            { key: 'category', title: 'Category' },
            { key: 'workflowSteps', title: 'Workflow' },
        ],
        customCellView: [
            {
                key: 'created',
                type: 'Date',
            },
            {
                key: 'description',
                type: 'Description',
            },
            {
                key: 'workflowSteps',
                type: {
                    Cell: ({ cell }) => {
                        return (
                            <div style={{ width: '100%' }}>
                                <Workflow
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
    //request.registerGardenOptions({ gardenKey: 'origin', itemKey: 'id' });

    request.registerAnalyticsOptions(analyticsOptions);

    request.registerStatusItems(statusBarData);

    request.registerDataViewSideSheetOptions({ CustomRender: CustomSidesheet });

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
