import { AppGroups, AppManifest } from '@equinor/portal-client';
import { AssetDataIcon } from '../icons/Asset data icon';
import { CollaborationIcon } from '../icons/Collaboration icon';
import { CompletionManagementIcon } from '../icons/Completion management icon';
import { ConstructionManagementIcon } from '../icons/construction management icon';
import { EngineeringManagementIcon } from '../icons/Engineering management icon';
import { HomeIcon } from '../icons/Home icon';
import { ProgressAndStatusIcon } from '../icons/Progress and status icon';
import { ProjectInformationIcon } from '../icons/ProjectInformationIcon';
import { QualityIcon } from '../icons/Quality icon';
import { QueriesAndRequests } from '../icons/Queries and requests icon';
import { ReportIcon } from '../icons/Report icon';
import { ProjectControlIcon } from '../icons/Scope and change icon';
import { SSUIcon } from '../icons/SSUIcon';
import { ModelViewer } from './3DModel/src/3DModel';
import { setup as checklistSetup } from './checklistApp';
import { setup as commissioningSetup } from './Commissioning';
import { setup as constructionSetup } from './Construction';
import { setup as handoverSetup } from './handoverApp';
import { setup as heatTraceInstallationSetup } from './HeatTraceInstallation/HeatTraceInstallationApp';
import { setup as loopSetup } from './Loop/loopApp';
import {
    BusinessCaseReport,
    LCIReport,
    MDRReport,
    NonConformityReport,
    QualityDeviationReport,
    QueryReport,
    SafetyPerformanceReport,
} from './PowerBI';
import { setup as scopeChangeSetup } from './ScopeChangeRequest/ScopeChangeRequestApp';
import { setup as SwcrSetup } from './swcr';
import { setup as WorkOrderSetup } from './WorkOrder';

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
    ProgressAndStatus = 'ProgressAndStatus',
    CompletionManagement = 'CompletionManagement',
    ConstructionManagement = 'ConstructionManagement',
    EngineeringManagement = 'EngineeringManagement',
    ProjectInformation = 'ProjectInformation',
    QueriesAndRequests = 'QueriesAndRequests',
    QualityAndCompliance = 'QualityAndCompliance',
    ProjectControl = 'ProjectControl',
    Reports = 'Reports',
    SSU = 'SSU',
}

