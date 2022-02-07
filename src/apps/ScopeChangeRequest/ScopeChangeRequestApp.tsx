import { AnalyticsOptions } from '@equinor/Diagrams';
import { ClientApi } from '@equinor/portal-client';
import { httpClient } from '../../Core/Client/Functions/HttpClient';
import { ScopeChangeSideSheet } from './Components/Sidesheet/ScopeChangeSidesheet';
import { ScopeChangeRequestForm } from './Components/Form/ScopeChangeRequestForm';
import { WorkflowCompact } from './Components/Workflow/WorkflowCompact';
import { statusBarData } from './Sections/AnalyticsConfig';
import { ScopeChangeRequest, WorkflowStep } from './Types/scopeChangeRequest';
import { OriginLink } from './Components/DetailView/Components/OriginLink';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { Icon } from '@equinor/eds-core-react';

export function setup(appApi: ClientApi): void {
    const request = appApi.createWorkSpace<ScopeChangeRequest>({
        CustomSidesheet: ScopeChangeSideSheet,
    });

    request.registerDataCreator({
        title: 'Scope change',
        component: ScopeChangeRequestForm,
    });

    request.registerDataSource((): ScopeChangeRequest[] => {
        // const plantId = 'PCS$JOHAN_CASTBERG';
        // const projectName = 'L.O532C.002';
        // const projectId = 177433
        // const { scopeChange } = httpClient();
        // const response = await scopeChange.fetch(`api/scope-change-requests`);

        // return JSON.parse(await response.text());

        return [
            {
                actualChangeHours: 2,
                attachments: [],
                category: 'Hidden carryover',
                commissioningPackages: [
                    {
                        id: '121212',
                        procosysId: 32323232323,
                        procosysNumber: '21313143',
                    },
                ],
                createdAtUtc: new Date().toDateString(),
                createdBy: {
                    firstName: 'gustav',
                    lastName: 'Eikaas',
                    id: '1212',
                    oid: '1212121221',
                },
                description:
                    'test Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat mauris ultrices magna dignissim rutrum. Proin eget quam tristique, feugiat ipsum ac, venenatis eros. Nullam egestas rhoncus sapien. Nam at magna et velit mattis accumsan id at lorem. In volutpat rutrum augue, in fringilla odio imperdiet non. Integer hendrerit condimentum augue. Aliquam feugiat eu libero eget porta. Vivamus nec nulla at nisl euismod elementum a sed libero. Praesent rhoncus justo nec diam imperdiet molestie. Morbi condimentum posuere tempor. Etiam vitae lorem dictum, imperdiet dui eu, pulvinar eros. Proin bibendum libero lorem, non scelerisque turpis sodales a. Fusce eget arcu nulla.',
                documents: [],
                estimatedChangeHours: 2,
                guesstimateDescription: 'test',
                guesstimateHours: 2,
                id: '1212',
                isVoided: false,
                modifiedAtUtc: new Date().toDateString(),
                modifiedBy: {
                    firstName: 'gustav',
                    lastName: 'Eikaas',
                    id: '1212',
                    oid: '1212121221',
                },
                originSource: 'DCN',
                phase: 'IC phase',
                state: 'Open',
                systems: [
                    {
                        procosysId: 611221,
                        id: (Math.random() * 32).toString(),
                        procosysCode: Math.round(Math.random() * 100).toString(),
                    },
                    {
                        procosysId: 611221,
                        id: (Math.random() * 32).toString(),
                        procosysCode: Math.round(Math.random() * 100).toString(),
                    },
                    {
                        procosysId: 611221,
                        id: (Math.random() * 32).toString(),
                        procosysCode: Math.round(Math.random() * 100).toString(),
                    },
                ],
                tags: [
                    {
                        procosysId: '12112',
                    },
                    {
                        procosysId: '124122',
                    },
                    {
                        procosysId: '62122',
                    },
                    {
                        procosysId: '17122',
                    },
                    {
                        procosysId: '172122',
                    },
                    {
                        procosysId: '12672',
                    },
                    {
                        procosysId: '78876',
                    },
                    {
                        procosysId: '145122',
                    },
                    {
                        procosysId: '1454522',
                    },
                    {
                        procosysId: '45122',
                    },
                ],
                title: 'Scope change',
                hasComments: true,
                workflowSteps: [
                    {
                        contributors: [
                            {
                                contribution: null,
                                createdAtUtc: null,
                                id: '12313',
                                person: {
                                    firstName: 'Gustav',
                                    lastName: 'Eikaas',
                                    id: '1212',
                                    oid: '1212121221',
                                },
                                instructionsToContributor: 'Give input',
                            },
                        ],
                        criterias: [
                            {
                                id: '121212',
                                signedAtUtc: null,
                                signedBy: {},
                                signedComment: null,
                                signedState: null,
                                type: 'RequireProcosysUserSignature',
                                value: 'Guei@equinor.com',
                            },
                            {
                                id: '12122222',
                                signedAtUtc: null,
                                signedBy: {},
                                signedComment: null,
                                signedState: null,
                                type: 'RequireProcosysUserSignature',
                                value: 'Guei@equinor.com',
                            },
                        ],
                        id: '12121212',
                        isCompleted: false,
                        isCurrent: true,
                        name: 'Review by engineering',
                        order: 0,
                    },
                    {
                        contributors: [],
                        criterias: [
                            {
                                id: '22211|213',
                                signedAtUtc: null,
                                signedBy: {},
                                signedComment: null,
                                signedState: null,
                                type: 'RequireProcosysGroupSignature',
                                value: 'Construction_Role',
                            },
                        ],
                        id: '1212112',
                        isCompleted: false,
                        isCurrent: false,
                        name: 'Review by engineering',
                        order: 1,
                    },
                ],
                currentWorkflowStep: {
                    contributors: [
                        {
                            contribution: null,
                            createdAtUtc: null,
                            id: '12313',
                            person: {
                                firstName: 'Gustav',
                                lastName: 'Eikaas',
                                id: '1212',
                                oid: '1212121221',
                            },
                            instructionsToContributor: 'Give input',
                        },
                    ],
                    criterias: [
                        {
                            id: '121212',
                            signedAtUtc: null,
                            signedBy: {},
                            signedComment: null,
                            signedState: null,
                            type: 'RequireProcosysUserSignature',
                            value: 'Guei@equinor.com',
                        },
                        {
                            id: '12122222',
                            signedAtUtc: null,
                            signedBy: {},
                            signedComment: null,
                            signedState: null,
                            type: 'RequireProcosysUserSignature',
                            value: 'Guei@equinor.com',
                        },
                    ],
                    id: '12121212',
                    isCompleted: false,
                    isCurrent: true,
                    name: 'Review by engineering',
                    order: 0,
                },

                originSourceId: '12121212',
            },
            {
                actualChangeHours: 2,
                attachments: [],
                category: 'Hidden carryover',
                commissioningPackages: [
                    {
                        id: '121212',
                        procosysId: 32323232323,
                        procosysNumber: '21313143',
                    },
                ],
                createdAtUtc: new Date().toDateString(),
                createdBy: {
                    firstName: 'gustav',
                    lastName: 'Eikaas',
                    id: '1212',
                    oid: '1212121221',
                },
                description:
                    'test Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras consequat mauris ultrices magna dignissim rutrum. Proin eget quam tristique, feugiat ipsum ac, venenatis eros. Nullam egestas rhoncus sapien. Nam at magna et velit mattis accumsan id at lorem. In volutpat rutrum augue, in fringilla odio imperdiet non. Integer hendrerit condimentum augue. Aliquam feugiat eu libero eget porta. Vivamus nec nulla at nisl euismod elementum a sed libero. Praesent rhoncus justo nec diam imperdiet molestie. Morbi condimentum posuere tempor. Etiam vitae lorem dictum, imperdiet dui eu, pulvinar eros. Proin bibendum libero lorem, non scelerisque turpis sodales a. Fusce eget arcu nulla.',
                documents: [],
                estimatedChangeHours: 2,
                guesstimateDescription: 'test',
                guesstimateHours: 2,
                id: '121sss2',
                isVoided: false,
                modifiedAtUtc: new Date().toDateString(),
                modifiedBy: {
                    firstName: 'gustav',
                    lastName: 'Eikaas',
                    id: '1212',
                    oid: '1212121221',
                },
                originSource: 'DCN',
                phase: 'IC phase',
                state: 'Open',
                systems: [
                    {
                        procosysId: 611221,
                        id: (Math.random() * 32).toString(),
                        procosysCode: Math.round(Math.random() * 100).toString(),
                    },
                    {
                        procosysId: 611221,
                        id: (Math.random() * 32).toString(),
                        procosysCode: Math.round(Math.random() * 100).toString(),
                    },
                    {
                        procosysId: 611221,
                        id: (Math.random() * 32).toString(),
                        procosysCode: Math.round(Math.random() * 100).toString(),
                    },
                ],
                tags: [
                    {
                        procosysId: '12112',
                    },
                    {
                        procosysId: '124122',
                    },
                    {
                        procosysId: '62122',
                    },
                    {
                        procosysId: '17122',
                    },
                    {
                        procosysId: '172122',
                    },
                    {
                        procosysId: '12672',
                    },
                    {
                        procosysId: '78876',
                    },
                    {
                        procosysId: '145122',
                    },
                    {
                        procosysId: '1454522',
                    },
                    {
                        procosysId: '45122',
                    },
                ],
                title: 'Scope change',
                hasComments: false,
                workflowSteps: [
                    {
                        contributors: [
                            {
                                contribution: null,
                                createdAtUtc: null,
                                id: '12313',
                                person: {
                                    firstName: 'Gustav',
                                    lastName: 'Eikaas',
                                    id: '1212',
                                    oid: '1212121221',
                                },
                                instructionsToContributor: 'Give input',
                            },
                        ],
                        criterias: [
                            {
                                id: '121212',
                                signedAtUtc: null,
                                signedBy: {},
                                signedComment: null,
                                signedState: null,
                                type: 'RequireProcosysUserSignature',
                                value: 'Guei@equinor.com',
                            },
                            {
                                id: '12122222',
                                signedAtUtc: null,
                                signedBy: {},
                                signedComment: null,
                                signedState: null,
                                type: 'RequireProcosysUserSignature',
                                value: 'Guei@equinor.com',
                            },
                        ],
                        id: '12121212',
                        isCompleted: false,
                        isCurrent: true,
                        name: 'Review by engineering',
                        order: 0,
                    },
                    {
                        contributors: [],
                        criterias: [
                            {
                                id: '22211|213',
                                signedAtUtc: null,
                                signedBy: {},
                                signedComment: null,
                                signedState: null,
                                type: 'RequireProcosysGroupSignature',
                                value: 'Construction_Role',
                            },
                        ],
                        id: '1212112',
                        isCompleted: false,
                        isCurrent: false,
                        name: 'Review by engineering',
                        order: 1,
                    },
                ],
                currentWorkflowStep: {
                    contributors: [
                        {
                            contribution: null,
                            createdAtUtc: null,
                            id: '12313',
                            person: {
                                firstName: 'Gustav',
                                lastName: 'Eikaas',
                                id: '1212',
                                oid: '1212121221',
                            },
                            instructionsToContributor: 'Give input',
                        },
                    ],
                    criterias: [
                        {
                            id: '121212',
                            signedAtUtc: null,
                            signedBy: {},
                            signedComment: null,
                            signedState: null,
                            type: 'RequireProcosysUserSignature',
                            value: 'Guei@equinor.com',
                        },
                        {
                            id: '12122222',
                            signedAtUtc: null,
                            signedBy: {},
                            signedComment: null,
                            signedState: null,
                            type: 'RequireProcosysUserSignature',
                            value: 'Guei@equinor.com',
                        },
                    ],
                    id: '12121212',
                    isCompleted: false,
                    isCurrent: true,
                    name: 'Review by engineering',
                    order: 0,
                },

                originSourceId: '12121212',
            },
        ];
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
            'documents',
            'tags',
            'systems',
            'commissioningPackages',
            'attachments',
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
            { key: 'currentWorkflowStep', title: 'Next to sign' },
            { key: 'documents', title: 'Documents', width: 120 },
            { key: 'systems', title: 'Systems', width: 120 },
            { key: 'commissioningPackages', title: 'Comm pkgs', width: 120 },
            { key: 'tags', title: 'Tags', width: 120 },
            { key: 'attachments', title: 'Attachments', width: 120 },
            { key: 'hasComments', title: 'Comments', width: 50 },
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
