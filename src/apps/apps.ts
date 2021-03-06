import { AppGroupe, AppGroups, AppManifest } from '@equinor/lighthouse-portal-client';
import { AssetDataIcon } from '../icons/Asset data icon';
import { CollaborationIcon } from '../icons/Collaboration icon';
import { ConstructionManagementIcon } from '../icons/construction management icon';
import { EngineeringManagementIcon } from '../icons/Engineering management icon';
import { HomeIcon } from '../icons/Home icon';
import { ProjectInformationIcon } from '../icons/ProjectInformationIcon';
import { QualityIcon } from '../icons/Quality icon';
import { QueriesAndRequests } from '../icons/Queries and requests icon';
import { ReportIcon } from '../icons/Report icon';
import { ProjectControlIcon } from '../icons/Scope and change icon';
import { SSUIcon } from '../icons/SSUIcon';
import { PortalModelViewer } from './3DModel/src';
import { setup as checklistSetup } from './Checklist';
import { setup as disciplineReleaseControlSetup } from './DisciplineReleaseControl/DisciplineReleaseControlApp';
import { setup as handoverSetup } from './Handover';
import { setup as installationSetup } from './Installation';
import { setup as McSetup } from './MechanicalCompletion';
import {
    BusinessCaseReport,
    LCIReport,
    MDRReport,
    NonConformityReport,
    QualityDeviationReport,
    SafetyPerformanceReport,
} from './PowerBI';
import { setup as punchSetup } from './Punch';
import { setup as querySetup } from './Query';
import { setup as releaseControlSetup } from './ReleaseControl/ReleaseControlApp';
import { setup as scopeChangeSetup } from './ScopeChangeRequest/ScopeChangeRequestApp';
import { setup as SwcrSetup } from './swcr';
import { setup as tasksSetup } from './Tasks/TasksApp';
import { setup as WorkOrderSetup } from './WorkOrder';
import { setup as workPreparationSetup } from './workPreparation';
import { setup as loopSetup } from './Loop';
import { setup as punchDevSetup } from './Punch_Dev';
export function getApps(): AppManifest[] {
    return apps;
}

export function getAppGroups(): AppGroups {
    return appGroups;
}

export enum Apps {
    AssetData = 'AssetData',
    Top = 'Top',
    Collaboration = 'Collaboration',
    ConstructionAndCommissioning = 'ConstructionAndCommissioning',
    Engineering = 'Engineering',
    ProjectInformation = 'ProjectInformation',
    QueriesAndRequests = 'QueriesAndRequests',
    QualityAndRisk = 'QualityAndRisk',
    ProjectControl = 'ProjectControl',
    Reports = 'Reports',
    SSU = 'SSU',
}

