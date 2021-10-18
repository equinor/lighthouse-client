import React from 'react';

type HEXColor = `#${string}`;

export interface AppManifest {
    title: string;
    shortName: string;
    color: HEXColor;
    groupe: string | string[];
    tags: string[];
    icon?: string | React.FC;
    uri?: string;
    component?: React.FC;
}

export const apps: AppManifest[] = [
    // Asset Data
    {
        title: 'Home',
        shortName: '3dm',
        color: '#0364B8',
        groupe: 'Top',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: '3D Model',
        shortName: '3dm',
        color: '#0364B8',
        groupe: ['Asset data', 'Top'],
        icon: '',
        uri: '',
        tags: ['3D', 'Asset', 'Map']
    },
    {
        title: 'Documents and drawings',
        shortName: 'doc-draw',
        color: '#0364B8',
        groupe: 'Asset data',
        icon: '',
        uri: '',
        tags: ['3D', 'Asset', 'Map']
    },
    {
        title: 'Tags',
        shortName: 'tags',
        color: '#0364B8',
        groupe: 'Asset data',
        icon: 'tag',
        uri: '',
        tags: ['Tag', 'Data', 'Functional Location']
    },
    // Collaboration
    {
        title: 'Meeting',
        shortName: 'meeting',
        color: '#0364B8',
        groupe: 'Collaboration',
        icon: 'tag',
        uri: '',
        tags: []
    },
    {
        title: 'Review',
        shortName: 'rev',
        color: '#0364B8',
        groupe: 'Collaboration',
        icon: 'tag',
        uri: '',
        tags: []
    },
    // Handover
    {
        title: 'Checklist',
        shortName: 'checklist',
        color: '#0364B8',
        groupe: 'Handover',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Handover',
        shortName: 'handover',
        color: '#0364B8',
        groupe: 'Handover',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Heat trace installation',
        shortName: 'heat-trace',
        color: '#0364B8',
        groupe: 'Handover',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Loop',
        shortName: 'loop',
        color: '#0364B8',
        groupe: 'Handover',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'N2He',
        shortName: 'N2He',
        color: '#0364B8',
        groupe: 'Handover',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Preservation',
        shortName: 'preservation',
        color: '#0364B8',
        groupe: 'Handover',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'ProCoSys',
        shortName: 'pcs',
        color: '#0364B8',
        groupe: 'Handover',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Punch',
        shortName: 'punch',
        color: '#0364B8',
        groupe: 'Handover',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'SWCR',
        shortName: 'swcr',
        color: '#0364B8',
        groupe: 'Handover',
        icon: '',
        uri: '',
        tags: []
    },
    // Construction management
    {
        title: 'Work order',
        shortName: 'work-order',
        color: '#0364B8',
        groupe: 'Construction management',
        icon: '',
        uri: '',
        tags: []
    },
    // Engineering management
    {
        title: 'Control object status',
        shortName: 'object-status',
        color: '#0364B8',
        groupe: 'Engineering management',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'LCI hanging garden',
        shortName: 'lic-garden',
        color: '#0364B8',
        groupe: 'Engineering management',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'LCI portal',
        shortName: 'lci-portal',
        color: '#0364B8',
        groupe: 'Engineering management',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'MDR analytics',
        shortName: 'mdr',
        color: '#0364B8',
        groupe: 'Engineering management',
        icon: '',
        uri: '',
        tags: []
    },
    // Project information
    {
        title: 'Business case',
        shortName: 'business-case',
        color: '#0364B8',
        groupe: 'Project information',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Milestone',
        shortName: 'milestone',
        color: '#0364B8',
        groupe: 'Project information',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Org chart',
        shortName: 'org-chart',
        color: '#0364B8',
        groupe: 'Project information',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Work processes',
        shortName: 'work-processes',
        color: '#0364B8',
        groupe: 'Project information',
        icon: '',
        uri: '',
        tags: []
    },
    // Quality
    {
        title: 'Dispensations',
        shortName: 'dispensations',
        color: '#0364B8',
        groupe: 'Quality',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Dispensations',
        shortName: 'dispensations',
        color: '#0364B8',
        groupe: 'Quality',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'N-comformacy request',
        shortName: 'n-comformacy-request',
        color: '#0364B8',
        groupe: 'Quality',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Non-comformacy',
        shortName: 'non-comformacy',
        color: '#0364B8',
        groupe: 'Quality',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Quality deviation',
        shortName: 'quality-deviation',
        color: '#0364B8',
        groupe: 'Quality',
        icon: '',
        uri: '',
        tags: []
    },
    // Queries and requests
    {
        title: 'ATS request',
        shortName: 'ats',
        color: '#0364B8',
        groupe: 'Quality',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Change request',
        shortName: 'change',
        color: '#0364B8',
        groupe: 'Quality',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Overtime request',
        shortName: 'overtime',
        color: '#0364B8',
        groupe: 'Quality',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Queries',
        shortName: 'queries',
        color: '#0364B8',
        groupe: 'Quality',
        icon: '',
        uri: '',
        tags: []
    },
    // Scope and change
    {
        title: 'Project change proposal',
        shortName: 'pcp',
        color: '#0364B8',
        groupe: 'Scope and change',
        icon: '',
        uri: '',
        tags: []
    },
    {
        title: 'Scope control analytics',
        shortName: 'sca',
        color: '#0364B8',
        groupe: 'Scope and change',
        icon: '',
        uri: '',
        tags: []
    }
];
