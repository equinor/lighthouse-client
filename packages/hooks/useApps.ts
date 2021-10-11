import {
    appsAdministration,
    appsCompletionProcesses,
    appsSupportCapabilities
} from './MocApps';

export function useApps() {
    return {
        appsCompletionProcesses,
        appsAdministration,
        appsSupportCapabilities
    };
}
