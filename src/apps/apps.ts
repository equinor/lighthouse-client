import { AppGroups, AppManifest } from '@equinor/app-builder';
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
import { setup as constructionSetup } from './Construction';
import { setup as handoverSetup } from './handoverApp';
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
import { setup as heatTraceInstallationSetup } from './HeatTraceInstallation/HeatTraceInstallationApp';
import { setup as WorkOrderSetup } from './WorkOrder';

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
    },
    Top: {
        name: 'Top',
        icon: HomeIcon,
    },
    Collaboration: {
        name: 'Collaboration',
        icon: CollaborationIcon,
    },
    ProgressAndStatus: {
        name: 'Progress and status',
        icon: ProgressAndStatusIcon,
    },
    ConstructionManagement: {
        name: 'Construction management',
        icon: ConstructionManagementIcon,
    },
    EngineeringManagement: {
        name: 'Engineering management',
        icon: EngineeringManagementIcon,
    },
    ProjectInformation: {
        name: 'Project information',
        icon: ProjectInformationIcon,
    },
    QueriesAndRequests: {
        name: 'Queries and requests',
        icon: QueriesAndRequests,
    },
    QualityAndCompliance: {
        name: 'Quality and compliance',
        icon: QualityIcon,
    },
    ProjectControl: {
        name: 'Project control',
        icon: ProjectControlIcon,
    },
    SSU: {
        name: 'SSU',
        icon: SSUIcon,
    },

    CompletionManagement: {
        name: 'Completion management',
        icon: CompletionManagementIcon,
    },
    Reports: {
        name: 'Reports',
        icon: ReportIcon,
    },
};
export const apps: AppManifest[] = [
    // Project information
    {
        title: 'Business case',
        shortName: 'business-case',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        uri: '',
        // imageUri: './images/Business case.jpg',
        app: {
            appType: 'PowerBI',
            component: BusinessCaseReport,
        },
        tags: ['PowerBI'],
    },
    {
        title: 'Milestone',
        shortName: 'milestone',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        uri: '',
        tags: [],
    },
    {
        title: 'Org chart',
        shortName: 'org-chart',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        uri: '',
        tags: [],
    },
    {
        title: 'Work processes',
        shortName: 'work-processes',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        uri: '',
        tags: [],
    },
    //SSU
    {
        title: 'Safety Performance',
        shortName: 'safety-performance',
        color: '#0364B8',
        groupe: Apps.SSU,
        icon: '',
        uri: '',
        app: {
            appType: 'PowerBI',
            component: SafetyPerformanceReport,
        },
        tags: ['PowerBI'],
    },
    // ProgressAndStatus
    {
        title: 'Overview',
        shortName: 'overview',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: [],
        app: {
            appType: 'PageView',
            setup: (): void => {
                console.log('overview');
            },
        },
    },
    {
        title: 'Engineering',
        shortName: 'engineering',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: [],
        app: {
            appType: 'PageView',
            setup: (): void => {
                console.log('engineering');
            },
        },
    },
    {
        title: 'Construction',
        shortName: 'construction',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: [],
        app: {
            appType: 'PageView',
            setup: constructionSetup,
        },
    },
    {
        title: 'Commissioning',
        shortName: 'commissioning',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: [],
        app: {
            appType: 'PageView',
            setup: constructionSetup,
        },
    },
    // Engineering management
    {
        title: 'Control object status',
        shortName: 'object-status',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        uri: '',
        tags: [],
    },
    {
        title: 'LCI hanging garden',
        shortName: 'lci-garden',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        uri: '',
        app: {
            appType: 'PowerBI',
            component: LCIReport,
        },
        tags: ['PowerBI'],
    },
    {
        title: 'LCI portal',
        shortName: 'lci-portal',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        uri: '',
        tags: [],
    },
    {
        title: 'MDR analytics',
        shortName: 'mdr',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        uri: '',
        app: {
            appType: 'PowerBI',
            component: MDRReport,
        },
        tags: ['PowerBI'],
    },
    // Construction management
    {
        title: 'Work order',
        shortName: 'work-order',
        color: '#0364B8',
        groupe: Apps.ConstructionManagement,
        icon: '',
        uri: '',
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
        uri: '',
        tags: [],
        imageUri: './images/Project explorer.jpg',
    },
    {
        title: 'Checklist',
        shortName: 'checklist',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        uri: '',
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
        uri: '',
        tags: [],
        app: {
            appType: 'DataViewer',
            setup: handoverSetup,
        },
    },
    {
        title: 'Heat trace installation',
        shortName: 'heat-trace',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        uri: '',
        tags: [],
        app: {
            appType: 'DataViewer',
            setup: heatTraceInstallationSetup,
        },
    },
    {
        title: 'Loop',
        shortName: 'loop',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        uri: '',
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
        uri: '',
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
        uri: '',
        tags: [],
        app: {
            appType: 'DataViewer',
        },
    },
    {
        title: 'Punch',
        shortName: 'punch',
        color: '#0364B8',
        groupe: Apps.CompletionManagement,
        icon: '',
        uri: '',
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
        uri: '',
        tags: [],
        app: {
            appType: 'DataViewer',
        },
    },
    // Queries and requests
    {
        title: 'ATS request',
        shortName: 'ats',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        uri: '',
        tags: [],
    },
    {
        title: 'Change request',
        shortName: 'change',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        uri: '',
        app: {
            appType: 'DataViewer',
            setup: scopeChangeSetup,
        },
        tags: [],
    },
    // ProjectControl
    {
        title: 'Project change proposal',
        shortName: 'pcp',
        color: '#0364B8',
        groupe: Apps.ProjectControl,
        icon: '',
        uri: '',
        tags: [],
    },
    {
        title: 'Scope change control',
        shortName: 'sca',
        color: '#0364B8',
        groupe: Apps.ProjectControl,
        icon: '',
        uri: '',
        imageUri: './images/Scope change control.jpg',
        tags: [],
    },
    // QualityAndCompliance
    {
        title: 'Dispensations',
        shortName: 'dispensations',
        color: '#0364B8',
        groupe: Apps.QualityAndCompliance,
        icon: '',
        uri: '',
        tags: [],
    },
    {
        title: 'N-comformacy request',
        shortName: 'n-comformacy-request',
        color: '#0364B8',
        groupe: Apps.QualityAndCompliance,
        icon: '',
        uri: '',
        tags: [],
    },
    {
        title: 'Non-comformacy',
        shortName: 'non-comformacy',
        color: '#0364B8',
        groupe: Apps.QualityAndCompliance,
        icon: '',
        uri: '',
        app: {
            appType: 'PowerBI',
            component: NonConformityReport,
        },
        tags: ['PowerBI'],
    },
    {
        title: 'Quality deviation',
        shortName: 'quality-deviation',
        color: '#0364B8',
        groupe: Apps.QualityAndCompliance,
        icon: '',
        uri: '',
        app: {
            appType: 'PowerBI',
            component: QualityDeviationReport,
        },
        tags: ['PowerBI'],
    },

    {
        title: 'Overtime request',
        shortName: 'overtime',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        uri: '',
        tags: [],
    },
    {
        title: 'Queries',
        shortName: 'queries',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        uri: '',
        app: {
            appType: 'PowerBI',
            component: QueryReport,
        },
        tags: ['PowerBI'],
    },
    // Reports
    {
        title: 'temp-link',
        shortName: 'temp-link2',
        color: '#0364B8',
        groupe: Apps.Reports,
        icon: '',
        uri: '',
        tags: [],
    },

    // Collaboration
    {
        title: 'Meeting',
        shortName: 'meeting',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: 'tag',
        uri: '',
        tags: [],
        imageUri: './images/image-test.png',
    },
    {
        title: 'Review',
        shortName: 'rev',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: 'tag',
        uri: '',
        tags: [],
    },
    // Asset Data
    {
        title: 'Home',
        shortName: '',
        color: '#0364B8',
        groupe: Apps.Top,
        icon: HomeIcon,
        uri: '',
        tags: [],
    },
    {
        title: '3D Model',
        shortName: '3dm',
        color: '#0364B8',
        groupe: [Apps.AssetData],
        icon: '',
        uri: '',
        tags: ['3D', 'Asset', 'Map'],
        app: {
            appType: 'CustomApp',
            component: ModelViewer,
        },
    },
    {
        title: 'Documents and drawings',
        shortName: 'doc-draw',
        color: '#0364B8',
        groupe: Apps.AssetData,
        icon: '',
        uri: '',
        tags: ['3D', 'Asset', 'Map'],
    },
    {
        title: 'Tags',
        shortName: 'tags',
        color: '#0364B8',
        groupe: Apps.AssetData,
        icon: 'tag',
        uri: '',
        tags: ['Tag', 'Data', 'Functional Location'],
    },
];
