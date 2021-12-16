import { useAtom } from '@dbeining/react-atom';
import { getDashboardContext } from '../Api/dashboardState';
import { DashboardInstance } from '../Types/State';

/** Hook for retrieving the current dashboard, by passing the dashboardId registered,
 * will all ways return empty dashboard if not found*/
export function useDashboard<T>(dashboardId: string): DashboardInstance<T> {
    const state = useAtom(getDashboardContext());

    if (state[dashboardId]) {
        return state[dashboardId] as DashboardInstance<T>;
    } else {
        // eslint-disable-next-line no-console
        console.warn(`No DataView registered on path/key:  ${dashboardId}`);
        return {
            dashboardId: dashboardId,
            title: `Unknown DataView ${dashboardId}`,
            pages: {},
        };
    }
}
