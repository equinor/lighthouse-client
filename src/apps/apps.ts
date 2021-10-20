import React from 'react';
import { DataView } from '../components/CompletionView/src/DataView';

type HEXColor = `#${string}`;

export interface AppManifest {
    title: string;
    shortName: string;
    color: HEXColor;
    groupe: Apps | Apps[];
    tags: string[];
    icon?: string;
    uri?: string;
    component?: React.FC<Partial<AppManifest>>;
    imageUri?: string;
}

export interface AppGroupe {
    name: string;
    icon: string;
}

export enum Apps {
    AssetData = 'AssetData',
    Top = 'Top',
    Collaboration = 'Collaboration',
    ProgressAndStatus = 'ProgressAndStatus',
    ConstructionManagement = 'ConstructionManagement',
    EngineeringManagement = 'EngineeringManagement',
    ProjectInformation = 'ProjectInformation',
    QueriesAndRequests = 'QueriesAndRequests',
    Quality = 'Quality',
    ScopeChange = 'ScopeChange'
}

type AppGroups = Record<Apps, AppGroupe>;

export const appGroups: AppGroups = {
    AssetData: {
        name: 'Asset data',
        icon: 'tag'
    },
    Top: {
        name: 'Top',
        icon: 'home'
    },
    Collaboration: {
        name: 'Collaboration',
        icon: 'group'
    },
    ProgressAndStatus: {
        name: 'Progress and status',
        icon: 'dashboard'
    },
    ConstructionManagement: {
        name: 'Construction management',
        icon: 'build_wrench'
    },
    EngineeringManagement: {
        name: 'Engineering management',
        icon: 'swap_horizontal_circle'
    },
    ProjectInformation: {
        name: 'Project information',
        icon: 'assignment'
    },

    QueriesAndRequests: {
        name: 'Queries and requests',
        icon: 'comment_discussion'
    },
    Quality: {
        name: 'Quality',
        icon: 'check_circle_outlined'
    },
    ScopeChange: {
        name: 'Scope and change',
        icon: 'swap_horizontal_circle'
    }
};
export const apps: AppManifest[] = [
    // Collaboration
    {
        title: 'Meeting',
        shortName: 'meeting',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: 'tag',
        uri: '',
        tags: [],
        imageUri: './images/image-test.png'
    },
    {
        title: 'Review',
        shortName: 'rev',
        color: '#0364B8',
        groupe: Apps.Collaboration,
        icon: 'tag',
        uri: '',
        tags: []
    },
    // ProgressAndStatus
    {
        title: 'Checklist',
        shortName: 'checklist',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: [],
        component: DataView
    },
    {
        title: 'Handover',
        shortName: 'handover',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: [],
        component: DataView
    },
    {
        title: 'Heat trace installation',
        shortName: 'heat-trace',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: [],
        component: DataView
    },
    {
        title: 'Loop',
        shortName: 'loop',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        imageUri: './images/Loop.png',
        tags: []
    },
    {
        title: 'N2He',
        shortName: 'N2He',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Preservation',
        shortName: 'preservation',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'ProCoSys',
        shortName: 'pcs',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Punch',
        shortName: 'punch',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: [],
        component: DataView
    },
    {
        title: 'SWCR',
        shortName: 'swcr',
        color: '#0364B8',
        groupe: Apps.ProgressAndStatus,
        icon: '',
        uri: '',
        tags: [],
        component: DataView
    },
    // Construction management
    {
        title: 'Work order',
        shortName: 'work-order',
        color: '#0364B8',
        groupe: Apps.ConstructionManagement,
        icon: '',
        uri: '',
        tags: []
    },
    // Engineering management
    {
        title: 'Control object status',
        shortName: 'object-status',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'LCI hanging garden',
        shortName: 'lic-garden',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'LCI portal',
        shortName: 'lci-portal',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'MDR analytics',
        shortName: 'mdr',
        color: '#0364B8',
        groupe: Apps.EngineeringManagement,
        icon: '',
        uri: '',
        tags: []
    },
    // Project information
    {
        title: 'Business case',
        shortName: 'business-case',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Milestone',
        shortName: 'milestone',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Org chart',
        shortName: 'org-chart',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Work processes',
        shortName: 'work-processes',
        color: '#0364B8',
        groupe: Apps.ProjectInformation,
        icon: '',
        uri: '',
        tags: []
    },
    // Quality
    {
        title: 'Dispensations',
        shortName: 'dispensations',
        color: '#0364B8',
        groupe: Apps.Quality,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Dispensations',
        shortName: 'dispensations',
        color: '#0364B8',
        groupe: Apps.Quality,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'N-comformacy request',
        shortName: 'n-comformacy-request',
        color: '#0364B8',
        groupe: Apps.Quality,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Non-comformacy',
        shortName: 'non-comformacy',
        color: '#0364B8',
        groupe: Apps.Quality,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Quality deviation',
        shortName: 'quality-deviation',
        color: '#0364B8',
        groupe: Apps.Quality,
        icon: '',
        uri: '',
        tags: []
    },
    // Queries and requests
    {
        title: 'ATS request',
        shortName: 'ats',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Change request',
        shortName: 'change',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Overtime request',
        shortName: 'overtime',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Queries',
        shortName: 'queries',
        color: '#0364B8',
        groupe: Apps.QueriesAndRequests,
        icon: '',
        uri: '',
        tags: []
    },
    // Scope and change
    {
        title: 'Project change proposal',
        shortName: 'pcp',
        color: '#0364B8',
        groupe: Apps.ScopeChange,
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Scope control analytics',
        shortName: 'sca',
        color: '#0364B8',
        groupe: Apps.ScopeChange,
        icon: '',
        uri: '',
        tags: []
    },
    // Asset Data
    {
        title: 'Home',
        shortName: '3dm',
        color: '#0364B8',
        groupe: Apps.Top,
        icon: 'home',
        uri: '',
        tags: []
    },
    {
        title: '3D Model',
        shortName: '3dm',
        color: '#0364B8',
        groupe: [Apps.AssetData],
        icon: '',
        uri: '',
        tags: ['3D', 'Asset', 'Map']
    },
    {
        title: 'Documents and drawings',
        shortName: 'doc-draw',
        color: '#0364B8',
        groupe: Apps.AssetData,
        icon: '',
        uri: '',
        tags: ['3D', 'Asset', 'Map']
    },
    {
        title: 'Tags',
        shortName: 'tags',
        color: '#0364B8',
        groupe: Apps.AssetData,
        icon: 'tag',
        uri: '',
        tags: ['Tag', 'Data', 'Functional Location']
    }
];
