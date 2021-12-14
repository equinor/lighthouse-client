import { createDataViewer } from '../../components/CompletionView/src/DataViewerApi/DataViewerApi';
import { AppApi } from '../apps';
import { ScopeChangeRequest } from './Types/scopeChangeRequest';
import { baseClient } from '@equinor/http-client';
import { statusBarData } from './Sections/AnalyticsConfig';
import { CustomSidesheet } from './Components/CustomSidesheet';
import { createDataFactory } from '@equinor/DataFactory';
import { ScopeChangeRequestForm } from './Components/Form/ScopeChangeRequestForm';
import { AnalyticsOptions } from '@equinor/Diagrams';

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
    });

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
