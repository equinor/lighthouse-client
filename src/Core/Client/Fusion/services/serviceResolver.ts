import { ServiceResolver } from '@equinor/fusion';

export const serviceResolver: ServiceResolver = {
    getContextBaseUrl: () => 'https://pro-s-context-ci.azurewebsites.net',
    getDataProxyBaseUrl: () => 'https://pro-s-dataproxy-ci.azurewebsites.net',
    getFusionBaseUrl: () => 'https://pro-s-portal-fprd.azurewebsites.net/',
    getMeetingsBaseUrl: () => 'https://pro-s-meeting-v2-ci.azurewebsites.net',
    getOrgBaseUrl: () => 'https://pro-s-org-ci.azurewebsites.net',
    getPowerBiBaseUrl: () => 'https://pro-s-powerbi-ci.azurewebsites.net',
    getProjectsBaseUrl: () => 'https://pro-s-projects-ci.azurewebsites.net',
    getTasksBaseUrl: () => 'https://pro-s-tasks-ci.azurewebsites.net',
    getPeopleBaseUrl: () => 'https://pro-s-people-ci.azurewebsites.net',
    getReportsBaseUrl: () => 'https://pro-s-reports-ci.azurewebsites.net',
    getPowerBiApiBaseUrl: () => 'https://api.powerbi.com/v1.0/myorg',
    getNotificationBaseUrl: () => 'https://pro-s-notification-ci.azurewebsites.net',
    getInfoUrl: () => 'https://pro-s-info-app-ci.azurewebsites.net',
    getFusionTasksBaseUrl: () => 'https://pro-s-tasks-ci.azurewebsites.net',
    getBookmarksBaseUrl: () => 'https://pro-s-bookmarks-ci.azurewebsites.net',
};