export const appGroups: AppGroups = {
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
    ProgressAndStatus: {
        name: 'Progress and status',
        icon: ProgressAndStatusIcon,
        columnId: 1,
    },
    ConstructionManagement: {
        name: 'Construction management',
        icon: ConstructionManagementIcon,
        columnId: 2,
    },
    EngineeringManagement: {
        name: 'Engineering management',
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
    QualityAndCompliance: {
        name: 'Quality and compliance',
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

    CompletionManagement: {
        name: 'Completion management',
        icon: CompletionManagementIcon,
        columnId: 2,
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
        title: 'Business case',
        shortName: 'business-case',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: BusinessCaseReport,
        },

        appEnv: 'test',
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
        uri: 'https://fusion.equinor.com/apps/pro-org/3cf72ff9-c50f-4e94-ba79-31721ba42dec/chart',
        appEnv: 'test',
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

        appEnv: 'test',
    },
    // ProgressAndStatus
    {
        title: 'Overview',
        shortName: 'overview',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        tags: [],
        app: {
            appType: 'PageView',
        },
    },
    {
        title: 'Engineering',
        shortName: 'engineering',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        tags: [],
        app: {
            appType: 'PageView',
        },
    },
    {
        title: 'Construction',
        shortName: 'construction',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        tags: [],
        app: {
            appType: 'PageView',
            setup: constructionSetup,
        },

        appEnv: 'test',
    },
    {
        title: 'Commissioning',
        shortName: 'commissioning',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        tags: [],
        app: {
            appType: 'PageView',
            setup: commissioningSetup,
        },

        appEnv: 'dev',
    },
    // Engineering management
    {
        title: 'Control object status',
        shortName: 'object-status',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        tags: [],
    },
    {
        title: 'LCI hanging garden',
        shortName: 'lci-garden',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: LCIReport,
        },
        tags: ['PowerBI'],

        appEnv: 'test',
    },
    {
        title: 'LCI portal',
        shortName: 'lci-portal',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        tags: [],
    },
    {
        title: 'MDR analytics',
        shortName: 'mdr',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: MDRReport,
        },
        tags: ['PowerBI'],

        appEnv: 'test',
    },
    // Construction management
    {
        title: 'Work order',
        shortName: 'work-order',
        color: '#0364B8',
        groupe: Apps.ConstructionManagement,
        icon: '',
        app: {
            appType: 'DataViewer',
            setup: WorkOrderSetup,
        },
        tags: ['Job'],
    },
    // CompletionManagement
    {
        title: 'Project explorer',
        shortName: 'project-explorer',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        tags: [],
    },
    {
        title: 'Checklist',
        shortName: 'checklist',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        tags: [],
        app: {
            appType: 'DataViewer',
            setup: checklistSetup,
        },
    },
    {
        title: 'Handover',
        shortName: 'handover',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        tags: [],
        app: {
            appType: 'DataViewer',
            setup: handoverSetup,
        },
        appEnv: 'dev',
    },
    {
        title: 'Heat trace installation',
        shortName: 'heat-trace',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        tags: [],
        app: {
            appType: 'DataViewer',
            setup: heatTraceInstallationSetup,
        },
        appEnv: 'dev',
    },
    {
        title: 'Loop',
        shortName: 'loop',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        tags: [],
        app: {
            appType: 'DataViewer',
            setup: loopSetup,
        },
    },
    {
        title: 'N2He',
        shortName: 'N2He',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        tags: [],
        app: {
            appType: 'DataViewer',
        },
    },
    {
        title: 'Preservation',
        shortName: 'preservation',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        uri: 'https://procosys.equinor.com/JOHAN_CASTBERG/Preservation',
        tags: ['link', 'procosys'],
        appEnv: 'test',
    },
    {
        title: 'Punch',
        shortName: 'punch',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        tags: [],
        app: {
            appType: 'DataViewer',
        },
    },
    {
        title: 'SWCR',
        shortName: 'swcr',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        tags: [],
        app: {
            appType: 'DataViewer',
            setup: SwcrSetup,
        },
        appEnv: 'dev',
    },
    {
        title: 'Commisisoning procedure',
        shortName: 'commisisoning-procedure',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        uri: 'https://fusion.equinor.com/apps/dcp',
        tags: ['link', 'fusion'],
        appEnv: 'test',
    },
    {
        title: 'Invitation for punch out ',
        shortName: 'ipo',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        uri: 'https://procosys.equinor.com/JOHAN_CASTBERG/InvitationForPunchOut',
        tags: ['link', 'procosys'],
        appEnv: 'test',
    },
    // Queries and requests
    {
        title: 'ATS request',
        shortName: 'ats',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        tags: [],
    },
    {
        title: 'Change request',
        shortName: 'change',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        app: {
            appType: 'DataViewer',
            setup: scopeChangeSetup,
        },
        tags: [],
        appEnv: 'dev',
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
        title: 'Scope change control',
        shortName: 'sca',
        color: '#0364B8',
        groupe: Apps.ProjectControl,
        icon: '',
        tags: [],
    },
    // QualityAndCompliance
    {
        title: 'Dispensations',
        shortName: 'dispensations',
        color: '#0364B8',
        groupe: Apps.QualityAndCompliance,
        icon: '',
        tags: [],
    },
    {
        title: 'N-comformacy request',
        shortName: 'n-comformacy-request',
        color: '#0364B8',
        groupe: Apps.QualityAndCompliance,
        icon: '',
        tags: [],
    },
    {
        title: 'Non-comformacy',
        shortName: 'non-comformacy',
        color: '#0364B8',
        groupe: Apps.QualityAndCompliance,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: NonConformityReport,
        },
        tags: ['PowerBI'],
        appEnv: 'test',
    },
    {
        title: 'Quality deviation',
        shortName: 'quality-deviation',
        color: '#0364B8',
        groupe: Apps.QualityAndCompliance,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: QualityDeviationReport,
        },
        tags: ['PowerBI'],
        appEnv: 'test',
    },

    {
        title: 'Overtime request',
        shortName: 'overtime',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        tags: [],
    },
    {
        title: 'Query analytics',
        shortName: 'query-analytics',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        app: {
            appType: 'PowerBI',
            component: QueryReport,
        },
        tags: ['PowerBI'],
        appEnv: 'test',
    },
    {
        title: 'Queries',
        shortName: 'queries',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        uri: 'https://procosys.equinor.com/JOHAN_CASTBERG/Search?searchType=Query',
        tags: ['link', 'procosys'],
        appEnv: 'test',
    },
    // Reports
    // {
    //     title: 'temp-link',
    //     shortName: 'temp-link2',
    //     color: '#0364B8',
    //     groupe: Apps.Reports,
    //     icon: '',
    //     tags: [],
    // },

    // Collaboration
    {
        title: 'Meeting',
        shortName: 'meeting',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: 'tag',
        uri: 'https://fusion.equinor.com/apps/meetings',
        tags: ['fuison', 'link', 'external'],
        appEnv: 'test',
    },
    {
        title: 'Review',
        shortName: 'rev',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: 'tag',
        uri: 'https://fusion.equinor.com/apps/reviews/255d8c0a-7893-4c21-ab42-62c652ea8129',
        tags: ['fuison', 'link', 'external'],
        appEnv: 'test',
    },
    // Asset Data
    {
        title: '3D Model',
        shortName: '3dm',
        color: '#0364B8',
        groupe: [Apps.AssetData],
        icon: '',
        tags: ['3D', 'Asset', 'Map'],
        app: {
            appType: 'CustomApp',
            component: ModelViewer,
        },
        appEnv: 'dev',
    },
    {
        title: 'Documents',
        shortName: 'doc',
        color: '#0364B8',
        groupe: Apps.AssetData,
        icon: '',
        uri: 'https://stid.equinor.com/JCA/search?type=doc&revstatus=OF%2CUA%2CRE%2CPL%2COF-P',
        tags: ['3D', 'Asset', 'Map', 'Doc'],
        appEnv: 'test',
    },
    {
        title: 'Tags',
        shortName: 'tags',
        color: '#0364B8',
        groupe: Apps.AssetData,
        icon: 'tag',
        uri: 'https://stid.equinor.com/JCA/search?type=tag&tagstatus=A%2CP%2CR%2CF',
        tags: ['Tag', 'Data', 'Functional Location'],
        appEnv: 'test',
    },
];
