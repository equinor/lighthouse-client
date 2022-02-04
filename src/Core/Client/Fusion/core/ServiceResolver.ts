import { ServiceResolver } from '@equinor/fusion';

const serviceResolver: ServiceResolver = {
    getDataProxyBaseUrl: () => window['serviceEndpoints']['data-proxy'],
    getFusionBaseUrl: () => window['serviceEndpoints']['portal'] || window.location.origin,
    getContextBaseUrl: () => window['serviceEndpoints']['context'],
    getOrgBaseUrl: () => window['serviceEndpoints']['org-chart'],
    getPowerBiBaseUrl: () => window['serviceEndpoints']['powerbi'],
    getTasksBaseUrl: () => window['serviceEndpoints']['task'],
    getProjectsBaseUrl: () => window['serviceEndpoints']['projects'],
    getMeetingsBaseUrl: () => window['serviceEndpoints']['meeting-v2'],
    getPeopleBaseUrl: () => window['serviceEndpoints']['people'],
    getReportsBaseUrl: () => window['serviceEndpoints']['reports'],
    getPowerBiApiBaseUrl: () => 'https://api.powerbi.com/v1.0/myorg',
    getNotificationBaseUrl: () => window['serviceEndpoints']['notification'],
    // @TODO remove info-app when service is changed
    getInfoUrl: () =>
        window['serviceEndpoints']['infoapp'] || window['serviceEndpoints']['info-app'],
    getFusionTasksBaseUrl: () => window['serviceEndpoints']['fusiontasks'],
    getBookmarksBaseUrl: () => window['serviceEndpoints']['bookmarks'],
};

export default serviceResolver;
