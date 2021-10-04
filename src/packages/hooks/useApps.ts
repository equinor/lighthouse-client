import { appsAdministration, appsCompletionProcesses, appsSupportCapabilities } from '../../mocs/MocApps';

export function useApps() {
    return { appsCompletionProcesses, appsAdministration, appsSupportCapabilities };
}
