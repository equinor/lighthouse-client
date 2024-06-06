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
import { setup as pipingAndHeatTraceSetup } from './PipingAndHeatTrace/PipingAndHeatTraceApp';
import { setup as installationSetup } from './Installation';
import { setup as McSetup } from './MechanicalCompletion';
import { setup as MDRSetup } from './MDR';
import { setup as querySetup } from './Query';
import { setup as handoverSetup } from './Handover';
import { setup as releaseControlSetup } from './ReleaseControl/ReleaseControlApp';
import { setup as scopeChangeSetup } from './ScopeChangeRequest/ScopeChangeRequestApp';
import { setup as SwcrSetup } from './swcr';
import { setup as tasksSetup } from './Tasks/TasksApp';
import { setup as WorkOrderSetup } from './WorkOrder';
import { setup as loopSetup } from './Loop';
import { setup as punchSetup } from './Punch';
import { setup as commissioningAnalyticsSetup } from './CommissioningAnalytics';
import { setup as preservationAnalyticsSetup } from './Preservation';
import { setup as ProgressStatusSetup } from './ProgressStatus';
import { setup as cchOverviewSetup } from './CCHOverview';
import { setup as CommissioningPackageTaskSetup } from './CommissioningPackageTask';
import { setup as TagsAnalyticsSetup } from './TagsAnalytics';
import { setup as EITSetup } from './EIT';
import { setup as activitiesSetup } from './Activities';
import { setup as allowanceSetup } from './Allowance';
export function getApps(): AppManifest[] {
  return apps.concat(oldApps).concat(internalApps);
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

export const cchOverview: AppManifest = {
  title: 'Overview',
  // cch-overview is being referenced by frontpage, do not rename shortname
  shortName: 'cch-overview',
  color: '#0364B8',
  groupe: Apps.ConstructionAndCommissioning,
  icon: '',
  tags: ['PowerBI'],
  app: {
    appType: 'PowerBIViewer',
    setup: cchOverviewSetup,
  },
  appEnv: 'prod',
};

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

export const oldApps: AppManifest[] = [
  {
    title: 'Handover Old',
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
    deprecated: true,
  },
  {
    title: 'Mechanical Completion Old',
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
    deprecated: true,
  },
  {
    title: 'Loop old',
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
    helpPageUrl: 'https://statoilsrm.sharepoint.com/sites/Portal/SitePages/Loop.aspx',
    deprecated: true,
  },
];

export const internalApps: AppManifest[] = [
  {
    title: 'JC User Statistics',
    shortName: 'jc-user-statistics',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: [],
    app: {
      appType: 'PowerBIViewer',
      setup: (appApi) =>
        appApi.createPowerBiViewer().registerFusionPowerBi({
          reportURI: 'jc-user-statistics',
        }),
    },
    appEnv: 'prod',
    deprecated: true,
  },
];

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
    uri: (isProduction: boolean) =>
      isProduction
        ? 'https://fusion.equinor.com/apps/pmt-nonconfidential/3380fe7d-e5b7-441f-8ce9-a8c3133ee499'
        : 'https://fusion-s-portal-ci.azurewebsites.net/apps/pmt-nonconfidential/94dd5f4d-17f1-4312-bf75-ad75f4d9572c',
    tags: ['Link', 'Fusion'],
    appEnv: 'prod',
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
          : 'https://fusion-s-portal-ci.azurewebsites.net/apps/pro-org/3cf72ff9-c50f-4e94-ba79-31721ba42dec/chart'
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
    uri: (isProduction: boolean) =>
      isProduction
        ? 'https://fusion.equinor.com/apps/tpd-safety'
        : 'https://fusion-s-portal-ci.azurewebsites.net/apps/tpd-safety',
    tags: ['Link', 'Fusion'],
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
        : 'https://fusion-s-portal-ci.azurewebsites.net/apps/bmt/b6552a8f-9173-416f-9fc0-996387ff7e3a',
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
    uri: (isProduction: boolean) =>
      isProduction
        ? 'https://fusion.equinor.com/apps/lci-hanging-garden/3380fe7d-e5b7-441f-8ce9-a8c3133ee499'
        : 'https://fusion-s-portal-ci.azurewebsites.net/apps/lci-hanging-garden/94dd5f4d-17f1-4312-bf75-ad75f4d9572c',
    tags: ['Link', 'Fusion'],
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
      appType: 'PowerBIViewer',
      setup: MDRSetup,
    },
    tags: ['PowerBI'],

    appEnv: 'prod',
  },
  // Construction And Commissioning
  {
    title: 'Job Analytics',
    shortName: 'jca-job-analytics',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: [],
    app: {
      appType: 'FusionApp',
      setup: () => {},
    },
    appEnv: 'prod',
  },
  {
    title: 'Project Browser',
    shortName: 'project-browser',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: [],
  },
  cchOverview,
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
    title: 'Operation garden',
    shortName: 'operation-garden',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    uri: (isProduction: boolean) =>
      isProduction
        ? 'https://fusion.equinor.com/apps/operation-garden/3380fe7d-e5b7-441f-8ce9-a8c3133ee499'
        : 'https://fusion-s-portal-ci.azurewebsites.net/apps/operation-garden/94dd5f4d-17f1-4312-bf75-ad75f4d9572c',
    tags: ['Link', 'Fusion'],
    appEnv: 'prod',
  },
  {
    title: 'Handover',
    shortName: 'handover-new',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: ['Fusion'],
    app: {
      appType: 'FusionApp',
      setup: () => {},
    },
    appEnv: 'prod',
    helpPageUrl: 'https://statoilsrm.sharepoint.com/sites/Portal/SitePages/Handover.aspx',
  },
  {
    title: 'Mechanical Completion',
    shortName: 'mechanical-completion',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: ['Fusion'],
    app: {
      appType: 'FusionApp',
      setup: () => {},
    },
    appEnv: 'prod',
  },
  {
    title: 'Loop',
    shortName: 'loop-new',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: ['Fusion'],
    app: {
      appType: 'FusionApp',
      setup: () => {},
    },
    appEnv: 'prod',
    helpPageUrl: 'https://statoilsrm.sharepoint.com/sites/Portal/SitePages/Loop.aspx',
  },
  {
    title: 'Activities',
    shortName: 'activities',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: ['PowerBI'],
    app: {
      appType: 'PowerBIViewer',
      setup: activitiesSetup,
    },
    appEnv: 'test',
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
    title: 'Commissioning Analytics',
    shortName: 'commissioning-analytics',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: ['PowerBI'],
    app: {
      appType: 'PowerBIViewer',
      setup: commissioningAnalyticsSetup,
    },
    appEnv: 'prod',
  },
  {
    title: 'Commissioning Task',
    shortName: 'commissioning-task-analytics',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: ['PowerBI'],
    app: {
      appType: 'PowerBIViewer',
      setup: CommissioningPackageTaskSetup,
    },
    appEnv: 'prod',
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
      setup: pipingAndHeatTraceSetup,
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
    appEnv: 'prod',
    helpPageUrl: 'https://statoilsrm.sharepoint.com/sites/Portal/SitePages/Release-control.aspx',
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
    title: 'Preservation analytics',
    shortName: 'preservation-analytics',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: ['PowerBI'],
    app: {
      appType: 'PowerBIViewer',
      setup: preservationAnalyticsSetup,
    },
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
    tags: [],
    app: {
      appType: 'Workspace',
      setup: punchSetup,
    },
    appEnv: 'prod',
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
    title: 'Tags analytics',
    shortName: 'tags-analytics',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: ['PowerBI'],
    app: {
      appType: 'PowerBIViewer',
      setup: TagsAnalyticsSetup,
    },
    appEnv: 'prod',
  },
  {
    title: 'Atex Inspections',
    shortName: 'eit-analytics',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    tags: ['PowerBI'],
    app: {
      appType: 'PowerBIViewer',
      setup: EITSetup,
    },
    appEnv: 'prod',
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
    title: 'Commissioning procedure',
    shortName: 'commissioning-procedure',
    color: '#0364B8',
    groupe: Apps.ConstructionAndCommissioning,
    icon: '',
    uri: (isProduction: boolean) =>
      isProduction ? 'https://dcp.equinor.com' : 'https://dcp-web-test.azurewebsites.net',
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
        : 'https://fusion-s-portal-ci.azurewebsites.net/apps/management-of-change',
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
        : 'https://fusion-s-portal-ci.azurewebsites.net/apps/project-control-and-analysis/b9a3246a-ddb5-4086-b4ec-dd4b0e88b700',
    tags: ['Link', 'Fusion'],
    appEnv: 'prod',
  },
  {
    title: 'Progress Summary',
    shortName: 'progress-summary',
    color: '#0364B8',
    groupe: Apps.ProjectControl,
    icon: '',
    tags: ['PowerBI'],
    app: {
      appType: 'PowerBIViewer',
      setup: ProgressStatusSetup,
    },
    appEnv: 'prod',
  },
  {
    title: 'Allowance',
    shortName: 'allowance',
    color: '#0364B8',
    groupe: Apps.ProjectControl,
    icon: '',
    tags: ['PowerBI'],
    app: {
      appType: 'PowerBIViewer',
      setup: allowanceSetup,
    },
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
    uri: (isProduction: boolean) =>
      isProduction
        ? 'https://fusion.equinor.com/apps/qrm/3380fe7d-e5b7-441f-8ce9-a8c3133ee499'
        : 'https://fusion-s-portal-ci.azurewebsites.net/apps/qrm/94dd5f4d-17f1-4312-bf75-ad75f4d9572c',
    tags: ['Link', 'Fusion'],
    appEnv: 'prod',
  },
  {
    title: 'Quality deviation',
    shortName: 'quality-deviation',
    color: '#0364B8',
    groupe: Apps.QualityAndRisk,
    icon: '',
    uri: (isProduction: boolean) =>
      isProduction
        ? 'https://fusion.equinor.com/apps/quality-deviation/3380fe7d-e5b7-441f-8ce9-a8c3133ee499'
        : 'https://fusion-s-portal-ci.azurewebsites.net/apps/quality-deviation/94dd5f4d-17f1-4312-bf75-ad75f4d9572c',
    tags: ['Link', 'Fusion'],
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
        : 'https://fusion-s-portal-ci.azurewebsites.net/apps/meetings',
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
        : 'https://fusion-s-portal-ci.azurewebsites.net/apps/reviews',
    tags: ['fuison', 'link', 'external'],
    appEnv: 'prod',
  },
  {
    title: 'Query',
    shortName: 'query-workspace',
    color: '#0364B8',
    groupe: Apps.Collaboration,
    icon: '',
    tags: [],
    app: {
      appType: 'Workspace',
      setup: querySetup,
    },
    appEnv: 'prod',
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
