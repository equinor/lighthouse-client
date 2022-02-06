import { AnalyticsOptions } from '@equinor/Diagrams';
import { Typography } from '@equinor/eds-core-react';
import { baseClient } from '@equinor/http-client';
import { ClientApi } from '@equinor/portal-client';
import { IFilterType } from 'ag-grid-enterprise';
import { renderToStaticMarkup } from 'react-dom/server';
import { ScopeChangeSideSheet } from './Components/CustomSidesheet';
import { ScopeChangeRequestForm } from './Components/Form/ScopeChangeRequestForm';
import { WorkflowCompact } from './Components/Workflow/WorkflowCompact';
import { statusBarData } from './Sections/AnalyticsConfig';
import { ScopeChangeRequest, WorkflowStep } from './Types/scopeChangeRequest';

export function setup(appApi: ClientApi): void {
    const api = baseClient(appApi.authProvider, [appApi.appConfig.scope.scopeChange]);

    const request = appApi.createWorkSpace<ScopeChangeRequest>({
        CustomSidesheet: ScopeChangeSideSheet,
    });

    request.registerDataCreator({
        title: 'Scope change',
        component: ScopeChangeRequestForm,
    });

    request.registerDataSource(async () => {
        // const plantId = 'PCS$JOHAN_CASTBERG';
        // const project = 'L.O532C.002';
        // const response = await api.fetch(
        //     `https://app-ppo-scope-change-control-api-dev.azurewebsites.net/api/scope-change-requests`
        // );

        // return JSON.parse(await response.text());

        const scopeChanges: ScopeChangeRequest[] = [];

        for (let i = 0; i < 1000; i++) {
            scopeChanges.push({
                actualChangeHours: Math.round(Math.random() * 100),
                attachments: [],
                category: Math.random() * 1 ? 'Design Change' : 'Hidden carryover',
                commissioningPackages: [],
                createdAtUtc: new Date().toDateString(),
                createdBy: {
                    id: (Math.random() * 1000).toString(),
                    firstName: 'Gustav',
                    lastName: 'Eikaas',
                    oid: '1212',
                },
                description: '',
                documents: [],
                estimatedChangeHours: Math.round(Math.random() * 100),
                guesstimateDescription: '',
                guesstimateHours: Math.round(Math.random() * 100).toString(),
                id: (Math.random() * 2000).toString(),
                isVoided: Math.random() * 1 ? true : false,
                modifiedAtUtc: new Date().toDateString(),
                modifiedBy: {
                    id: (Math.random() * 1000).toString(),
                    firstName: 'Gustav',
                    lastName: 'Eikaas',
                    oid: '1212',
                },
                origin: Math.random() * 1 ? 'DCN' : 'Query',
                phase: 'IC phase',
                state: Math.random() * 1 ? 'Closed' : 'Open',
                systems: [],
                tags: [],
                title: 'Scope change',
                workflowSteps: [
                    {
                        contributors: [],
                        criterias: [],
                        id: (Math.round(Math.random() * 1)).toString(),
                        isCompleted: true,
                        isCurrent: false,
                        name: 'Review by engineering',
                        order: 0,
                    },
                    {
                        contributors: [],
                        criterias: [],
                        id: (Math.random() * 16).toString(),
                        isCompleted: false,
                        isCurrent: true,
                        name: 'Approval by integrated construction',
                        order: 1,
                    },
                    {
                        contributors: [],
                        criterias: [],
                        id: (Math.random() * 16).toString(),
                        isCompleted: false,
                        isCurrent: false,
                        name: 'Final approval',
                        order: 2,
                    },
                ],
                currentWorkflowStep: {
                    contributors: [],
                    criterias: [
                        {
                            id: (Math.random() * 1000).toString(),
                            signedAtUtc: new Date().toString(),
                            signedBy: {id: "2", oid: "2", lastName: "", firstName: ""},
                            signedComment: "",
                            signedState: null,
                            type: "",
                            value: "Guei@equinor.com"
                        }
                    ],
                    id: (Math.random() * 10000).toString(),
                    isCompleted: false,
                    isCurrent: true,
                    name: Math.random() >= 0.5 ? "Assign" : "Review",
                    order: 0,
                },
            });
        }
        return scopeChanges;
    });

    const scopeChangeExcludeKeys: (keyof ScopeChangeRequest)[] = [
        'id',
        'currentWorkflowStep',
        'workflowSteps',
    ];

    request.registerFilterOptions({
        excludeKeys: scopeChangeExcludeKeys,
        typeMap: {},
        initialFilters: ['state'],
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
        columnDefinition: [
            {
                field: 'workflowSteps',
                headerName: 'Workflow',
                cellRenderer: (props) => {
                    return renderToStaticMarkup(
                        <WorkflowCompact
                            steps={props.data.workflowSteps}
                            statusDotFunc={statusDotFunc}
                            spanDirection="horizontal"
                        />
                    );
                },
                enableRowGroup: false,
                rowGroup: false,
                filterValueGetter: ({ data }) => data.workflowSteps[0].id,
            },
            {
                field: "currentWorkflowStep",
                colId: "next to sign",
                headerName: "Next to sign",
                cellRenderer: (props) => renderToStaticMarkup(<NextToSign currentWorkflowStep={props.data.currentWorkflowStep} />),
                filter: true,
            },{
                field: "title"
            }
        ],
    });


    interface NextToSignProps {
        currentWorkflowStep: WorkflowStep
    }

    const NextToSign = ({currentWorkflowStep}: NextToSignProps) => {
        const unsignedCriterias = currentWorkflowStep.criterias.filter((x) => x.signedState === null).map((x) => x.value)

        return <div>{unsignedCriterias.map((x) => <div key={x}>{x}</div> )}</div>

    }

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
    request.registerGardenOptions({ gardenKey: 'origin', itemKey: 'title', fieldSettings: {} });

    request.registerAnalyticsOptions(analyticsOptions);

    request.registerStatusItems(statusBarData);

    // const workflowId = '6752c4c4-214d-4aae-ff2d-08d9bb10809e';
    // request.registerWorkflowEditorOptions({
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