export const appGroups: Record<Apps, AppGroupe> = {
    AssetData: {
        name: 'Asset data',
        icon: AssetDataIcon,
        columnId: 4,
    },
    Top: {
        name: 'Top',
        icon: HomeIcon,
        columnId: 1,
    },
    Collaboration: {
        name: 'Collaboration',
        icon: CollaborationIcon,
        columnId: 4,
    },
    ConstructionAndCommissioning: {
        name: 'Construction and Commissioning',
        icon: ConstructionManagementIcon,
        columnId: 2,
    },
    Engineering: {
        name: 'Engineering',
        icon: EngineeringManagementIcon,
        columnId: 2,
    },
    ProjectInformation: {
        name: 'Project information',
        icon: ProjectInformationIcon,
        columnId: 1,
    },
    QueriesAndRequests: {
        name: 'Queries and requests',
        icon: QueriesAndRequests,
        columnId: 3,
    },
    QualityAndRisk: {
        name: 'Quality and risk',
        icon: QualityIcon,
        columnId: 3,
    },
    ProjectControl: {
        name: 'Project control',
        icon: ProjectControlIcon,
        columnId: 3,
    },
    SSU: {
        name: 'SSU',
        icon: SSUIcon,
        columnId: 1,
    },
    Reports: {
        name: 'Reports',
        icon: ReportIcon,
        columnId: 3,
    },
};
export const apps: AppManifest[] = [
    // Project information
    {
        title: 'Home',
        shortName: '/',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: HomeIcon,
        tags: [],

        appEnv: 'test',
    },
    {
        title: 'Tasks',
        shortName: 'tasks',
        color: '#8C1159',
        groupe: Apps.ProjectInformation,
        tags: [],
        icon: '',
        appEnv: 'dev',
        app: {
            appType: 'Workspace',
            setup: tasksSetup,
        },
    },
    {
        title: 'Business case',
        shortName: 'business-case',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: BusinessCaseReport,
        },

        appEnv: 'prod',
        tags: ['PowerBI'],
    },
    {
        title: 'Milestone',
        shortName: 'milestone',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        tags: [],
    },
    {
        title: 'Org chart',
        shortName: 'org-chart',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        uri: (isProduction: boolean) =>
            `${
                isProduction
                    ? 'https://fusion.equinor.com/apps/pro-org/3cf72ff9-c50f-4e94-ba79-31721ba42dec/chart'
                    : 'https://pro-s-portal-ci.azurewebsites.net/apps/pro-org/3cf72ff9-c50f-4e94-ba79-31721ba42dec/chart'
            }`,
        appEnv: 'prod',
        tags: [],
    },
    {
        title: 'Work processes',
        shortName: 'work-processes',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        tags: [],
    },
    //SSU
    {
        title: 'Safety Performance',
        shortName: 'safety-performance',
        color: '#0364B8',
        groupe: Apps.SSU,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: SafetyPerformanceReport,
        },
        tags: ['PowerBI'],

        appEnv: 'prod',
    },
    {
        title: 'Barrier Management Tool',
        shortName: 'bmt',
        color: '#0364B8',
        groupe: Apps.SSU,
        icon: '',
        uri: (isProduction: boolean) =>
            isProduction
                ? 'https://fusion.equinor.com/apps/bmt/65728fee-185d-4a0c-a91d-8e3f3781dad8'
                : 'https://pro-s-portal-ci.azurewebsites.net/apps/bmt/b6552a8f-9173-416f-9fc0-996387ff7e3a',
        appEnv: 'prod',
        tags: ['Fusion', 'Link'],
    },
    // Engineering
    {
        title: 'Control object status',
        shortName: 'object-status',
        color: '#0364B8',
        groupe: Apps.Engineering,
        icon: '',
        tags: [],
    },
    {
        title: 'LCI hanging garden',
        shortName: 'lci-garden',
        color: '#0364B8',
        groupe: Apps.Engineering,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: LCIReport,
        },
        tags: ['PowerBI'],

        appEnv: 'prod',
    },
    {
        title: 'LCI portal',
        shortName: 'lci-portal',
        color: '#0364B8',
        groupe: Apps.Engineering,
        icon: '',
        tags: [],
    },
    {
        title: 'MDR analytics',
        shortName: 'mdr',
        color: '#0364B8',
        groupe: Apps.Engineering,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: MDRReport,
        },
        tags: ['PowerBI'],

        appEnv: 'prod',
    },
    // Construction And Commissioning
    {
        title: 'Project Browser',
        shortName: 'project-browser',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: [],
    },
    {
        title: 'Handover',
        shortName: 'handover',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: [],
        app: {
            appType: 'Workspace',
            setup: handoverSetup,
        },
        appEnv: 'prod',
        helpPageUrl: 'https://statoilsrm.sharepoint.com/sites/Portal/SitePages/Handover.aspx',
    },
    {
        title: 'Work order',
        shortName: 'work-order',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        app: {
            appType: 'Workspace',
            setup: WorkOrderSetup,
        },
        tags: ['Job'],
        appEnv: 'prod',
        helpPageUrl: 'https://statoilsrm.sharepoint.com/sites/Portal/SitePages/Work-order.aspx',
    },
    {
        title: 'Mechanical Completion',
        shortName: 'mc',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        app: {
            appType: 'Workspace',
            setup: McSetup,
        },
        tags: ['Job'],
        appEnv: 'prod',
    },

    {
        // Ny Power Bi
        title: 'Work preparation',
        shortName: 'work-preparation',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: ['PowerBI'],
        app: {
            appType: 'PowerBIViewer',
            setup: workPreparationSetup,
        },
        appEnv: 'prod',
    },
    {
        title: 'Installation',
        shortName: 'installation',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: ['PowerBI'],
        app: {
            appType: 'PowerBIViewer',
            setup: installationSetup,
        },
        appEnv: 'prod',
        helpPageUrl: 'https://statoilsrm.sharepoint.com/sites/Portal/SitePages/Installation.aspx',
    },
    {
        title: 'Piping and Heat trace',
        shortName: 'piping-and-ht',
        color: '#0084C4',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: [],
        app: {
            appType: 'Workspace',
            setup: disciplineReleaseControlSetup,
        },
        appEnv: 'prod',
        helpPageUrl:
            'https://statoilsrm.sharepoint.com/sites/Portal/SitePages/Piping-and-heat-trace.aspx',
    },
    {
        title: 'Release control',
        shortName: 'release',
        color: '#0084C4',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: [],
        app: {
            appType: 'Workspace',
            setup: releaseControlSetup,
        },
        appEnv: 'test',
        helpPageUrl:
            'https://statoilsrm.sharepoint.com/sites/Portal/SitePages/Release-control.aspx',
    },
    {
        title: 'Preservation',
        shortName: 'preservation',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        uri: (isProduction: boolean) =>
            `https://${
                isProduction ? 'procosys' : 'procosystest'
            }.equinor.com/JOHAN_CASTBERG/Preservation`,
        tags: ['link', 'procosys'],
        appEnv: 'prod',
    },
    {
        title: 'Checklist',
        shortName: 'checklist',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: ['PowerBI'],
        app: {
            appType: 'PowerBIViewer',
            setup: checklistSetup,
        },
        appEnv: 'prod',
    },

    {
        title: 'Loop',
        shortName: 'loop',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: [],
        app: {
            appType: 'Workspace',
            setup: loopSetup,
        },
        appEnv: 'prod',
    },

    {
        title: 'N2He',
        shortName: 'N2He',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: [],
        app: {
            appType: 'Workspace',
        },
    },
    {
        title: 'Punch',
        shortName: 'punch',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: ['PowerBI'],
        app: {
            appType: 'PowerBIViewer',
            setup: punchSetup,
        },
        appEnv: 'prod',
    },
    {
        title: 'Dev punch',
        shortName: '_punch_dev',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: [],
        app: {
            appType: 'Workspace',
            setup: punchDevSetup,
        },
        appEnv: 'dev',
    },
    {
        title: 'SWCR',
        shortName: 'swcr',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        tags: [],
        app: {
            appType: 'Workspace',
            setup: SwcrSetup,
        },
        appEnv: 'prod',
        helpPageUrl: 'https://statoilsrm.sharepoint.com/sites/Portal/SitePages/SWCR.aspx',
    },
    {
        title: 'Invitation for punch out ',
        shortName: 'ipo',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        uri: (isProduction: boolean) =>
            `https://${
                isProduction ? 'procosys' : 'procosystest'
            }.equinor.com/JOHAN_CASTBERG/InvitationForPunchOut`,
        tags: ['link', 'procosys'],
        appEnv: 'prod',
    },
    {
        title: 'Commisisoning procedure',
        shortName: 'commisisoning-procedure',
        color: '#0364B8',
        groupe: Apps.ConstructionAndCommissioning,
        icon: '',
        uri: (isProduction: boolean) =>
            `https://${
                isProduction ? 'fusion.equinor.com' : 'pro-s-portal-ci.azurewebsites.net'
            }/apps/dcp`,
        tags: ['link', 'fusion'],
        appEnv: 'prod',
    },
    // ProjectControl
    {
        title: 'Project change proposal',
        shortName: 'pcp',
        color: '#0364B8',
        groupe: Apps.ProjectControl,
        icon: '',
        tags: [],
    },
    {
        title: 'Scope change request',
        shortName: 'change',
        color: '#7B3A96',
        groupe: Apps.ProjectControl,
        icon: '',
        app: {
            appType: 'Workspace',
            setup: scopeChangeSetup,
        },
        tags: [],
        appEnv: 'prod',
        helpPageUrl:
            'https://statoilsrm.sharepoint.com/sites/Portal/SitePages/Scope-change-request.aspx',
    },
    {
        title: 'Management of change',
        shortName: 'moc',
        color: '#0364B8',
        groupe: Apps.ProjectControl,
        icon: '',
        uri: (isProduction: boolean) =>
            isProduction
                ? 'https://fusion.equinor.com/apps/management-of-change/3380fe7d-e5b7-441f-8ce9-a8c3133ee499'
                : 'https://pro-s-portal-ci.azurewebsites.net/apps/management-of-change',
        tags: ['Link', 'Fusion'],
        appEnv: 'prod',
    },
    {
        title: 'Project control and analysis',
        shortName: 'pcaa',
        color: '#0364B8',
        groupe: Apps.ProjectControl,
        icon: '',
        uri: (isProduction: boolean) =>
            isProduction
                ? 'https://fusion.equinor.com/apps/project-control-and-analysis/3380fe7d-e5b7-441f-8ce9-a8c3133ee499'
                : 'https://pro-s-portal-ci.azurewebsites.net/apps/project-control-and-analysis/b9a3246a-ddb5-4086-b4ec-dd4b0e88b700',
        tags: ['Link', 'Fusion'],
        appEnv: 'prod',
    },
    // QualityAndRisk
    {
        title: 'Dispensations',
        shortName: 'dispensations',
        color: '#0364B8',
        groupe: Apps.QualityAndRisk,
        icon: '',
        tags: [],
    },
    {
        title: 'Non conformity',
        shortName: 'non-comformacy',
        color: '#0364B8',
        groupe: Apps.QualityAndRisk,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: NonConformityReport,
        },
        tags: ['PowerBI'],
        appEnv: 'prod',
    },
    {
        title: 'Quality deviation',
        shortName: 'quality-deviation',
        color: '#0364B8',
        groupe: Apps.QualityAndRisk,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: QualityDeviationReport,
        },
        tags: ['PowerBI'],
        appEnv: 'prod',
    },
    // Collaboration
    {
        title: 'Meeting',
        shortName: 'meeting',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: 'tag',
        uri: (isProduction: boolean) =>
            isProduction
                ? 'https://fusion.equinor.com/apps/meetings'
                : 'https://pro-s-portal-ci.azurewebsites.net/apps/meetings',
        tags: ['fuison', 'link', 'external'],
        appEnv: 'prod',
    },
    {
        title: 'Review',
        shortName: 'rev',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: 'tag',
        uri: (isProduction: boolean) =>
            isProduction
                ? 'https://fusion.equinor.com/apps/reviews/255d8c0a-7893-4c21-ab42-62c652ea8129'
                : 'https://pro-s-portal-ci.azurewebsites.net/apps/reviews',
        tags: ['fuison', 'link', 'external'],
        appEnv: 'prod',
    },
    {
        title: 'Query analytics',
        shortName: 'query-analytics',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: '',
        app: {
            appType: 'PowerBIViewer',
            setup: querySetup,
        },
        tags: ['PowerBI'],
        appEnv: 'prod',
    },
    {
        title: 'Queries',
        shortName: 'queries',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: '',
        uri: (isProduction: boolean) =>
            `https://${
                isProduction ? 'procosys' : 'procosystest'
            }.equinor.com/JOHAN_CASTBERG/Search?searchType=Query`,
        tags: ['link', 'procosys'],
        appEnv: 'test',
    },
    {
        title: 'AKSO procedures',
        shortName: 'akso',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: 'tag',
        uri: () =>
            'https://akersolutions.sharepoint.com/sites/CastbergEquinor/Governing%20Documents/Forms/Procedures%20Work%20Instructions%20and%20guidelines.aspx',
        tags: ['akso', 'link', 'external'],
        appEnv: 'prod',
    },
    {
        title: 'Project Sharepoint',
        shortName: 'project-sharepoin',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: 'tag',
        uri: () => 'https://statoilsrm.sharepoint.com/sites/DM-PM050/SitePages/Homepage.aspx',
        tags: ['project', 'sharepoin', 'link', 'external'],
        appEnv: 'prod',
    },
    // Asset Data
    {
        title: '3D Model',
        shortName: '3dm',
        color: '#0364B8',
        groupe: Apps.AssetData,
        icon: '',
        tags: ['3D', 'Asset', 'Map'],
        app: {
            appType: 'CustomApp',
            component: PortalModelViewer,
        },
        appEnv: 'dev',
    },
    {
        title: 'Documents',
        shortName: 'doc',
        color: '#0364B8',
        groupe: Apps.AssetData,
        icon: '',
        uri: (isProduction: boolean) =>
            `https://${
                isProduction ? 'stid' : 'stidtest'
            }.equinor.com/JCA/search?type=doc&revstatus=OF%2CUA%2CRE%2CPL%2COF-P`,
        tags: ['3D', 'Asset', 'Map', 'Doc'],
        appEnv: 'prod',
    },
    {
        title: 'Tags',
        shortName: 'tags',
        color: '#0364B8',
        groupe: Apps.AssetData,
        icon: 'tag',
        uri: (isProduction: boolean) =>
            `https://${
                isProduction ? 'stid' : 'stidtest'
            }.equinor.com/JCA/search?type=tag&tagstatus=A%2CP%2CR%2CF`,
        tags: ['Tag', 'Data', 'Functional Location'],
        appEnv: 'prod',
    },
];
